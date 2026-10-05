import { highlightCode } from '@/lib/highlight';

import { CopyButton } from './CopyButton';

type Props = {
  code: string;
  language: string;
  title?: string | null;
  copyLabel: string;
  copiedLabel: string;
};

/** Bloque de código oscuro con colores por lenguaje y botón de copiar. */
export async function CodeBlock({ code, language, title, copyLabel, copiedLabel }: Props) {
  const html = await highlightCode(code, language);

  return (
    <div className="my-6 overflow-hidden rounded-[14px] bg-[#0b1020] text-[#d7dcf0] shadow-[0_18px_40px_-24px_rgba(11,16,32,0.8)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/8 px-5 py-2 font-mono text-[11px] text-[#8b93ad]">
        <span>{title ? `${title} · ${language}` : language}</span>
        <CopyButton code={code} copyLabel={copyLabel} copiedLabel={copiedLabel} />
      </div>
      <div
        className="[&_code]:font-mono [&_pre]:overflow-x-auto [&_pre]:bg-transparent! [&_pre]:px-5 [&_pre]:py-4 [&_pre]:text-[13.5px] [&_pre]:leading-[1.7]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}