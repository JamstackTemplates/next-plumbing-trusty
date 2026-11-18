import { TrueNorthDial } from './dial';

const O = 'stroke-outline';

/** Copper pipe segment with outline and highlight; horizontal when w > h. */
function Copper({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const horizontal = w > h;
  return <g>
    <rect x={x} y={y} width={w} height={h} className={`fill-copper ${O}`} strokeWidth="2.5" />
    {horizontal
      ? <line x1={x + 2} y1={y + 4} x2={x + w - 2} y2={y + 4} className="stroke-copper-hi" strokeWidth="3" />
      : <line x1={x + 4} y1={y + 2} x2={x + 4} y2={y + h - 2} className="stroke-copper-hi" strokeWidth="3" />}
  </g>;
}

/**
 * Basement cutaway: copper manifold with shut-off valve and the True North dial, a tank water
 * heater, a sump pit and a toolbox. Through the window, the service van in snow and the Aerial
 * Lift Bridge in the distance.
 */
export function HeroScene({ className = '', crop = false }: { className?: string; /** Phone strip: just the manifold, dial and window. */ crop?: boolean }) {
  const id = crop ? 'hero-strip' : 'hero';
  return (
    <svg viewBox={crop ? '96 44 600 216' : '0 0 720 560'} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`${id}-window`}><rect x="340" y="38" width="220" height="150" /></clipPath>
        <clipPath id={`${id}-van-stripe`}><rect x="478" y="150" width="72" height="18" /></clipPath>
      </defs>
      {/* Wall and floor */}
      <rect width="720" height="482" fill="url(#tn-blocks)" />
      <rect y="482" width="720" height="78" className="fill-steel" opacity=".45" />
      <rect y="482" width="720" height="78" fill="url(#tn-hatch)" />
      <line x1="0" y1="482" x2="720" y2="482" className={O} strokeWidth="3" />

      {/* Window to the street */}
      <g clipPath={`url(#${id}-window)`}>
        <rect x="340" y="38" width="220" height="150" className="fill-sky" />
        {/* Aerial Lift Bridge silhouette */}
        <g className="fill-primary" opacity=".55">
          <rect x="364" y="78" width="10" height="82" />
          <rect x="452" y="78" width="10" height="82" />
          <rect x="360" y="74" width="106" height="9" />
          <rect x="370" y="126" width="86" height="6" />
        </g>
        <path d="M374 83l11 0-11 43M385 83l11 43 11-43 11 43 11-43 11 43 11-43" className="stroke-primary" strokeWidth="1.5" fill="none" opacity=".5" />
        <rect x="340" y="152" width="220" height="12" className="fill-water" opacity=".45" />
        <path d="M340 168c30-10 70-8 100-2s80 6 120-6v40H340Z" className={`fill-snow ${O}`} strokeWidth="2" />
        {/* Service van, rear view */}
        <rect x="474" y="96" width="80" height="76" rx="9" className={`fill-primary ${O}`} strokeWidth="2.5" />
        <rect x="482" y="104" width="30" height="22" rx="2" className="fill-sky" opacity=".8" />
        <rect x="516" y="104" width="30" height="22" rx="2" className="fill-sky" opacity=".8" />
        <line x1="514" y1="100" x2="514" y2="172" className={O} strokeWidth="2" />
        <g clipPath={`url(#${id}-van-stripe)`}>
          <rect x="478" y="150" width="72" height="18" className="fill-reflect" />
          {[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M${474 + i * 12} 150l-12 18h7l12-18Z M${514 + i * 12} 150l12 18h-7l-12-18Z`} className="fill-safety" />)}
        </g>
        <rect x="474" y="172" width="80" height="8" className="fill-outline" />
        <circle cx="480" cy="140" r="3" className="fill-safety" />
        <circle cx="548" cy="140" r="3" className="fill-safety" />
        {[[352, 60], [420, 52], [540, 66], [398, 108], [530, 44], [486, 70], [356, 128]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" className="fill-snow" />)}
      </g>
      <rect x="340" y="38" width="220" height="150" fill="none" className={O} strokeWidth="5" />
      <line x1="450" y1="38" x2="450" y2="188" className={O} strokeWidth="4" />
      <rect x="330" y="188" width="240" height="10" className={`fill-surface ${O}`} strokeWidth="2.5" />

      {/* Flue from the heater */}
      <rect x="600" y="0" width="22" height="300" className={`fill-steel ${O}`} strokeWidth="2.5" />
      <rect x="600" y="0" width="22" height="300" fill="url(#tn-hatch)" />

      {/* Sump discharge (PVC) */}
      <rect x="120" y="292" width="16" height="200" className={`fill-surface ${O}`} strokeWidth="2.5" />
      <path d="M136 292v-6a18 18 0 0 0-18-18H0v24h112a8 8 0 0 1 8 8" className={`fill-surface ${O}`} strokeWidth="2.5" />
      <rect x="114" y="360" width="28" height="30" rx="3" className={`fill-primary ${O}`} strokeWidth="2.5" />
      <path d="M128 368v14m-5-5 5 5 5-5" className="stroke-white" strokeWidth="2" fill="none" />

      {/* Copper manifold, tee to the dial and shut-off valve */}
      <Copper x={0} y={226} w={720} h={20} />
      {[60, 330, 470].map(x => <rect key={x} x={x} y={222} width="14" height="28" rx="2" className={`fill-copper ${O}`} strokeWidth="2.5" />)}
      <Copper x={242} y={172} w={18} h={56} />
      <rect x="236" y="216" width="30" height="36" rx="3" className={`fill-copper ${O}`} strokeWidth="2.5" />
      <svg x="186" y="56" width="132" height="132" overflow="visible"><TrueNorthDial className="" bands={false} /></svg>
      <g>
        <path d="M150 220h40l6 8v16l-6 8h-40l-6-8v-16Z" className={`fill-brass ${O}`} strokeWidth="2.5" />
        <rect x="164" y="186" width="12" height="34" className={`fill-steel ${O}`} strokeWidth="2.5" />
        <ellipse cx="170" cy="182" rx="34" ry="9" className={`fill-pex-red ${O}`} strokeWidth="2.5" />
        <path d="M140 182h60M170 174v16" className="stroke-white" strokeWidth="2" opacity=".6" />
      </g>

      {/* Supply lines to the heater */}
      <rect x="540" y="246" width="14" height="60" className={`fill-water ${O}`} strokeWidth="2.5" />
      <rect x="664" y="246" width="14" height="60" className={`fill-pex-red ${O}`} strokeWidth="2.5" />
      {[262, 290].map(y => <g key={y}><rect x="537" y={y} width="20" height="7" className={`fill-brass ${O}`} strokeWidth="2" /><rect x="661" y={y} width="20" height="7" className={`fill-brass ${O}`} strokeWidth="2" /></g>)}

      {/* Tank water heater */}
      <g>
        <path d="M530 330a24 24 0 0 1 24-24h106a24 24 0 0 1 24 24v136H530Z" className={`fill-surface ${O}`} strokeWidth="3" />
        <path d="M660 306a24 24 0 0 1 24 24v136h-26V312" fill="url(#tn-hatch)" />
        <rect x="552" y="338" width="92" height="56" className={`fill-paper ${O}`} strokeWidth="2.5" />
        <rect x="552" y="338" width="92" height="12" className="fill-primary" />
        <rect x="552" y="350" width="92" height="4" className="fill-safety" />
        {[364, 374, 384].map(y => <line key={y} x1="560" y1={y} x2={y === 384 ? 610 : 636} y2={y} className="stroke-muted" strokeWidth="2" />)}
        <rect x="684" y="352" width="18" height="16" rx="2" className={`fill-brass ${O}`} strokeWidth="2.5" />
        <rect x="694" y="368" width="10" height="100" className={`fill-copper ${O}`} strokeWidth="2" />
        <rect x="574" y="420" width="48" height="34" rx="3" className={`fill-outline ${O}`} strokeWidth="2.5" />
        <path className="flame fill-safety" d="M598 450c-9 0-12-6-10-12 2 3 4 3 5 1 0-5 3-9 5-12 1 5 5 7 6 12 1-2 2-3 2-5 3 5 2 16-8 16Z" />
        <rect x="532" y="466" width="150" height="16" className={`fill-steel ${O}`} strokeWidth="2.5" />
      </g>

      {/* Sump pit */}
      <rect x="66" y="482" width="124" height="70" className={`fill-paper ${O}`} strokeWidth="3" />
      <rect x="68" y="520" width="120" height="30" className="fill-water" opacity=".55" />
      <rect x="108" y="490" width="40" height="48" rx="6" className={`fill-primary ${O}`} strokeWidth="2.5" />
      <rect x="114" y="496" width="10" height="36" fill="url(#tn-hatch-light)" />

      {/* Toolbox with a wrench, floor drain */}
      <rect x="284" y="436" width="132" height="48" className={`fill-safety ${O}`} strokeWidth="3" />
      <rect x="284" y="436" width="132" height="12" className={`fill-safety ${O}`} strokeWidth="3" />
      <path d="M326 436v-14h48v14" fill="none" className={O} strokeWidth="5" strokeLinejoin="round" />
      <rect x="342" y="452" width="16" height="10" className={`fill-steel ${O}`} strokeWidth="2" />
      <path d="M296 476l84-58m0 0 6-10 10 2-6 10 10 2-8 10-14-2Z" className={`fill-steel ${O}`} strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="470" cy="512" rx="34" ry="9" className={`fill-paper ${O}`} strokeWidth="2.5" />
      <path d="M446 512h48M456 506v12M470 504v16M484 506v12" className={O} strokeWidth="1.5" />
    </svg>
  );
}
