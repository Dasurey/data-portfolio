'use client';

import { useState } from 'react';

export function CopyButton({ code, copyLabel, copiedLabel }: { code: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Sin permiso de portapapeles: no hacemos nada.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="rounded-md px-2 py-1 transition-colors hover:bg-white/10 hover:text-white motion-reduce:transition-none"
    >
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}