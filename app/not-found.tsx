import type { Metadata } from 'next';
import { NotFoundArt } from '../components/art/not-found-art';
import { Icon } from '../components/art/icons';
import { SiteLink } from '../components/site-link';
import { business } from '../content/business';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="blueprint border-b-[3px] border-outline">
      <div className="wrap grid items-center gap-8 py-16 md:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-4 text-[clamp(3.4rem,9vw,6rem)] leading-[.88]">This pipe goes nowhere.</h1>
          <p className="mt-5 max-w-md text-lg text-muted">
            The page you were after has been capped off or never existed. Head back to the main line,
            or call us if water is somewhere it shouldn’t be.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <SiteLink href="/" className="button">Back to Home</SiteLink>
            <SiteLink href="/services/" className="button button-quiet">See services</SiteLink>
          </div>
          <p className="mt-6"><a href={`tel:${business.phoneE164}`} className="inline-flex items-center gap-2 font-mono text-2xl font-bold text-ink"><Icon name="phone" className="size-6 text-safety" />{business.phone}</a></p>
        </div>
        <NotFoundArt className="w-full max-w-xl justify-self-center" />
      </div>
    </section>
  );
}
