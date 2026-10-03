import { getTranslations } from 'next-intl/server';

const wire = 'absolute bg-white/[0.13]';
const node = 'rounded-xl border border-white/10 bg-white/[0.035] px-[15px] py-3';
const eyebrow = 'mb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-dark-soft';

/** Punto de luz que baja por un conector (keyframes flowDown en globals.css). */
function Packet({ className, delay = '0s', branch = false }: { className: string; delay?: string; branch?: boolean }) {
  return (
    <span
      aria-hidden="true"
      style={{ animationDelay: delay }}
      className={`absolute size-1.5 animate-[flowDown_2.2s_linear_infinite] rounded-full motion-reduce:hidden ${
        branch
          ? 'bg-accent shadow-[0_0_8px_2px_rgba(79,70,229,0.6)]'
          : 'bg-accent-2 shadow-[0_0_10px_2px_rgba(124,58,237,0.7)]'
      } ${className}`}
    />
  );
}

function Trunk() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-[26px] w-0.5 bg-white/[0.13]">
      <Packet className="-left-0.5 top-0" />
    </div>
  );
}

function FanOut() {
  return (
    <div aria-hidden="true" className="relative h-[30px]">
      <i className={`${wire} left-1/2 top-0 h-3.5 w-0.5 -translate-x-px`} />
      <i className={`${wire} inset-x-[16.6%] top-3.5 h-0.5`} />
      <i className={`${wire} left-[16.6%] top-3.5 h-4 w-0.5`} />
      <i className={`${wire} left-1/2 top-3.5 h-4 w-0.5 -translate-x-px`} />
      <i className={`${wire} left-[83.3%] top-3.5 h-4 w-0.5`} />
      <Packet branch delay="0.35s" className="left-[16.6%] top-3.5 -ml-0.5" />
      <Packet branch delay="0.5s" className="left-1/2 top-3.5 -ml-[3px]" />
      <Packet branch delay="0.65s" className="left-[83.3%] top-3.5 -ml-0.5" />
    </div>
  );
}

function FanIn() {
  return (
    <div aria-hidden="true" className="relative h-[30px]">
      <i className={`${wire} left-[16.6%] top-0 h-4 w-0.5`} />
      <i className={`${wire} left-1/2 top-0 h-4 w-0.5 -translate-x-px`} />
      <i className={`${wire} left-[83.3%] top-0 h-4 w-0.5`} />
      <i className={`${wire} inset-x-[16.6%] top-4 h-0.5`} />
      <i className={`${wire} left-1/2 top-4 h-3.5 w-0.5 -translate-x-px`} />
      <Packet delay="1.1s" className="left-1/2 top-0 -ml-[3px]" />
    </div>
  );
}

/** .diagram de la base: tarjeta oscura con el recorrido de los datos. */
export async function HeroDiagram() {
  const t = await getTranslations('Home.diagram');
  const models = [
    { title: t('node1'), sub: t('node1Sub') },
    { title: t('node2'), sub: t('node2Sub') },
    { title: t('node3'), sub: t('node3Sub') },
  ];

  return (
    <div className="rounded-[20px] bg-dark px-[22px] pb-[26px] pt-[22px] shadow-[0_30px_70px_-28px_rgba(23,26,38,0.5)]" data-reveal>
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-dark-soft">{t('label')}</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-live">
          <span
            aria-hidden="true"
            className="size-1.5 animate-[livePulse_2.4s_ease-in-out_infinite] rounded-full bg-live motion-reduce:animate-none"
          />
          {t('live')}
        </span>
      </div>

      <div className={node}>
        <div className={eyebrow}>{t('sourceEyebrow')}</div>
        <div className="text-sm font-semibold text-line">{t('sourceTitle')}</div>
      </div>
      <Trunk />
      <div className={node}>
        <div className={eyebrow}>{t('transportEyebrow')}</div>
        <div className="text-sm font-semibold text-line">{t('transportTitle')}</div>
      </div>

      <FanOut />
      <div className="grid grid-cols-3 gap-[9px]">
        {models.map((model) => (
          <div key={model.title} className="rounded-[11px] border border-white/10 bg-white/[0.035] px-2.5 py-[11px] text-center">
            <b className="block text-[12.5px] font-semibold leading-[1.35] text-line">{model.title}</b>
            <span className="mt-1.5 block font-mono text-[9.5px] text-dark-soft">{model.sub}</span>
          </div>
        ))}
      </div>
      <FanIn />

      <div className="rounded-xl border border-accent-2/40 bg-linear-to-br from-accent/16 to-accent-2/10 px-[15px] py-3">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#a5a9ff]">{t('finalEyebrow')}</div>
        <div className="text-sm font-semibold text-white">{t('finalTitle')}</div>
      </div>

      <p className="mt-4 text-xs leading-[1.55] text-dark-soft">{t('caption')}</p>
    </div>
  );
}