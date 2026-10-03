'use client';

import { useEffect } from 'react';

/** Aparición de secciones ([data-reveal]) de base-de-portafolio: IntersectionObserver + respaldos. */
export function RevealObserver() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tracked = new WeakSet<Element>();
    const pending = new Set<Element>();
    let ioFired = false;
    let io: IntersectionObserver | null = null;

    const show = (el: Element) => {
      el.classList.add('is-in');
      io?.unobserve(el);
      pending.delete(el);
    };

    // Respaldo: lo que ya está a la vista se muestra aunque el observer no avise.
    const check = () => {
      const vh = window.innerHeight || 800;
      pending.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.94 && rect.bottom > 0) show(el);
      });
    };

    if (!reduced && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          ioFired = true;
          entries.forEach((entry) => entry.isIntersecting && show(entry.target));
        },
        { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
      );
    }

    const scan = () => {
      document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => {
        if (tracked.has(el)) return;
        tracked.add(el);

        if (reduced || !io) {
          show(el);
          return;
        }
        pending.add(el);
        io.observe(el);
      });
      requestAnimationFrame(check);
    };

    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    scan();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    const quick = window.setTimeout(check, 250);
    // Contenido invisible sin salida es el peor caso: si el observer nunca respondió, se muestra todo.
    const deadline = window.setTimeout(() => {
      if (!ioFired) pending.forEach(show);
    }, 1500);

    return () => {
      mutations.disconnect();
      io?.disconnect();
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      window.clearTimeout(quick);
      window.clearTimeout(deadline);
    };
  }, []);

  return null;
}