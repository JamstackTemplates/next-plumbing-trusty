import { areas } from '../content/areas';
import { business } from '../content/business';
import { hoursRows } from '../lib/format';
import { TrueNorthDial } from './art/dial';
import { ChevronStripe } from './art/pieces';
import { CopyEmail } from './copy-email';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

export function SiteFooter() {
  const { address } = business;
  return (
    <footer className="mt-0">
      <ChevronStripe className="h-4" />
      <div className="livery on-panel">
        <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <TrueNorthDial className="size-16 shrink-0" bands={false} />
              <p className="font-display text-3xl leading-none font-extrabold uppercase">True North<br /><span className="text-xl tracking-[.3em] text-panel-muted">Plumbing</span></p>
            </div>
            <address className="mt-5 text-panel-muted not-italic">
              {address.street}<br />{address.locality}, {address.region} {address.postalCode}<br />
              <span className="text-sm">{address.note}</span>
            </address>
          </div>
          <div>
            <h2 className="font-display text-xl text-panel-ink">Office hours</h2>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-sm">
              {hoursRows(business.officeHours).map(row => <div key={row.days} className="contents"><dt className="text-panel-muted">{row.days}</dt><dd>{row.time}</dd></div>)}
            </dl>
            <TimeZoneNote className="text-panel-muted" />
          </div>
          <div>
            <h2 className="font-display text-xl text-panel-ink">24/7 line</h2>
            <p className="mt-2"><a href={`tel:${business.phoneE164}`} className="font-mono text-2xl font-bold text-safety no-underline hover:underline">{business.phone}</a></p>
            <p className="mt-1 text-sm text-panel-muted">{business.emergencyLine}</p>
            <h2 className="mt-5 font-display text-xl text-panel-ink">Email</h2>
            <p className="mt-1"><a className="text-link break-all" href={`mailto:${business.email}`}>{business.email}</a></p>
            <div className="mt-2 flex flex-wrap items-center gap-3 [&_.button]:min-h-9 [&_.button]:text-sm"><CopyEmail email={business.email} /></div>
          </div>
          <div>
            <h2 className="font-display text-xl text-panel-ink">Where we roll</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-panel-muted">
              {areas.map(area => <li key={area.id}>{area.name}{area.zone === 'extended' ? ' +' : ''}</li>)}
            </ul>
            <p className="mt-3 text-sm"><SiteLink href="/areas/" className="text-link">Service areas &amp; surcharges</SiteLink></p>
          </div>
        </div>
        <div className="border-t border-white/15">
          <div className="wrap flex flex-wrap items-center justify-between gap-4 py-5 text-sm text-panel-muted">
            <p>Sample business for the Jamstacks gallery · Prices are “from” prices, confirmed in writing on site.</p>
            <span title="Made with love by jamstacks.net">with <span role="img" aria-label="love">❤️</span> <a className="text-panel-ink no-underline hover:underline" href="https://jamstacks.net">jamstacks.net</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
