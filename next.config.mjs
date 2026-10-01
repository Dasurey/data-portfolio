import { withPayload } from '@payloadcms/next/withPayload';
import createNextIntlPlugin from 'next-intl/plugin';

// Sin routing de i18n: el plugin solo necesita saber dónde está request.ts.
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Payload requiere Next >= 16.2.6 y no garantiza compatibilidad con
  // `cacheComponents`: no activarlo.
};

// Payload es ESM puro, por eso el archivo es .mjs.
export default withPayload(withNextIntl(nextConfig));
