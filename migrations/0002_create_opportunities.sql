-- ============================================================
-- Migration 002 : Opportunities (Pipeline Sales)
-- Crée la table opportunities + trigger + index + policies RLS
-- ============================================================

-- ----------------------------------------------------------
-- 1. Table opportunities
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  prospect_name text NOT NULL,
  prospect_position text,
  stage text NOT NULL DEFAULT 'discovery' CHECK (stage IN ('discovery', 'meeting_booked', 'closed_won', 'closed_lost')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ----------------------------------------------------------
-- 2. Trigger handle_new_opportunity
-- SECURITY DEFINER : bypass RLS pour setter organization_id
-- SET search_path : évite l'injection via search_path manipulation
-- Le user doit avoir au moins une org dans org_members, sinon l'INSERT échoue.
-- ----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_opportunity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  user_org_id uuid;
BEGIN
  -- Récupère la première org du user (supporte le cas multi-org si besoin)
  SELECT id INTO user_org_id
  FROM public.organizations
  WHERE id IN (SELECT public.user_org_ids(auth.uid()))
  LIMIT 1;

  -- Si aucune org trouvée, reject silencieux (l'erreur sera plus explicite si on en a plusieurs)
  IF user_org_id IS NULL THEN
    RAISE EXCEPTION 'User has no organization membership';
  END IF;

  NEW.organization_id = user_org_id;
  RETURN NEW;
END;
$$;

-- Trigger attaché à opportunities — s'exécute avant INSERT pour setter organization_id
DROP TRIGGER IF EXISTS on_opportunity_created ON public.opportunities;
CREATE TRIGGER on_opportunity_created
  BEFORE INSERT ON public.opportunities
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_opportunity();

-- ----------------------------------------------------------
-- 3. Index sur organization_id
-- Accélère les filtres RLS et les lookups par organisation
-- ----------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_opportunities_organization_id
  ON public.opportunities(organization_id);

-- Index composite sur organization_id + stage pour le drag-drop (filtrer par org + compter par stage)
CREATE INDEX IF NOT EXISTS idx_opportunities_org_stage
  ON public.opportunities(organization_id, stage);

-- ----------------------------------------------------------
-- 4. Activation RLS
-- ----------------------------------------------------------
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------
-- 5. Policy SELECT
-- Retourne les opportunités des organisations auxquelles le user appartient
-- ----------------------------------------------------------
CREATE POLICY "users_read_opportunities"
  ON public.opportunities
  FOR SELECT
  TO authenticated
  USING (organization_id IN (SELECT public.user_org_ids(auth.uid())));

-- ----------------------------------------------------------
-- 6. Policy INSERT
-- Le trigger handle_new_opportunity setted organization_id automatiquement.
-- La policy vérifie que le user a au moins une org (sinon le trigger reject).
-- ----------------------------------------------------------
CREATE POLICY "users_insert_opportunities"
  ON public.opportunities
  FOR INSERT
  TO authenticated
  WITH CHECK (organization_id IN (SELECT public.user_org_ids(auth.uid())));

-- ----------------------------------------------------------
-- 7. Policy UPDATE
-- Permet le drag-drop (changement de stage) et les mises à jour
-- de company_name, prospect_name, prospect_position.
-- ----------------------------------------------------------
CREATE POLICY "users_update_opportunities"
  ON public.opportunities
  FOR UPDATE
  TO authenticated
  USING (organization_id IN (SELECT public.user_org_ids(auth.uid())))
  WITH CHECK (organization_id IN (SELECT public.user_org_ids(auth.uid())));

-- ----------------------------------------------------------
-- 8. Policy DELETE (no client)
-- Suppression uniquement via service_role — pas de delete côté client
-- ----------------------------------------------------------
CREATE POLICY "no_client_delete_opportunities"
  ON public.opportunities
  FOR DELETE
  USING (false);
