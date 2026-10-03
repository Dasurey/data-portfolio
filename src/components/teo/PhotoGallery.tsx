'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

type Photo = { id: number | string; src: string; alt: string; width: number; height: number };

type Props = {
  photos: Photo[];
  labels: { close: string; prev: string; next: string };
};

const navButton =
  'absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/14 text-2xl leading-none text-white transition-colors hover:bg-white/25 motion-reduce:transition-none';

/** .gallery + .lightbox de la base: mosaico en columnas; al tocar una foto se abre ampliada. */
export function PhotoGallery({ photos, labels }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };

  const step = (delta: number) =>
    setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length));

  const current = index === null ? null : photos[index];

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => open(i)}
            className="mb-4 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-[14px] shadow-[0_2px_10px_rgba(23,26,38,0.07)] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[3px] hover:scale-[1.008] hover:shadow-[0_18px_38px_-18px_rgba(23,26,38,0.45)] motion-reduce:transition-none motion-reduce:hover:transform-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
              className="block h-auto w-full"
            />
          </button>
        ))}
      </div>

      {/* .lightbox */}
      <dialog
        ref={dialogRef}
        aria-label={current?.alt || labels.close}
        onClose={() => setIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') step(1);
          if (event.key === 'ArrowLeft') step(-1);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center bg-dark/[0.86] p-8 text-white backdrop-blur-[8px] backdrop:bg-transparent open:flex"
      >
        {current && (
          <Image
            key={current.id}
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="100vw"
            className="h-auto max-h-full w-auto max-w-full rounded-2xl shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]"
          />
        )}

        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          className="absolute right-[22px] top-[22px] rounded-full bg-white/14 px-5 py-2.5 text-[0.85rem] font-semibold text-white transition-colors hover:bg-white/25 motion-reduce:transition-none"
        >
          {labels.close} ✕
        </button>

        {photos.length > 1 && (
          <>
            <button type="button" aria-label={labels.prev} onClick={() => step(-1)} className={`${navButton} left-[18px]`}>
              ‹
            </button>
            <button type="button" aria-label={labels.next} onClick={() => step(1)} className={`${navButton} right-[18px]`}>
              ›
            </button>
          </>
        )}
      </dialog>
    </>
  );
}