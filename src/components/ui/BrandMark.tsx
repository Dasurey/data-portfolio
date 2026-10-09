import Image from 'next/image';

/** Logo del sitio (public/favicon.svg). Es un SVG: se ve nítido a cualquier tamaño. */
export function BrandMark({ size = 42 }: { size?: number }) {
  return <Image src="/favicon.svg" alt="Logo del sitio formato SVG" width={size} height={size} unoptimized priority className="shrink-0" />;
}