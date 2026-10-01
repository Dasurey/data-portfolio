/**
 * Fuente única de verdad para marca, navegación y contacto.
 * Más adelante estos datos migran a un Global de Payload (SiteSettings).
 */
export const SITE_NAME = 'Your Name';
export const SITE_INITIALS = 'YN';
export const CONTACT_EMAIL = 'hello@example.com';

// `key` apunta a messages/*.json → Nav.<key>
export const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/projects', key: 'projects' },
] as const;

export const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/in/your-handle', label: 'LinkedIn' },
  { href: 'https://github.com/your-handle', label: 'GitHub' },
  { href: 'https://medium.com/@your-handle', label: 'Medium' },
] as const;
