import type { Metadata } from 'next';
import { TrueNorthDial } from '../../components/art/dial';
import { CallBand } from '../../components/call-band';
import { CallOutMeter } from '../../components/callout-meter';
import { Fee } from '../../components/fee';
import { PageHead } from '../../components/page-head';
import { Covers, Faq, Meter, PricePromise, RateCard } from '../../components/pricing';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Upfront call-out fees for office hours and after hours, what the call-out covers, and “from” prices for every plumbing job we do.',
  alternates: { canonical: absoluteUrl('/pricing/') },
};

export default function PricingPage() {
  return (
    <>
      <PageHead eyebrow="Pricing" title="Upfront, on the ticket" aside={<TrueNorthDial value="standard" className="size-44" />}>
        <p>
          One call-out fee to get a plumber to your door: <Fee id="standard">in office hours</Fee>,{' '}
          <Fee id="after-hours">evenings, nights, Sundays and holidays</Fee>. The job price is written
          down before we start.
        </p>
      </PageHead>

      <Meter>
        <Meter.Heading>When are you calling?</Meter.Heading>
        <CallOutMeter
          legend="Show the call-out fee for"
          options={{ standard: 'Office hours', 'after-hours': 'After hours' }}
          neutral="Rates depend on when you call."
          now={{
            standard: 'Calling now? That’s the office-hours rate.',
            'after-hours': 'Calling now? That’s the after-hours rate.',
          }}
          holidayNote="Public holidays always use the after-hours rate. Our dispatcher confirms the fee when you call."
        />
      </Meter>

      <Covers>
        <Covers.Intro>
          <Covers.Heading>What the call-out covers</Covers.Heading>
          <Covers.Text>
            The call-out isn’t a booking fee. It pays for a licensed plumber’s drive and first half
            hour with you, and it comes off the bill if you go ahead.
          </Covers.Text>
        </Covers.Intro>
        <Covers.List />
      </Covers>

      <RateCard>
        <RateCard.Heading>From prices</RateCard.Heading>
        <RateCard.Text>
          Labour and standard parts for common jobs. The final price is confirmed in writing on site
          before work starts, so you can say no and pay only the call-out.
        </RateCard.Text>
        <RateCard.List />
        <RateCard.Note>All prices in US dollars. Extended-area towns add a travel surcharge to the call-out.</RateCard.Note>
      </RateCard>

      <PricePromise>
        <PricePromise.Heading>Our price promise</PricePromise.Heading>
        <PricePromise.Item title="Fee before we roll">You hear the call-out fee on the phone, before a van leaves Canal Park.</PricePromise.Item>
        <PricePromise.Item title="Price before the wrench">We write the job price on the ticket and wait for your OK.</PricePromise.Item>
        <PricePromise.Item title="No clock-watching">The written price is the price, even if the job runs long.</PricePromise.Item>
      </PricePromise>

      <Faq>
        <Faq.Heading>Pricing questions</Faq.Heading>
        <Faq.Item question="What if I decide not to go ahead?">
          You pay only the call-out. We’ll still tell you what we found and leave the ticket with you.
        </Faq.Item>
        <Faq.Item question="Why is after hours more?">
          A plumber is out of bed or away from dinner to reach you. The higher fee keeps someone on
          call every night of the year.
        </Faq.Item>
        <Faq.Item question="Can I get a quote without a visit?">
          For planned work like a water heater swap, send us the details and we can often give a
          rough range by email. A firm price is always written up on site.
        </Faq.Item>
        <Faq.Item question="Do you charge more outside Duluth?">
          Core towns pay the standard call-out. Esko, Cloquet and Two Harbors add a small travel
          surcharge, listed on the service areas page.
        </Faq.Item>
      </Faq>

      <CallBand>
        <CallBand.Heading>Need us now?</CallBand.Heading>
        <CallBand.Text>The phone is answered 24/7. We’ll tell you the call-out fee before we roll.</CallBand.Text>
        <CallBand.Actions>Send a non-urgent enquiry</CallBand.Actions>
      </CallBand>
    </>
  );
}
