import type { ReactNode } from 'react';
import { areas, coreAreas, extendedAreas } from '../content/areas';
import { usd } from '../lib/format';
import { AreaMap } from './art/area-map';
import { SiteLink } from './site-link';

type Content = { children: ReactNode };

/* ---------- Full-width drawn map with legend ---------- */
function MapSection({ children, title }: Content & { title: string }) {
  return (
    <section className="blueprint border-b-[3px] border-outline" aria-label={title}>
      <div className="wrap py-10">
        <div className="border-[3px] border-outline bg-paper shadow-[8px_10px_0_var(--shadow)]">
          <AreaMap areas={areas} className="block h-auto w-full" title={title} />
        </div>
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm">{children}</div>
      </div>
    </section>
  );
}
function Legend({ zone, children }: Content & { zone: 'core' | 'extended' | 'shop' }) {
  const swatch = zone === 'core' ? 'size-4 rounded-full border-[3px] border-primary bg-primary/10'
    : zone === 'extended' ? 'size-4 rounded-full border-[3px] border-dashed border-safety'
    : 'h-4 w-2 border-x-[3px] border-t-[3px] border-outline';
  return <p className="flex items-center gap-2"><span aria-hidden="true" className={swatch} />{children}</p>;
}
export const AreaMapSection = Object.assign(MapSection, { Legend });

/* ---------- Two groups of highway signs ---------- */
function ZonesSection({ children }: Content) {
  return <section className="py-16" aria-label="Service zones"><div className="wrap grid gap-14 lg:grid-cols-2">{children}</div></section>;
}
function Zone({ zone, title, children }: Content & { zone: 'core' | 'extended'; title: string }) {
  const list = zone === 'core' ? coreAreas : extendedAreas;
  return (
    <div>
      <h2 className="text-[clamp(2.4rem,5vw,3.6rem)]">{title}</h2>
      <p className="mt-3 max-w-lg text-lg text-muted">{children}</p>
      <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-6">
        {list.map(area => (
          <li key={area.id} className="flex flex-col items-center">
            <span className="road-sign text-center"><span className="text-2xl">{area.name}</span><span className="font-mono text-xs opacity-80">{area.state === 'WI' ? 'Wisconsin' : 'Minnesota'}</span></span>
            {area.surcharge ? <span className="mile-plate">+{usd(area.surcharge)}</span> : null}
            <span aria-hidden="true" className="h-8 w-2 border-x-2 border-outline bg-steel" />
          </li>
        ))}
      </ul>
    </div>
  );
}
export const Zones = Object.assign(ZonesSection, { Zone });

/* ---------- "Not on the list?" paper note ---------- */
function NoteSection({ children, link }: Content & { link: string }) {
  return (
    <section className="pb-16">
      <div className="wrap">
        <div className="ticket mx-auto max-w-2xl rotate-[.8deg] px-7 pt-8 pb-7 text-center">
          <div className="text-lg">{children}</div>
          <p className="mt-5"><SiteLink href="/contact/" className="button">{link}</SiteLink></p>
        </div>
      </div>
    </section>
  );
}
function NoteHeading({ children }: Content) { return <h2 className="text-[clamp(2rem,4.5vw,3rem)]">{children}</h2>; }
export const AreaNote = Object.assign(NoteSection, { Heading: NoteHeading });
