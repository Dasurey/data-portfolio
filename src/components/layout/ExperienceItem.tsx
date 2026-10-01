'use client'

import { useState, useRef, useEffect } from 'react'

export function ExperienceItem({ 
  item, 
  isFirst, 
  tPresent, 
  tBadge 
}: { 
  item: any, 
  isFirst: boolean, 
  tPresent: string,
  tBadge: string
}) {
  // El trabajo actual (sin endDate) o el primero de la lista empieza abierto
  const isCurrent = !item.endDate
  const [isOpen, setIsOpen] = useState(isCurrent)
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="group grid grid-cols-[70px_28px_1fr] sm:grid-cols-[96px_28px_1fr] md:gap-x-2">
      {/* 1. Año (tl-year) */}
      <div className={`py-6 pr-4 text-right font-mono text-[11px] sm:text-xs tracking-tight ${isCurrent ? 'font-bold text-[#4f46e5]' : 'text-[#8a90a3]'}`}>
        {new Date(item.startDate).getFullYear()}—{item.endDate ? new Date(item.endDate).getFullYear().toString().slice(-2) : tPresent}
      </div>

      {/* 2. Rail y Nodo (tl-rail) */}
      <div className="relative flex justify-center">
        {/* Línea vertical */}
        <div className={`w-px bg-[#e0e2f0] ${isFirst ? 'mt-7' : ''} h-full`} />
        {/* Círculo (tl-node) */}
        <div className={`absolute top-7 size-[11px] rounded-full border-2 bg-white transition-all duration-300 
          ${isCurrent 
            ? 'border-transparent bg-linear-to-br from-[#4f46e5] to-[#7c3aed] ring-4 ring-[#4f46e5]/15 scale-110' 
            : 'border-[#c9cde0]'}`} 
        />
      </div>

      {/* 3. Cuerpo (tl-body) */}
      <div className={`py-4 sm:pl-4 ${isCurrent ? 'pb-12' : 'pb-8'}`}>
        <div className={`rounded-2xl transition-all duration-500 
          ${isOpen ? 'border border-[#9966ff]/30 bg-linear-to-b from-[#4f46e5]/5 to-[#7c3aed]/2 p-5 sm:p-7 shadow-sm' : 'p-2'}`}>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full cursor-pointer items-start justify-between gap-4 text-left outline-none"
          >
            <div className="flex flex-col">
              {isCurrent && (
                <span className="mb-2 w-fit rounded-full bg-linear-to-r from-[#4f46e5] to-[#7c3aed] px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                  {tBadge}
                </span>
              )}
              <h3 className="font-display text-lg font-bold tracking-tight text-[#171a26] sm:text-xl">
                {item.role}
              </h3>
              <span className="font-semibold text-[#4a5163]">{item.company}</span>
              {item.location && <span className="text-sm text-[#6b7385]">{item.location}</span>}
            </div>

            {/* Icono de expansión (exp-icon) */}
            <div className={`mt-1 flex size-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300 
              ${isOpen ? 'bg-linear-to-br from-[#4f46e5] to-[#7c3aed] text-white' : 'bg-[#4f46e5]/10 text-[#4f46e5]'}`}>
              <span className={`text-lg font-light transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>+</span>
            </div>
          </button>

          {/* Panel expandible (exp-panel) con animación de altura */}
          <div 
            ref={contentRef}
            style={{ maxHeight: isOpen ? contentRef.current?.scrollHeight + 'px' : '0px' }}
            className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,0.7,0.2,1)]"
          >
            <div className="pt-6">
              <p className="max-w-(--spacing-72) whitespace-pre-wrap text-[15px] leading-relaxed text-[#4a5163] sm:text-base">
                {item.description}
              </p>
              
              {/* Stack técnico */}
              {item.stack && (
                <div className="mt-6 font-mono text-[11px] tracking-wide text-[#6b7385] uppercase">
                  {item.stack.map((s: any) => s.name).join(' · ')}
                </div>
              )}

              {/* Botones (Pills) */}
              {item.links && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.links.map((link: any) => (
                    <a key={link.id} href={link.url} target="_blank" className="inline-flex items-center gap-1 rounded-full border border-[#4f46e5]/20 bg-white px-4 py-1.5 font-mono text-[11px] font-bold text-[#4f46e5] transition-all hover:bg-[#4f46e5] hover:text-white">
                      {link.label} →
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}