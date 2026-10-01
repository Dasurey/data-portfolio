import type { ComponentPropsWithoutRef } from 'react';

/** Equivale a `.wrap` del repo: un único ancho máximo y gutters para toda la web. */
export function Container({ className = '', ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`} {...props} />;
}
