const O = 'stroke-outline';

function Label({ x, y, to, anchor = 'start', children }: { x: number; y: number; to: [number, number]; anchor?: 'start' | 'end'; children: string }) {
  const lx = anchor === 'start' ? x + children.length * 7.4 + 6 : x - children.length * 7.4 - 6;
  return <g>
    <path d={`M${anchor === 'start' ? x : x}  ${y + 6}H${lx}L${to[0]} ${to[1]}`} fill="none" className={O} strokeWidth="1.5" />
    <circle cx={to[0]} cy={to[1]} r="4" className={`fill-safety ${O}`} strokeWidth="1.5" />
    <text x={x} y={y} textAnchor={anchor} className="font-mono fill-ink" fontSize="13" fontWeight="600">{children}</text>
  </g>;
}

/** Gas tank water heater cut open: jacket, insulation, flue and baffle, dip tube, anode, T&P valve and burner. */
export function HeaterCutaway({ className = '', title }: { className?: string; title: string }) {
  return (
    <svg viewBox="0 0 520 520" className={className} role="img" aria-label={title}>
      {/* Supply pipes */}
      <rect x="196" y="6" width="16" height="70" className={`fill-water ${O}`} strokeWidth="2.5" />
      <rect x="308" y="6" width="16" height="70" className={`fill-pex-red ${O}`} strokeWidth="2.5" />
      <rect x="250" y="0" width="22" height="70" className={`fill-steel ${O}`} strokeWidth="2.5" />
      {/* Jacket and insulation */}
      <path d="M170 100a40 40 0 0 1 40-40h100a40 40 0 0 1 40 40v340H170Z" className={`fill-surface ${O}`} strokeWidth="3" />
      <path d="M182 104a32 32 0 0 1 32-32h92a32 32 0 0 1 32 32v330H182Z" fill="url(#tn-hatch)" className="fill-brass" fillOpacity=".25" />
      <path d="M182 104a32 32 0 0 1 32-32h92a32 32 0 0 1 32 32v330H182Z" fill="url(#tn-hatch)" />
      {/* Inner tank with water */}
      <path d="M196 112a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v306H196Z" className={`fill-paper ${O}`} strokeWidth="2.5" />
      <path d="M197 150h126v267H197Z" className="fill-water" opacity=".32" />
      <path d="M197 150q16-6 32 0t32 0 32 0 31 0" fill="none" className="stroke-water" strokeWidth="2" />
      {/* Flue with baffle */}
      <rect x="252" y="70" width="18" height="348" className={`fill-steel ${O}`} strokeWidth="2.5" />
      <path d="M255 120l12 14-12 14 12 14-12 14 12 14-12 14 12 14-12 14 12 14-12 14 12 14-12 14 12 14-12 14 12 14-12 14 12 14" fill="none" className={O} strokeWidth="1.5" />
      {/* Dip tube */}
      <rect x="200" y="70" width="8" height="320" className={`fill-water ${O}`} strokeWidth="1.5" />
      {/* Anode rod */}
      <rect x="292" y="80" width="8" height="270" className={`fill-steel ${O}`} strokeWidth="1.5" />
      {[130, 180, 230, 280, 330].map(y => <ellipse key={y} cx="296" cy={y} rx="7" ry="5" className={`fill-steel ${O}`} strokeWidth="1.5" />)}
      {/* T&P valve and discharge */}
      <rect x="350" y="118" width="26" height="20" rx="3" className={`fill-brass ${O}`} strokeWidth="2.5" />
      <rect x="370" y="104" width="6" height="16" className={`fill-steel ${O}`} strokeWidth="1.5" />
      <path d="M376 128h14v350" fill="none" className="stroke-copper" strokeWidth="10" />
      {/* Burner chamber */}
      <rect x="170" y="418" width="180" height="56" className={`fill-outline ${O}`} strokeWidth="3" />
      <rect x="226" y="460" width="70" height="6" className="fill-steel" />
      <path className="flame fill-safety" d="M244 460c-6-8-4-16 2-22 0 6 4 8 6 8 0-8 4-14 10-18-1 8 4 12 6 18 2-3 3-6 3-9 6 6 7 16 1 23Z" />
      <rect x="160" y="474" width="200" height="18" className={`fill-steel ${O}`} strokeWidth="2.5" />
      <path d="M170 492v16M350 492v16" className={O} strokeWidth="5" />

      <Label x={8} y={44} to={[204, 40]}>COLD IN</Label>
      <Label x={8} y={250} to={[204, 300]}>DIP TUBE</Label>
      <Label x={8} y={400} to={[240, 452]}>BURNER</Label>
      <Label x={512} y={44} to={[316, 40]} anchor="end">HOT OUT</Label>
      <Label x={512} y={210} to={[296, 230]} anchor="end">ANODE ROD</Label>
      <Label x={512} y={90} to={[364, 128]} anchor="end">T&amp;P VALVE</Label>
      <Label x={512} y={330} to={[261, 330]} anchor="end">FLUE + BAFFLE</Label>
    </svg>
  );
}
