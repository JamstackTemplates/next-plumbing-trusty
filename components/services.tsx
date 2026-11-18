import type { ReactNode } from 'react';
import { categories, servicesIn } from '../content/services';
import { HeaterCutaway } from './art/heater-cutaway';
import { Icon } from './art/icons';
import { CategoryFilter } from './category-filter';
import { PriceFrom } from './fee';

type Content = { children: ReactNode };

/**
 * Services as a supply-house binder: brass index tabs, then one binder page per category with
 * ruled spec rows like a parts catalogue.
 */
function CatalogueSection({ children }: Content) {
  return <section id="catalogue" className="blueprint-faint py-14" aria-label="All services"><div className="wrap">{children}</div></section>;
}
function Introduction({ children }: Content) {
  return <p className="mb-8 max-w-2xl text-lg text-muted">{children}</p>;
}
function Tabs({ children }: { children: string }) {
  return <CategoryFilter categories={categories} allLabel={children} />;
}
/** Column labels for the spec rows; also used as the per-row labels on phones. */
function Pages({ symptom, work, visit, price, emergency }: { symptom: string; work: string; visit: string; price: string; emergency: string }) {
  return (
    <div className="space-y-10">
      {categories.map(cat => (
        <section key={cat.id} id={`cat-${cat.id}`} data-category-section={cat.id} aria-labelledby={`cat-${cat.id}-h`}
          className="grid border-[3px] border-outline bg-surface shadow-[8px_10px_0_var(--shadow)] md:grid-cols-[11rem_1fr]">
          <div className="flex items-center gap-3 border-b-[3px] border-outline bg-brass px-5 py-4 text-tag-ink md:flex-col md:items-start md:border-r-[3px] md:border-b-0 md:py-6">
            <Icon name={cat.icon} className="size-10 md:size-14" />
            <h2 id={`cat-${cat.id}-h`} className="text-[1.9rem] md:text-[2.1rem]">{cat.label}</h2>
          </div>
          <div>
            <div aria-hidden="true" className="hidden grid-cols-[1.3fr_1.2fr_1.4fr_.7fr_.7fr] gap-4 border-b-2 border-outline px-5 py-2 font-mono text-xs tracking-widest text-muted uppercase lg:grid">
              <span>Service</span><span>{symptom}</span><span>{work}</span><span>{visit}</span><span className="text-right">{price}</span>
            </div>
            <ul>
              {servicesIn(cat.id).map(item => (
                <li key={item.id} id={item.id} className="grid scroll-mt-28 gap-x-4 gap-y-1.5 border-b border-dashed border-line px-5 py-5 last:border-b-0 target:bg-brass/20 lg:grid-cols-[1.3fr_1.2fr_1.4fr_.7fr_.7fr] lg:items-baseline">
                  <h3 className="flex flex-wrap items-center gap-2 text-[1.6rem] leading-none">
                    {item.name}
                    {item.emergency ? <span className="inline-flex items-center gap-1.5 rounded-sm bg-safety px-2 py-0.5 font-mono text-xs tracking-wider text-on-safety normal-case">
                      <span className="beacon size-2! border" aria-hidden="true" />{emergency}</span> : null}
                  </h3>
                  <p><span className="font-mono text-xs tracking-wider text-muted uppercase lg:hidden">{symptom}: </span>{item.symptom}</p>
                  <p className="text-muted"><span className="font-mono text-xs tracking-wider uppercase lg:hidden">{work}: </span>{item.whatWeDo}</p>
                  <p className="font-mono text-sm"><span className="text-xs tracking-wider text-muted uppercase lg:hidden">{visit}: </span>{item.typicalVisit}</p>
                  <p className="text-xl lg:text-right"><PriceFrom service={item} /></p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
function Footnote({ children }: Content) {
  return <p className="mt-8 max-w-3xl border-l-4 border-safety pl-4 text-muted">{children}</p>;
}
export const Catalogue = Object.assign(CatalogueSection, { Introduction, Tabs, Pages, Footnote });

/* ---------- Water heater corner: cutaway beside a riveted spec plate ---------- */

function HeaterCornerSection({ children, art }: Content & { art: string }) {
  return (
    <section className="border-y-[3px] border-outline bg-paper py-16" aria-labelledby="heater-heading">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <HeaterCutaway className="mx-auto w-full max-w-lg" title={art} />
        <div>{children}</div>
      </div>
    </section>
  );
}
function HeaterHeading({ children }: Content) {
  return <h2 id="heater-heading" className="text-[clamp(2.6rem,6vw,4.2rem)]">{children}</h2>;
}
function HeaterText({ children }: Content) {
  return <p className="mt-4 max-w-xl text-lg text-muted">{children}</p>;
}
function Plate({ children, tank, tankless }: Content & { tank: string; tankless: string }) {
  return (
    <div className="relative mt-8 border-[3px] border-outline bg-brass p-2 text-tag-ink shadow-[6px_8px_0_var(--shadow)]">
      {['top-1.5 left-1.5', 'top-1.5 right-1.5', 'bottom-1.5 left-1.5', 'bottom-1.5 right-1.5'].map(pos => <span key={pos} aria-hidden="true" className={`absolute ${pos} size-2.5 rounded-full border-2 border-outline bg-brass-deep`} />)}
      <table className="w-full border-collapse border-2 border-brass-deep text-left">
        <thead><tr className="font-display text-xl uppercase"><th className="p-3"><span className="sr-only">Feature</span></th><th className="p-3">{tank}</th><th className="p-3">{tankless}</th></tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
function Row({ label, tank, tankless }: { label: string; tank: ReactNode; tankless: ReactNode }) {
  return (
    <tr className="border-t-2 border-dashed border-brass-deep align-top">
      <th scope="row" className="p-3 font-mono text-xs tracking-widest uppercase">{label}</th>
      <td className="p-3">{tank}</td>
      <td className="p-3">{tankless}</td>
    </tr>
  );
}
export const HeaterCorner = Object.assign(HeaterCornerSection, { Heading: HeaterHeading, Text: HeaterText, Plate, Row });
