import type { ReactNode } from 'react';

/** Orange-and-white reflective chevron band, as on the van's rear doors. */
export function ChevronStripe({ className = 'h-3' }: { className?: string }) {
  return <div aria-hidden="true" className={`chevrons w-full ${className}`} />;
}

/** Inline gate valve with a handwheel, drawn on top of a horizontal pipe. */
function GateValve({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
    <rect x="25" y="14" width="10" height="20" className="fill-steel stroke-outline" strokeWidth="2" />
    <ellipse cx="30" cy="12" rx="22" ry="6" className="fill-pex-red stroke-outline" strokeWidth="2" />
    <path d="M14 34h32l5 6v10l-5 6H14l-5-6V40Z" className="fill-brass stroke-outline" strokeWidth="2" />
  </svg>;
}

/** Union fitting: a hex nut around the pipe. */
function Union({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 30 40" className={className} aria-hidden="true">
    <path d="M4 6h22l3 6v16l-3 6H4l-3-6V12Z" className="fill-brass stroke-outline" strokeWidth="2" />
    <path d="M10 6v28M20 6v28" className="stroke-outline" strokeWidth="1.2" opacity=".5" />
  </svg>;
}

/**
 * Horizontal pipe-run divider: copper (default) or PEX blue/red pair, with unions and a gate valve.
 * Purely decorative.
 */
export function PipeRun({ variant = 'copper', className = '' }: { variant?: 'copper' | 'pex'; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative h-14 ${className}`}>
      {variant === 'copper'
        ? <div className="pipe-h absolute inset-x-0 top-1/2 -translate-y-1/2" />
        : <>
          <div className="absolute inset-x-0 top-[34%] h-[10px] border-y-2 border-outline bg-water" />
          <div className="absolute inset-x-0 top-[58%] h-[10px] border-y-2 border-outline bg-pex-red" />
        </>}
      <Union className="absolute top-1/2 left-[14%] h-10 -translate-y-1/2" />
      <Union className="absolute top-1/2 left-[46%] hidden h-10 -translate-y-1/2 sm:block" />
      <GateValve className="absolute bottom-[calc(50%-1.9rem)] left-[72%] h-[3.75rem]" />
    </div>
  );
}

/**
 * Carbon-copy job ticket frame: perforated top edge, ruled lines, ticket number and an optional
 * rubber stamp. `behind` is the colour behind the ticket so the perforations read as holes.
 */
export function JobTicket({ number = '0142', title, stamp, children, className = '', behind }: {
  number?: string;
  title: ReactNode;
  stamp?: string;
  children: ReactNode;
  className?: string;
  behind?: 'paper' | 'panel';
}) {
  return (
    <div className={`ticket ${className}`} style={behind ? { ['--behind' as string]: `var(--${behind})` } : undefined}>
      <div className="ticket-head"><span>{title}</span><span>No. {number}</span></div>
      <div className={`relative px-5 pb-6 sm:px-7 ${stamp ? 'pt-8 sm:pt-6' : 'pt-4'}`}>
        {stamp ? <span className="stamp pointer-events-none absolute -top-2 right-4 sm:right-6" aria-hidden="true">{stamp}</span> : null}
        {children}
      </div>
    </div>
  );
}
