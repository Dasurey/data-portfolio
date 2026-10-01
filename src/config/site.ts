/**
 * Fuente única de verdad para marca, navegación y contacto.
 * Más adelante estos datos migran a un Global de Payload (SiteSettings).
 */
export const SITE_NAME = 'Dario Asurey';
export const SITE_INITIALS = 'DA';
export const CONTACT_EMAIL = 'dario.asurey@gmail.com';

// null = no se muestra. Poné el archivo en /public y la ruta acá.
export const PROFILE_PHOTO: string | null = '/foto_profesional_filtro_recortada.png'
export const RESUME_URL: string | null = '/CV_Dario_Asurey.pdf'

// `key` apunta a messages/*.json → Nav.<key>
export const NAV_ITEMS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/projects', key: 'projects' },
] as const

export const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/in/your-handle', label: 'LinkedIn' },
  { href: 'https://github.com/your-handle', label: 'GitHub' },
  { href: 'https://medium.com/@your-handle', label: 'Medium' },
] as const
