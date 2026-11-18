import { Children, type ReactNode } from 'react';
import { coreAreas, extendedAreas, areas } from '../content/areas';
import { business } from '../content/business';
import { callOutFees } from '../content/pricing';
import { serviceIcon, services } from '../content/services';
import { hoursRows, usd } from '../lib/format';
import { asset } from '../lib/paths';
import { AreaMap } from './art/area-map';
import { TrueNorthDial } from './art/dial';
import { Icon } from './art/icons';
import { ChevronStripe, JobTicket } from './art/pieces';
import { CopyEmail } from './copy-email';
import { PriceFrom } from './fee';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

type Content = { children: ReactNode };

/* ---------- 1. Hero: asymmetric split on blueprint paper with the basement cutaway ---------- */

function HeroArtwork({ className }: { className: string }) {
  return (
    <>
      <img src={asset('/hero-light.webp')} alt="" width={1440} height={1075} aria-hidden="true" decoding="async" fetchPriority="high" className={`hero-art-light ${className}`} />
      <img src={asset('/hero-dark.webp')} alt="" width={1440} height={1075} aria-hidden="true" decoding="async" fetchPriority="high" className={`hero-art-dark ${className}`} />
    </>
  );
}

function HeroSection({ children }: Content) {
  return (
    <section className="blueprint relative overflow-hidden border-b-[3px] border-outline">
      <div className="wrap grid items-center gap-8 pt-8 pb-10 lg:grid-cols-12 lg:py-12">
        <div className="relative z-10 lg:col-span-5">
          <div className="-mx-4 -mt-8 mb-6 border-b-[3px] border-outline sm:hidden">
            <HeroArtwork className="no-print h-44 w-full object-cover object-[50%_24%]" />
          </div>
          {children}
        </div>
        <div className="relative max-sm:hidden lg:col-span-7">
          <div className="overflow-hidden border-[3px] border-outline bg-surface shadow-[8px_10px_0_var(--shadow)]">
            <HeroArtwork className="no-print h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
function Eyebrow({ children }: Content) { return <p className="eyebrow">{children}</p>; }
function Heading({ children }: Content) {
  return <h1 className="mt-4 text-[clamp(3.6rem,10vw,5.75rem)] leading-[.88]">{children}</h1>;
}
function Introduction({ children }: Content) {
  return <p className="mt-5 max-w-xl text-lg text-muted">{children}</p>;
}
function Fees({ children }: Content) {
  return (
    <p className="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 border-2 border-outline bg-ticket px-4 py-2.5 font-mono text-[.95rem] shadow-[5px_6px_0_var(--shadow)]">
      {Children.toArray(children).map((child, i) => <span key={i} className="contents">{i ? <span aria-hidden="true" className="text-safety">●</span> : null}{child}</span>)}
    </p>
  );
}
function Actions({ children }: Content) {
  return <div className="mt-7 flex flex-wrap gap-3 [&>*]:max-sm:w-full">{children}</div>;
}
function Call({ children }: Content) {
  return <a href={`tel:${business.phoneE164}`} className="button text-xl"><Icon name="phone" className="size-6" />{children} <span className="font-mono">{business.phone}</span></a>;
}
function Enquiry({ children }: Content) {
  return <SiteLink href="/contact/" className="button button-quiet">{children}</SiteLink>;
}
export const Hero = Object.assign(HeroSection, { Eyebrow, Heading, Introduction, Fees, Actions, Call, Enquiry });

/* ---------- 2. Valve tags hanging from a copper manifold ---------- */

const CHAINS = ['h-8', 'h-16', 'h-11', 'h-20', 'h-12', 'h-6', 'h-16', 'h-10'];

function ManifoldSection({ children }: Content) {
  return <section className="py-16 sm:py-20" aria-labelledby="manifold-heading">{children}</section>;
}
function ManifoldHeading({ children }: Content) {
  return <h2 id="manifold-heading" className="wrap text-[clamp(2.6rem,6vw,4.4rem)]">{children}</h2>;
}
function ManifoldIntro({ children }: Content) {
  return <div className="wrap"><p className="mt-3 max-w-2xl text-lg text-muted">{children}</p></div>;
}
function ManifoldTags() {
  const featured = services.filter(item => item.featured);
  return (
    <ul className="wrap mt-10 grid grid-cols-1 md:grid-cols-4 xl:grid-cols-8">
      {featured.map((item, i) => (
        <li key={item.id} className="relative flex items-center md:flex-col md:items-center md:pb-8">
          {/* manifold segment: vertical on phones, horizontal from md */}
          <div aria-hidden="true" className="pipe-v absolute inset-y-0 left-3 md:hidden" />
          <div aria-hidden="true" className="pipe-h absolute inset-x-0 top-0 hidden md:block" />
          <div aria-hidden="true" className="absolute top-[-6px] hidden h-7 w-6 border-2 border-outline bg-copper md:block" />
          <div aria-hidden="true" className="ml-7 h-1.5 w-8 shrink-0 border-y border-outline bg-steel md:hidden" />
          <div className="swing flex items-center py-3 md:flex-col md:py-0">
            <div aria-hidden="true" className={`chain hidden md:block md:mt-5 ${CHAINS[i % CHAINS.length]}`} />
            <SiteLink href={`/services/#${item.id}`} className="valve-tag w-[8.5rem] md:w-[9.25rem] xl:w-[8.6rem]" style={{ ['--behind' as string]: 'var(--paper)' }}>
              <Icon name={serviceIcon(item)} className="size-7" />
              <span className="font-display text-[1.02rem] leading-[1.02] font-extrabold uppercase">{item.name}</span>
              <PriceFrom service={item} className="font-display text-sm font-bold" />
            </SiteLink>
            <p className="ml-4 max-w-[12rem] text-sm text-muted md:hidden">{item.symptom}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
function ManifoldMore({ children }: Content) {
  return <p className="wrap mt-4"><SiteLink href="/services/" className="text-link font-bold">{children}</SiteLink></p>;
}
export const Manifold = Object.assign(ManifoldSection, { Heading: ManifoldHeading, Introduction: ManifoldIntro, Tags: ManifoldTags, More: ManifoldMore });

/* ---------- 3. Navy band: job ticket overlapping the edge, and the big dial ---------- */

function PriceBandSection({ children }: Content) {
  return (
    <section className="livery on-panel relative mt-10" aria-labelledby="price-heading">
      <div className="wrap grid items-start gap-10 pb-16 lg:grid-cols-[1fr_1.1fr_auto]">{children}</div>
    </section>
  );
}
function PriceBandHeading({ children }: Content) {
  return <h2 id="price-heading" className="pt-14 text-[clamp(2.6rem,6vw,4.6rem)] text-panel-ink">{children}</h2>;
}
function PriceBandText({ children }: Content) {
  return <p className="mt-4 max-w-md text-lg text-panel-muted">{children}</p>;
}
function PriceBandLink({ children }: Content) {
  return <p className="mt-6"><SiteLink href="/pricing/" className="button button-safety">{children}</SiteLink></p>;
}
function PriceBandTicket({ children }: Content) {
  return (
    <div className="lg:-mt-12 lg:rotate-[-1.5deg] lg:[--behind:var(--paper)]">
      <JobTicket title="Call-out" stamp="Upfront">
        <dl className="divide-y-2 divide-dashed divide-rule">
          {callOutFees.map(fee => (
            <div key={fee.id} className="flex items-baseline justify-between gap-4 py-4">
              <dt><span className="block font-display text-2xl font-extrabold uppercase">{fee.label}</span><span className="text-sm text-muted">{fee.when}</span></dt>
              <dd className={`font-mono text-4xl font-bold ${fee.id === 'after-hours' ? 'text-stamp' : ''}`}>{usd(fee.fee)}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 border-t-2 border-outline pt-3 text-sm">{children}</p>
      </JobTicket>
    </div>
  );
}
function PriceBandDial() {
  return <div className="hidden justify-self-center pt-10 lg:block"><TrueNorthDial value="standard" className="size-64" /></div>;
}
function Left({ children }: Content) { return <div>{children}</div>; }
export const PriceBand = Object.assign(PriceBandSection, { Intro: Left, Heading: PriceBandHeading, Text: PriceBandText, Link: PriceBandLink, Ticket: PriceBandTicket, Dial: PriceBandDial });

/* ---------- 4. How a call goes: steps on a snaking pipe ---------- */

function StepsSection({ children }: Content) {
  return <section className="blueprint-faint py-20" aria-labelledby="steps-heading"><div className="wrap">{children}</div></section>;
}
function StepsHeading({ children }: Content) {
  return <h2 id="steps-heading" className="text-[clamp(2.6rem,6vw,4.4rem)]">{children}</h2>;
}
function StepsList({ children }: Content) {
  const items = Children.toArray(children);
  return (
    <div className="relative mt-12">
      <svg aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-[15rem] w-full md:block" viewBox="0 0 1000 240" preserveAspectRatio="none">
        <path d="M0 44H250V196H500V44H750V196H1000" fill="none" className="stroke-outline" strokeWidth="20" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        <path d="M0 44H250V196H500V44H750V196H1000" fill="none" className="stroke-copper" strokeWidth="15" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        <path d="M0 40H250V192H500V40H750V192H1000" fill="none" className="stroke-copper-hi" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinejoin="round" opacity=".8" />
      </svg>
      <div aria-hidden="true" className="pipe-v absolute inset-y-0 left-[2.1rem] md:hidden" />
      <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
        {items.map((item, i) => (
          <li key={i} className={`relative flex gap-5 md:block ${i % 2 ? 'md:pt-[9.6rem]' : ''}`}>
            <span aria-hidden="true" className="grid size-[4.5rem] shrink-0 place-items-center rounded-full border-[3px] border-outline bg-dial-face font-mono text-3xl font-bold text-[#0e1b2e] shadow-[4px_5px_0_var(--shadow)] md:mx-auto md:size-24 md:text-4xl">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="md:mt-5 md:px-6 md:text-center">{item}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
function Step({ title, children }: { title: string; children: ReactNode }) {
  return <><h3 className="text-[1.9rem]">{title}</h3><p className="mt-2 text-muted">{children}</p></>;
}
export const Steps = Object.assign(StepsSection, { Heading: StepsHeading, List: StepsList, Step });

/* ---------- 5. Where we roll: map teaser beside highway signs ---------- */

function AreaTeaserSection({ children }: Content) {
  return (
    <section className="border-y-[3px] border-outline bg-surface" aria-labelledby="areas-heading">
      <div className="grid lg:grid-cols-2">
        <div className="blueprint border-b-[3px] border-outline lg:border-r-[3px] lg:border-b-0">
          <AreaMap areas={areas} crop="core" className="block h-full max-h-[34rem] w-full" title="Map of the core service area around Duluth and Superior" />
        </div>
        <div className="px-4 py-14 sm:px-10 lg:px-14">{children}</div>
      </div>
    </section>
  );
}
function AreaHeading({ children }: Content) {
  return <h2 id="areas-heading" className="text-[clamp(2.6rem,6vw,4.4rem)]">{children}</h2>;
}
function AreaText({ children }: Content) { return <p className="mt-4 max-w-lg text-lg text-muted">{children}</p>; }
function AreaSigns() {
  return (
    <>
      <ul className="mt-7 flex flex-wrap gap-3" aria-label="Core towns, no surcharge">
        {coreAreas.map(area => <li key={area.id} className="road-sign"><span className="text-xl">{area.name}</span><span className="font-mono text-xs opacity-80">{area.state} · core</span></li>)}
      </ul>
      <p className="mt-5 text-sm text-muted">Also: {extendedAreas.map(area => `${area.name} (+${usd(area.surcharge)})`).join(', ')}.</p>
    </>
  );
}
function AreaLink({ children }: Content) {
  return <p className="mt-6"><SiteLink href="/areas/" className="button">{children}</SiteLink></p>;
}
export const AreaTeaser = Object.assign(AreaTeaserSection, { Heading: AreaHeading, Text: AreaText, Signs: AreaSigns, Link: AreaLink });

/* ---------- 6. Office & dispatch: chevron-edged strip ---------- */

function DispatchSection({ children }: Content) {
  return (
    <section aria-labelledby="dispatch-heading" className="bg-paper">
      <ChevronStripe className="h-3" />
      <div className="wrap py-14">{children}</div>
    </section>
  );
}
function DispatchHeading({ children }: Content) {
  return <h2 id="dispatch-heading" className="text-[clamp(2.2rem,5vw,3.4rem)]">{children}</h2>;
}
function DispatchColumns({ children }: Content) {
  return <div className="mt-8 grid gap-10 border-t-[3px] border-outline pt-8 md:grid-cols-3 md:divide-x-2 md:divide-dashed md:divide-line [&>*]:md:px-6 [&>*:first-child]:md:pl-0">{children}</div>;
}
function DispatchHours({ children }: Content) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-2xl"><Icon name="clock" className="size-6 text-safety" />{children}</h3>
      <p className="mt-3"><OpenBadge hours={business.officeHours} /></p>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-5 font-mono">
        {hoursRows(business.officeHours).map(row => <div key={row.days} className="contents"><dt className="text-muted">{row.days}</dt><dd>{row.time}</dd></div>)}
      </dl>
      <TimeZoneNote />
    </div>
  );
}
function DispatchLine({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-2xl"><Icon name="phone" className="size-6 text-safety" />{title}</h3>
      <p className="mt-3"><a href={`tel:${business.phoneE164}`} className="font-mono text-3xl font-bold text-ink no-underline hover:underline">{business.phone}</a></p>
      <p className="mt-2 text-muted">{children}</p>
    </div>
  );
}
function DispatchContact({ title, children }: { title: string; children: ReactNode }) {
  const { address } = business;
  return (
    <div>
      <h3 className="flex items-center gap-2 text-2xl"><Icon name="pin" className="size-6 text-safety" />{title}</h3>
      <p className="mt-3"><a className="text-link break-all" href={`mailto:${business.email}`}>{business.email}</a></p>
      <div className="mt-2 flex flex-wrap items-center gap-3 [&_.button]:min-h-10 [&_.button]:text-base"><CopyEmail email={business.email} /></div>
      <address className="mt-3 text-muted not-italic">{address.street}, {address.locality}, {address.region} {address.postalCode}</address>
      <p className="mt-1 text-sm text-muted">{children}</p>
    </div>
  );
}
export const Dispatch = Object.assign(DispatchSection, { Heading: DispatchHeading, Columns: DispatchColumns, Hours: DispatchHours, Line: DispatchLine, Contact: DispatchContact });
