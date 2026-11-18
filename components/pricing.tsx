import { Children, type ReactNode } from 'react';
import { business } from '../content/business';
import { callOutCovers } from '../content/pricing';
import { categories, servicesIn } from '../content/services';
import { Icon } from './art/icons';
import { PriceFrom } from './fee';

type Content = { children: ReactNode };

/* ---------- Meter section wrapper ---------- */
function MeterSection({ children }: Content) {
  return <section className="blueprint py-16" aria-labelledby="meter-heading"><div className="wrap">{children}</div></section>;
}
function MeterHeading({ children }: Content) {
  return <h2 id="meter-heading" className="mb-10 text-[clamp(2.4rem,5.5vw,4rem)]">{children}</h2>;
}
export const Meter = Object.assign(MeterSection, { Heading: MeterHeading });

/* ---------- What the call-out covers: checklist on ruled ticket paper ---------- */
function CoversSection({ children }: Content) {
  return (
    <section className="py-16" aria-labelledby="covers-heading">
      <div className="wrap grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start">{children}</div>
    </section>
  );
}
function CoversHeading({ children }: Content) {
  return <h2 id="covers-heading" className="text-[clamp(2.4rem,5.5vw,4rem)]">{children}</h2>;
}
function CoversText({ children }: Content) { return <p className="mt-4 text-lg text-muted">{children}</p>; }
function CoversIntro({ children }: Content) { return <div>{children}</div>; }
function CoversList() {
  return (
    <ul className="ticket px-6 pt-6 pb-4 sm:px-8">
      {callOutCovers.map(item => (
        <li key={item} className="flex min-h-16 items-center gap-4 border-b border-rule py-2 text-lg last:border-b-0">
          <span className="grid size-9 shrink-0 place-items-center border-2 border-outline bg-brass text-tag-ink"><Icon name="check" className="size-6" /></span>
          {item}
        </li>
      ))}
    </ul>
  );
}
export const Covers = Object.assign(CoversSection, { Intro: CoversIntro, Heading: CoversHeading, Text: CoversText, List: CoversList });

/* ---------- Printed rate card, generated from content/services.ts ---------- */
function RateCardSection({ children }: Content) {
  return (
    <section className="border-y-[3px] border-outline bg-surface py-16" aria-labelledby="rates-heading">
      <div className="wrap max-w-4xl!">{children}</div>
    </section>
  );
}
function RateHeading({ children }: Content) {
  return <h2 id="rates-heading" className="text-center text-[clamp(2.4rem,5.5vw,4rem)]">{children}</h2>;
}
function RateText({ children }: Content) { return <p className="mx-auto mt-3 max-w-2xl text-center text-muted">{children}</p>; }
function RateList() {
  return (
    <div className="mt-10 border-y-4 border-double border-outline py-6">
      {categories.map(cat => (
        <div key={cat.id} className="break-inside-avoid py-3">
          <h3 className="flex items-center gap-2 text-2xl text-copper"><Icon name={cat.icon} className="size-6" />{cat.label}</h3>
          <ul className="mt-2">
            {servicesIn(cat.id).map(item => (
              <li key={item.id} className="flex items-baseline gap-2 py-1">
                <span>{item.name}</span>
                <span aria-hidden="true" className="min-w-6 flex-1 translate-y-[-4px] border-b-2 border-dotted border-steel" />
                <PriceFrom service={item} className="text-lg whitespace-nowrap" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
function RateNote({ children }: Content) {
  return <>
    <p className="mt-4 text-center text-sm text-muted">{children}</p>
    <p className="print-phone mt-4 hidden text-center font-mono text-sm font-bold">Call 24/7: {business.phone} · {business.email}</p>
  </>;
}
export const RateCard = Object.assign(RateCardSection, { Heading: RateHeading, Text: RateText, List: RateList, Note: RateNote });

/* ---------- Our price promise: big statements on navy, split by pipe risers ---------- */
function PromiseSection({ children }: Content) {
  const items = Children.toArray(children);
  const heading = items[0];
  const statements = items.slice(1);
  return (
    <section className="livery on-panel py-16" aria-labelledby="promise-heading">
      <div className="wrap">
        {heading}
        <ol className="mt-10 grid gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-6">
          {statements.flatMap((item, i) => [
            i ? <li key={`p${i}`} aria-hidden="true" className="pipe-v hidden md:block" /> : null,
            <li key={i} className="flex gap-4 md:block">
              <span className="font-mono text-5xl font-bold text-safety md:text-6xl">{String(i + 1).padStart(2, '0')}</span>
              <div className="md:mt-3">{item}</div>
            </li>,
          ])}
        </ol>
      </div>
    </section>
  );
}
function PromiseHeading({ children }: Content) {
  return <h2 id="promise-heading" className="text-[clamp(2.4rem,5.5vw,4rem)] text-panel-ink">{children}</h2>;
}
function PromiseItem({ title, children }: { title: string; children: ReactNode }) {
  return <><h3 className="text-[clamp(1.9rem,3.4vw,2.6rem)] text-panel-ink">{title}</h3><p className="mt-2 text-panel-muted">{children}</p></>;
}
export const PricePromise = Object.assign(PromiseSection, { Heading: PromiseHeading, Item: PromiseItem });

/* ---------- FAQ ---------- */
function FaqSection({ children }: Content) {
  return <section className="py-16" aria-labelledby="faq-heading"><div className="wrap max-w-3xl!">{children}</div></section>;
}
function FaqHeading({ children }: Content) {
  return <h2 id="faq-heading" className="mb-8 text-[clamp(2.4rem,5.5vw,4rem)]">{children}</h2>;
}
function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  return (
    <details className="group border-b-2 border-outline first-of-type:border-t-2">
      <summary className="flex items-center justify-between gap-4 py-4 font-display text-[1.6rem] leading-tight font-bold uppercase">
        {question}
        <span className="wrench-turn shrink-0 text-copper"><Icon name="wrench" className="size-7" /></span>
      </summary>
      <div className="pb-5 text-lg text-muted">{children}</div>
    </details>
  );
}
export const Faq = Object.assign(FaqSection, { Heading: FaqHeading, Item: FaqItem });
