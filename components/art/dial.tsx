import { callOutFees, type FeeId } from '../../content/pricing';
import { usd } from '../../lib/format';

/** Needle angles in degrees clockwise from north. */
export const NEEDLE: Record<FeeId | 'north', number> = { north: 0, standard: -60, 'after-hours': 60 };

const C = 100;
const pt = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.sin(a), C - r * Math.cos(a)] as const;
};
const arc = (r: number, from: number, to: number) => {
  const [x1, y1] = pt(r, from);
  const [x2, y2] = pt(r, to);
  return `M${x1.toFixed(2)} ${y1.toFixed(2)}A${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
};

/**
 * The True North dial: a brass-bezelled pressure gauge whose needle is a compass needle.
 * Logo mark (bands hidden, needle north), call-out meter (needle on a fee band) and compass rose.
 */
export function TrueNorthDial({ value = 'north', className = 'size-40', bands = true, compass = false }: {
  value?: FeeId | 'north';
  className?: string;
  /** Show the two fee bands and their prices. */
  bands?: boolean;
  /** Compass-rose variant: cardinal letters instead of fee bands. */
  compass?: boolean;
}) {
  const ticks = Array.from({ length: 31 }, (_, i) => -135 + i * 9);
  const standard = callOutFees.find(fee => fee.id === 'standard')!.fee;
  const afterHours = callOutFees.find(fee => fee.id === 'after-hours')!.fee;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <circle cx="100" cy="104" r="93" className="fill-[var(--shadow)]" />
      <circle cx="100" cy="100" r="93" className="fill-brass stroke-outline" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="85" className="fill-brass-deep" opacity=".55" />
      {Array.from({ length: 6 }, (_, i) => {
        const [x, y] = pt(89, i * 60 + 30);
        return <circle key={i} cx={x} cy={y} r="2.2" className="fill-brass stroke-outline" strokeWidth="1" />;
      })}
      <circle cx="100" cy="100" r="80" className="fill-dial-face stroke-outline" strokeWidth="2.5" />
      {compass ? (
        <g className="font-display" fontWeight="800" fontSize="16" fill="#0e1b2e" textAnchor="middle">
          {[0, 90, 180, 270].map(deg => <path key={deg} d={`M100 100L${pt(66, deg - 10).join(' ')}L${pt(74, deg).join(' ')}L${pt(66, deg + 10).join(' ')}Z`} fill="#16305a" opacity=".18" />)}
          <text x="100" y="37">N</text><text x="166" y="106">E</text><text x="100" y="176">S</text><text x="34" y="106">W</text>
        </g>
      ) : (
        <>
          {ticks.map((deg, i) => {
            const major = i % 5 === 0;
            const [x1, y1] = pt(major ? 64 : 69, deg);
            const [x2, y2] = pt(75, deg);
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0e1b2e" strokeWidth={major ? 2.4 : 1.2} strokeLinecap="round" />;
          })}
          {bands ? (
            <>
              <path d={arc(58, -100, -22)} fill="none" stroke="#16305a" strokeWidth="9" />
              <path d={arc(58, 22, 100)} fill="none" stroke="#f26a1b" strokeWidth="9" />
              <text x={pt(54, -126)[0]} y={pt(54, -126)[1] + 4} textAnchor="middle" className="font-mono" fontSize="13" fontWeight="700" fill="#0e1b2e">{usd(standard)}</text>
              <text x={pt(54, 126)[0]} y={pt(54, 126)[1] + 4} textAnchor="middle" className="font-mono" fontSize="13" fontWeight="700" fill="#0e1b2e">{usd(afterHours)}</text>
            </>
          ) : null}
          <text x="100" y="45" textAnchor="middle" className="font-display" fontWeight="800" fontSize="14" fill="#0e1b2e">N</text>
          <text x="100" y="172" textAnchor="middle" className="font-display" fontWeight="700" fontSize="9" letterSpacing="2" fill="#4a5872">TRUE NORTH</text>
        </>
      )}
      <g className="needle" style={{ transform: `rotate(${NEEDLE[value]}deg)`, transformOrigin: '100px 100px' }}>
        <path d="M100 48 107 100H93Z" fill="#f26a1b" stroke="#0e1b2e" strokeWidth="2" strokeLinejoin="round" />
        <path d="M93 100h14l-7 32Z" fill="#16305a" stroke="#0e1b2e" strokeWidth="2" strokeLinejoin="round" />
      </g>
      <circle cx="100" cy="100" r="9" className="fill-brass" stroke="#0e1b2e" strokeWidth="2" />
      <circle cx="100" cy="100" r="3" fill="#0e1b2e" />
      <circle cx="100" cy="100" r="80" fill="url(#tn-glint)" />
    </svg>
  );
}
