import type { Metadata } from 'next';
import { Fee } from '../components/fee';
import { AreaTeaser, Dispatch, Hero, Manifold, PriceBand, Steps } from '../components/home';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

export default function HomePage() {
  return (
    <>
      <Hero>
        <Hero.Eyebrow>24/7 plumber · Duluth &amp; the Twin Ports</Hero.Eyebrow>
        <Hero.Heading>Water where it should be.</Hero.Heading>
        <Hero.Introduction>
          Burst pipe at 2 a.m. or a slow drain on a Tuesday, a licensed True North plumber picks up,
          tells you the call-out fee, and gets rolling.
        </Hero.Introduction>
        <Hero.Fees>
          <Fee id="standard">call-out in office hours</Fee>
          <Fee id="after-hours">evenings, nights &amp; weekends</Fee>
        </Hero.Fees>
        <Hero.Actions>
          <Hero.Call>Call</Hero.Call>
          <Hero.Enquiry>Send a non-urgent enquiry</Hero.Enquiry>
        </Hero.Actions>
      </Hero>

      <Manifold>
        <Manifold.Heading>What’s going wrong?</Manifold.Heading>
        <Manifold.Introduction>
          Pick the tag that sounds like your morning. Every job starts with the call-out fee and a
          written price before we lift a wrench.
        </Manifold.Introduction>
        <Manifold.Tags />
        <Manifold.More>All twelve services, from leak detection to tankless installs →</Manifold.More>
      </Manifold>

      <PriceBand>
        <PriceBand.Intro>
          <PriceBand.Heading>Price before the wrench</PriceBand.Heading>
          <PriceBand.Text>
            Two call-out fees, no surprises. The fee covers the drive and the first half hour,
            and we write the job price down before any work starts.
          </PriceBand.Text>
          <PriceBand.Link>How our pricing works</PriceBand.Link>
        </PriceBand.Intro>
        <PriceBand.Ticket>Go ahead with the job and the call-out is credited against it.</PriceBand.Ticket>
        <PriceBand.Dial />
      </PriceBand>

      <Steps>
        <Steps.Heading>How a call goes</Steps.Heading>
        <Steps.List>
          <Steps.Step title="You call">A real person in Duluth answers, day or night, and tells you which call-out fee applies.</Steps.Step>
          <Steps.Step title="We text a window">You get an arrival window by text, plus a heads-up when the van is ten minutes out.</Steps.Step>
          <Steps.Step title="Price in writing">We find the cause, write the job price on the ticket and wait for your OK.</Steps.Step>
          <Steps.Step title="Fixed & tidied">We fix it, test it, mop up and leave the old parts with you if you want them.</Steps.Step>
        </Steps.List>
      </Steps>

      <AreaTeaser>
        <AreaTeaser.Heading>Where we roll</AreaTeaser.Heading>
        <AreaTeaser.Text>
          Vans leave from Canal Park, next to the lift bridge. Five towns on both sides of the bay
          get the standard call-out with no travel surcharge.
        </AreaTeaser.Text>
        <AreaTeaser.Signs />
        <AreaTeaser.Link>See the service-area map</AreaTeaser.Link>
      </AreaTeaser>

      <Dispatch>
        <Dispatch.Heading>Office &amp; dispatch</Dispatch.Heading>
        <Dispatch.Columns>
          <Dispatch.Hours>Office hours</Dispatch.Hours>
          <Dispatch.Line title="24/7 line">Leaks, no water or no hot water: call any hour. The office hours are for planned work and quotes.</Dispatch.Line>
          <Dispatch.Contact title="Email & shop">Visits to the shop by appointment.</Dispatch.Contact>
        </Dispatch.Columns>
      </Dispatch>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
    </>
  );
}
