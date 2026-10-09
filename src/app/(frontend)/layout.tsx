import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SITE_NAME } from '@/config/site';
import { RevealObserver } from '@/components/layout/RevealObserver'

import './globals.css';

/**
 * Layout del FRONTEND. Vive en el route group (frontend) y no en app/layout.tsx
 * porque el admin de Payload ((payload)/layout.tsx) trae su propio layout raíz.
 * Los paréntesis no forman parte de la URL: siguen siendo /, /about y /projects.
 */

// Lectura: Inter. Stack técnico y fechas: JetBrains Mono.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// Display de la base (títulos, nombre de marca). Solo títulos: la lectura sigue en Inter.
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

// generateMetadata (y no `export const metadata`): las traducciones dependen
// de la cookie, que solo existe dentro del ámbito de la request.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: {
      default: `${SITE_NAME} — ${t('title')}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: t('description'),
  };
}

export const viewport: Viewport = {
  colorScheme: 'light', // light mode puro
  themeColor: '#ffffff',
};

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js-reveal')" }} />
      </head>
      <body className="flex min-h-dvh flex-col bg-white font-sans text-base leading-[1.7] text-ink-soft antialiased">
        {/* Hereda locale y messages de i18n/request.ts sin pasar props */}
        <NextIntlClientProvider>

          <RevealObserver />
          <Header />

          <main id="main" className="flex-1">
            {children}
          </main>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
