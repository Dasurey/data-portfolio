/**
 * Fuente única de verdad para marca, navegación y contacto.
 * Más adelante estos datos migran a un Global de Payload (SiteSettings).
 */
export const SITE_NAME = 'Dario Asurey';
export const SITE_INITIALS = 'DA';
export const CONTACT_EMAIL = 'dario.asurey@gmail.com';

// `key` apunta a messages/*.json → Nav.<key>
export const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/projects', key: 'projects' },
  { href: '/teo', key: 'teo' },
] as const

export const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/in/darioasurey', label: 'LinkedIn' },
  { href: 'https://github.com/Dasurey', label: 'GitHub' },
  { href: 'https://medium.com/@your-handle', label: 'Medium' },
] as const

// Link externo del header y del footer (el lugar de "The Wife" en la base).
export const EXTERNAL_LINK: { label: string; href: string } | null = {
  label: 'Blog',
  href: 'https://example.com',
};