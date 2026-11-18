import type { Metadata } from 'next';
import { ChevronStripe, JobTicket } from '../../components/art/pieces';
import { Icon } from '../../components/art/icons';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { TimeZoneNote } from '../../components/time-zone-note';
import { business } from '../../content/business';
import { hoursRows } from '../../lib/format';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = { title: 'Contact', description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') } };

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return <>
    <PageHead eyebrow="Contact" title={business.enquiries.title} icon="phone">
      <p>{business.enquiries.introduction}</p>
    </PageHead>

    {/* Emergencies go to the phone, never the form. */}
    <section aria-labelledby="urgent-heading" className="bg-safety text-on-safety">
      <ChevronStripe className="h-3" />
      <div className="wrap flex flex-wrap items-center justify-between gap-4 py-7">
        <div>
          <h2 id="urgent-heading" className="text-[clamp(1.9rem,4vw,2.8rem)]">Leak, no water or no hot water?</h2>
          <p className="mt-1 text-lg font-bold">Don’t use the form. Call the 24/7 line and a plumber picks up.</p>
        </div>
        <a href={`tel:${business.phoneE164}`} className="button text-2xl"><Icon name="phone" className="size-7" /><span className="font-mono">{business.phone}</span></a>
      </div>
    </section>

    <div className="blueprint-faint">
      <div className="wrap grid gap-12 py-14 lg:grid-cols-[1.25fr_1fr]">
        <section aria-label="Enquiry form">
          <JobTicket title="Work request — non-urgent" number="0143">
            {hosted ? <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email} />
              : <div className="py-2">
                <h2 className="text-3xl">Write to us directly</h2>
                <p className="mt-3 text-muted">The enquiry form isn’t connected on this copy of the site. Email us instead and we’ll reply to arrange a time.</p>
                <p className="mt-4"><a className="text-link text-base font-bold break-words sm:text-lg" href={`mailto:${business.email}`}>{business.email}</a></p>
              </div>}
            <p className="print-phone hidden">Call 24/7: {business.phone} · {business.email}</p>
          </JobTicket>
          <p className="mt-6 text-sm text-muted">
            Sending a request doesn’t book a visit or fix a price. We reply by email to arrange a time,
            and every price is written up on site before work starts.
          </p>
        </section>

        <aside aria-label="Contact details" className="grid content-start gap-8">
          <div>
            <h2 className="text-3xl">Useful to include</h2>
            <ul className="mt-4 space-y-2">
              {business.enquiries.usefulToInclude.map(tip => (
                <li key={tip} className="flex gap-3"><Icon name="check" className="mt-1 size-5 shrink-0 text-copper" />{tip}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">Photos help: we may ask for one in our reply.</p>
          </div>
          <div className="border-t-[3px] border-outline pt-6">
            <h2 className="flex items-center gap-2 text-3xl"><Icon name="mail" className="size-7 text-safety" />Email</h2>
            <p className="mt-2"><a className="text-link text-lg break-all" href={`mailto:${business.email}`}>{business.email}</a></p>
            <div className="mt-3 flex flex-wrap items-center gap-3"><CopyEmail email={business.email} /></div>
          </div>
          <div className="border-t-[3px] border-outline pt-6">
            <h2 className="flex items-center gap-2 text-3xl"><Icon name="clock" className="size-7 text-safety" />Office hours</h2>
            <p className="mt-3"><OpenBadge hours={business.officeHours} /></p>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-5 font-mono">
              {hoursRows(business.officeHours).map(row => <div key={row.days} className="contents"><dt className="text-muted">{row.days}</dt><dd>{row.time}</dd></div>)}
            </dl>
            <TimeZoneNote />
            <p className="mt-2 text-sm text-muted">{business.emergencyLine}</p>
          </div>
        </aside>
      </div>
    </div>
  </>;
}
