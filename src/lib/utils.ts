import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine clsx (résolution des arguments conditionnels) et tailwind-merge
 * (fusion des classes Tailwind conflictuelles) pour la gestion conditionnelle
 * des classes CSS.
 *
 * Ordre important : clsx en premier résout les types d'entrées (strings,
 * objects, arrays), twMerge en second fusionne les doublons Tailwind
 * (ex: 'text-red-500' + 'text-blue-500' → garde la dernière).
 *
 * @example cn('text-sm font-medium', isActive && 'text-white')
 * @example cn('px-4 py-2', variant === 'primary' && 'bg-indigo-500')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
