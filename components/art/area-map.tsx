import type { ServiceArea } from '../../content/areas';
import { TrueNorthDial } from './dial';

const W = 800;
const H = 520;
const SHOP = { x: 474, y: 284 };

/**
 * Drawn map of the western tip of Lake Superior: St. Louis Bay, the river, Minnesota and
 * Wisconsin Points, the shop by the lift bridge, zone rings and town pins from content/areas.ts.
 * `crop="core"` zooms to the core zone for the Home teaser.
 */
export function AreaMap({ areas, crop, className = '', title }: {
  areas: readonly ServiceArea[];
  crop?: 'core';
  className?: string;
  title: string;
}) {
  const viewBox = crop === 'core' ? '186 56 510 400' : `0 0 ${W} ${H}`;
  const visibleAreas = crop === 'core' ? areas.filter(area => area.zone === 'core') : areas;
  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label={title}>
      <rect x="0" y="0" width={W} height={H} className="fill-surface" opacity=".55" />
      {/* Lake Superior */}
      <path d="M800 0v370c-80 6-160 12-240 16L522 380 482 292C560 230 640 150 700 96 735 64 770 30 800 0Z" className="fill-water stroke-outline" strokeWidth="2.5" fillOpacity=".3" />
      {[[620, 250], [700, 200], [720, 300], [640, 330], [760, 120]].map(([x, y]) => <path key={`${x}${y}`} d={`M${x} ${y}q8-6 16 0t16 0`} fill="none" className="stroke-water" strokeWidth="2" />)}
      <text x="548" y="300" className="font-display fill-water" fontSize="22" fontWeight="700" letterSpacing="6" fontStyle="italic"><tspan x="548">LAKE</tspan><tspan x="548" dy="24">SUPERIOR</tspan></text>
      {/* St. Louis Bay and the river */}
      <path d="M472 300l40 72c-30 8-64 6-92-6-24-10-42-24-56-38 30-4 70-8 92-18Z" className="fill-water stroke-outline" strokeWidth="2.5" fillOpacity=".3" />
      <path d="M362 328c-30 4-58 18-90 22s-64-6-96-10-64-6-90-8L0 336" fill="none" className="stroke-water" strokeWidth="7" strokeLinecap="round" />
      <path d="M362 328c-30 4-58 18-90 22s-64-6-96-10-64-6-90-8L0 336" fill="none" className="stroke-outline" strokeWidth="1" strokeDasharray="2 6" opacity=".6" />
      <text x="40" y="364" className="font-display fill-muted" fontSize="13" letterSpacing="2">ST. LOUIS RIVER</text>
      <text x="40" y="200" className="font-display fill-muted" fontSize="15" letterSpacing="5" opacity=".7">MINNESOTA</text>
      <text x="250" y="470" className="font-display fill-muted" fontSize="15" letterSpacing="5" opacity=".7">WISCONSIN</text>
      {/* Highways */}
      <g fill="none" className="stroke-muted" strokeWidth="2.5" strokeDasharray="10 6" opacity=".7">
        <path d="M456 270C400 290 330 320 224 343S140 330 104 322" />
        <path d="M466 268C540 210 620 140 688 73" />
        <path d="M456 270C420 250 380 230 352 213S410 150 416 135" />
        <path d="M456 395C440 360 450 330 456 300" />
      </g>
      {/* Zone rings around the shop */}
      <ellipse cx={SHOP.x} cy={SHOP.y} rx="420" ry="300" fill="none" className="stroke-safety" strokeWidth="3" strokeDasharray="4 8" strokeLinecap="round" />
      <ellipse cx={SHOP.x} cy={SHOP.y} rx="172" ry="168" className="fill-primary stroke-primary" fillOpacity=".07" strokeWidth="3" />
      {/* Aerial Lift Bridge at the canal */}
      <g transform={`translate(${SHOP.x + 2} ${SHOP.y - 2}) rotate(40)`}>
        <rect x="-10" y="-9" width="4" height="18" className="fill-outline" />
        <rect x="6" y="-9" width="4" height="18" className="fill-outline" />
        <rect x="-10" y="-9" width="20" height="4" className="fill-outline" />
      </g>
      {/* Town pins */}
      {visibleAreas.map(area => {
        const x = (area.x / 100) * W;
        const y = (area.y / 100) * H;
        const core = area.zone === 'core';
        const right = area.x < 80;
        return (
          <g key={area.id}>
            <path d={`M${x} ${y}c-7-9-11-14-11-19a11 11 0 0 1 22 0c0 5-4 10-11 19Z`} className={`${core ? 'fill-primary' : 'fill-safety'} stroke-outline`} strokeWidth="2" />
            <circle cx={x} cy={y - 19} r="3.5" className="fill-paper" />
            <text x={right ? x + 16 : x - 16} y={y - 12} textAnchor={right ? 'start' : 'end'} className="font-display fill-ink stroke-paper" style={{ paintOrder: 'stroke' }}
              strokeWidth="5" fontSize="20" fontWeight="800" letterSpacing="1">{area.name.toUpperCase()}</text>
          </g>
        );
      })}
      {crop ? null : <svg x="16" y="16" width="120" height="120"><TrueNorthDial compass /></svg>}
    </svg>
  );
}
