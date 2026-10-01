import type { ComponentPropsWithoutRef } from 'react';

/** `.wrap` de base-de-portafolio: 1160px máx., gutters de 32px (20px en móvil). */
export function Container({ className = '', ...props }: ComponentPropsWithoutRef<'div'>) {
  return <div className={`mx-auto w-full max-w-[1160px] px-5 sm:px-8 ${className}`} {...props} />;
}
