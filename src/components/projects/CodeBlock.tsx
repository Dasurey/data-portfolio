'use client';

import { useState } from 'react';

type Props = {
  code: string;
  language: string;
  title?: string | null;
  copyLabel: string;
  copiedLabel: string;
};

/** Bloque de código oscuro (como el diagrama de call-copilot) con botón de copiar. */
export function CodeBlock({ code, language, title, copyLabel, copiedLabel }: Props) {
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
    <div className="overflow-hidden rounded-[14px] bg-[#0b1020] text-[#d7dcf0] shadow-[0_18px_40px_-24px_rgba(11,16,32,0.8)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-5 py-2 font-mono text-[11px] text-[#8b93ad]">
        <span>{title ? `${title} · ${language}` : language}</span>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className="rounded-md px-2 py-1 transition-colors hover:bg-white/10 hover:text-white motion-reduce:transition-none"
        >
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <pre className="overflow-x-auto px-5 py-4 text-[13.5px] leading-[1.7]">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}