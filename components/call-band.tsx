import type { ReactNode } from 'react';
import { business } from '../content/business';
import { ChevronStripe } from './art/pieces';
import { Icon } from './art/icons';
import { SiteLink } from './site-link';

type Content = { children: ReactNode };

/** Closing call band: chevron stripe, a short heading and the 24/7 number as a big button. */
function CallBandSection({ children }: Content) {
  return (
    <section className="relative bg-safety text-on-safety">
      <ChevronStripe className="h-3" />
      <div className="wrap grid items-center gap-6 py-12 md:grid-cols-[1fr_auto]">{children}</div>
    </section>
  );
}
function Heading({ children }: Content) {
  return <div><h2 className="text-[clamp(2.2rem,5vw,3.6rem)]">{children}</h2></div>;
}
function Text({ children }: Content) {
  return <p className="max-w-xl text-lg font-bold md:col-start-1">{children}</p>;
}
function Actions({ children }: Content) {
  return (
    <div className="flex flex-wrap gap-3 md:col-start-2 md:row-span-2 md:row-start-1 md:flex-col md:items-stretch">
      <a href={`tel:${business.phoneE164}`} className="button text-xl"><Icon name="phone" className="size-6" /><span className="font-mono">{business.phone}</span></a>
      <SiteLink href="/contact/" className="button button-quiet border-on-safety text-on-safety">{children}</SiteLink>
    </div>
  );
}

export const CallBand = Object.assign(CallBandSection, { Heading, Text, Actions });
