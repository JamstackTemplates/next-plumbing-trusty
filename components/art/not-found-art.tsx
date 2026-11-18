const O = 'stroke-outline';

/** A capped pipe stub out of a block wall, dripping, with a wrench on a hook and a "404" valve tag. */
export function NotFoundArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 420" className={className} aria-hidden="true" focusable="false">
      <rect width="190" height="420" fill="url(#tn-blocks)" />
      <rect width="190" height="420" fill="url(#tn-hatch)" opacity=".5" />
      <line x1="190" y1="0" x2="190" y2="420" className={O} strokeWidth="3" />
      {/* Escutcheon and stub */}
      <ellipse cx="190" cy="150" rx="10" ry="40" className={`fill-steel ${O}`} strokeWidth="2.5" />
      <rect x="190" y="132" width="200" height="36" className={`fill-copper ${O}`} strokeWidth="3" />
      <line x1="194" y1="140" x2="386" y2="140" className="stroke-copper-hi" strokeWidth="4" />
      <rect x="260" y="126" width="18" height="48" rx="3" className={`fill-copper ${O}`} strokeWidth="3" />
      {/* End cap */}
      <path d="M386 122h22a12 12 0 0 1 12 12v32a12 12 0 0 1-12 12h-22Z" className={`fill-brass ${O}`} strokeWidth="3" />
      <path d="M398 122v56" className={O} strokeWidth="1.5" opacity=".5" />
      {/* Drip */}
      <path className="drip fill-water" d="M410 184c5 7 9 12 9 16a9 9 0 0 1-18 0c0-4 4-9 9-16Z" stroke="var(--outline)" strokeWidth="2" />
      <ellipse cx="410" cy="372" rx="46" ry="8" className="fill-water" opacity=".45" />
      <ellipse cx="410" cy="372" rx="26" ry="4" className="fill-water" opacity=".6" />
      {/* Valve tag on a chain */}
      <path d="M320 168v34" className="stroke-steel" strokeWidth="4" strokeDasharray="5 3" />
      <circle cx="320" cy="248" r="48" className={`fill-brass ${O}`} strokeWidth="3" />
      <circle cx="320" cy="248" r="40" fill="none" className="stroke-brass-deep" strokeWidth="2" />
      <circle cx="320" cy="212" r="6" className={`fill-paper ${O}`} strokeWidth="2" />
      <text x="320" y="264" textAnchor="middle" className="font-mono" fontSize="34" fontWeight="700" fill="#2a1f08">404</text>
      {/* Hook and wrench on the wall */}
      <path d="M120 250v18a10 10 0 0 0 20 0" fill="none" className={O} strokeWidth="5" strokeLinecap="round" />
      <path d="M128 276l-4 120h18l-4-120Z" className={`fill-steel ${O}`} strokeWidth="2.5" />
      <path d="M118 262a20 20 0 1 0 22 0l-3 14h-16Z" className={`fill-steel ${O}`} strokeWidth="2.5" />
      <path d="M118 400a12 12 0 0 0 24 0" className={`fill-steel ${O}`} strokeWidth="2.5" />
      {/* Floor */}
      <path d="M0 400h520" className={O} strokeWidth="3" />
      <rect y="400" width="520" height="20" fill="url(#tn-hatch)" />
    </svg>
  );
}
