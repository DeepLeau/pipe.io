-- ============================================================
-- Migration 001 : Auth + Organisation
-- Crée les tables profiles, organizations, org_members
-- + trigger handle_new_user sur auth.users
-- + helper user_org_ids (SECURITY DEFINER) pour lookup cross-table
-- + politiques RLS pour chaque table
-- ============================================================

-- ----------------------------------------------------------
-- 1. Table profiles (créée avant le trigger)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------
-- 2. Table organizations
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------
-- 3. Table org_members (créée après organizations pour la FK)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.org_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'member')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (org_id, user_id)
);

-- ----------------------------------------------------------
-- 4. Trigger handle_new_user
-- SECURITY DEFINER : bypass RLS pour INSERT dans profiles
-- SET search_path : évite l'injection via search_path manipulation
-- ----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

-- Trigger attaché à auth.users — s'exécute après chaque INSERT
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ----------------------------------------------------------
-- 5. Helper SECURITY DEFINER pour lookup cross-table
-- Évite une récursion RLS si org_members.policy SELECT contenait
-- un EXISTS sur organizations (cross-check).
-- Retourne les org_ids dont le user est membre.
-- ----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.user_org_ids(p_user_id uuid)
RETURNS SETOF uuid
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, pg_temp
STABLE
AS $$
  SELECT org_id FROM public.org_members WHERE user_id = p_user_id;
$$;

REVOKE ALL ON FUNCTION public.user_org_ids(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.user_org_ids(uuid) TO authenticated;

-- ----------------------------------------------------------
-- 6. Activation RLS sur toutes les tables utilisateur
-- ----------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.org_members ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------
-- 7. Policies sur profiles
-- ----------------------------------------------------------
-- SELECT : le user lit son propre profile
CREATE POLICY "users_read_own_profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- INSERT : uniquement via le trigger (SECURITY DEFINER)
-- Pas de policy INSERT → opération interdite côté client

-- UPDATE/DELETE : pas de policy → opération interdite côté client
-- (les futures colonnes modifiables seront ajoutées dans une migration
-- séparée avec une policy UPDATE dédiées)

-- ----------------------------------------------------------
-- 8. Policies sur organizations
-- ----------------------------------------------------------
-- SELECT : les membres de l'org peuvent lire l'org (via helper)
CREATE POLICY "members_read_organization"
  ON public.organizations
  FOR SELECT
  TO authenticated
  USING (id IN (SELECT public.user_org_ids(auth.uid())));

-- INSERT : uniquement via service_role (onboarding côté serveur)
CREATE POLICY "no_client_insert_organization"
  ON public.organizations
  FOR INSERT
  WITH CHECK (false);

-- UPDATE : uniquement via service_role (mise à jour org)
CREATE POLICY "no_client_update_organization"
  ON public.organizations
  FOR UPDATE
  USING (false);

-- DELETE : uniquement via service_role (suppression org)
CREATE POLICY "no_client_delete_organization"
  ON public.organizations
  FOR DELETE
  USING (false);

-- ----------------------------------------------------------
-- 9. Policies sur org_members
-- ----------------------------------------------------------
-- SELECT : un user lit ses propres memberships
CREATE POLICY "users_read_own_memberships"
  ON public.org_members
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- INSERT : un user peut créer son propre membership (onboarding)
CREATE POLICY "users_insert_own_membership"
  ON public.org_members
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE : uniquement via service_role (changement de rôle)
CREATE POLICY "no_client_update_membership"
  ON public.org_members
  FOR UPDATE
  USING (false);

-- DELETE : uniquement via service_role (suppression membre)
CREATE POLICY "no_client_delete_membership"
  ON public.org_members
  FOR DELETE
  USING (false);

-- ----------------------------------------------------------
-- 10. Index pour optimisation des lookups
-- ----------------------------------------------------------
-- Index sur org_members.user_id pour accélérer le helper user_org_ids
CREATE INDEX IF NOT EXISTS idx_org_members_user_id ON public.org_members(user_id);

-- Index sur organizations.slug pour accélérer les recherches par slug
CREATE INDEX IF NOT EXISTS idx_organizations_slug ON public.organizations(slug);
