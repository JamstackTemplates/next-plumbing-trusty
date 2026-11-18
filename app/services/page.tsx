import type { Metadata } from 'next';
import { CallBand } from '../../components/call-band';
import { PriceFrom } from '../../components/fee';
import { PageHead } from '../../components/page-head';
import { Catalogue, HeaterCorner } from '../../components/services';
import { services } from '../../content/services';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Burst and frozen pipes, blocked drains, toilets and taps, water heaters and sump pumps across Duluth and the Twin Ports, each with an upfront “from” price.',
  alternates: { canonical: absoluteUrl('/services/') },
};

const service = (id: string) => services.find(item => item.id === id)!;

export default function ServicesPage() {
  return (
    <>
      <PageHead eyebrow="Services" title="From leaks to hot water" icon="wrench">
        <p>
          Twelve jobs we do every week, each with a “from” price for labour and standard parts.
          The final price is written down on site before we start.
        </p>
      </PageHead>

      <Catalogue>
        <Catalogue.Tabs>All services</Catalogue.Tabs>
        <Catalogue.Pages symptom="You notice" work="What we do" visit="Typical visit" price="Price" emergency="24/7" />
        <Catalogue.Footnote>
          Jobs marked 24/7 can be called in any hour on the emergency line. Every visit starts with
          the call-out fee, which is credited against the job if you go ahead.
        </Catalogue.Footnote>
      </Catalogue>

      <HeaterCorner art="Cutaway of a gas tank water heater showing the dip tube, flue and baffle, anode rod, T&P relief valve and burner">
        <HeaterCorner.Heading>Water heater corner</HeaterCorner.Heading>
        <HeaterCorner.Text>
          Lake Superior water is cold and hard on tanks. Most of the heaters we replace are 10–12
          years old with a spent anode rod. Here’s how a new tank compares with going tankless.
        </HeaterCorner.Text>
        <HeaterCorner.Plate tank="Tank" tankless="Tankless">
          <HeaterCorner.Row label="Installed" tank={<PriceFrom service={service('water-heater-replace')} />} tankless={<PriceFrom service={service('tankless-install')} />} />
          <HeaterCorner.Row label="Hot water" tank="Stores 40–50 gallons, then reheats" tankless="Heats on demand, no waiting tank" />
          <HeaterCorner.Row label="Footprint" tank="A floor-standing tank" tankless="A wall-mounted box" />
          <HeaterCorner.Row label="Typical life" tank="8–12 years" tankless="15–20 years" />
          <HeaterCorner.Row label="Best for" tank="Simple swaps on a budget" tankless="Big households, small basements" />
        </HeaterCorner.Plate>
      </HeaterCorner>

      <CallBand>
        <CallBand.Heading>Not sure what it is?</CallBand.Heading>
        <CallBand.Text>Describe the noise, the drip or the puddle. We’ll tell you which call-out applies before we roll.</CallBand.Text>
        <CallBand.Actions>Ask about planned work</CallBand.Actions>
      </CallBand>
    </>
  );
}
