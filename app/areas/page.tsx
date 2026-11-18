import type { Metadata } from 'next';
import { AreaMapSection, AreaNote, Zones } from '../../components/areas';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Service areas',
  description: 'True North Plumbing covers Duluth, Superior, Hermantown, Proctor and Rice Lake at the standard call-out, plus Esko, Cloquet and Two Harbors with a small travel surcharge.',
  alternates: { canonical: absoluteUrl('/areas/') },
};

export default function AreasPage() {
  return (
    <>
      <PageHead eyebrow="Service areas" title="Where the vans go" icon="pin">
        <p>
          We roll from Canal Park, next to the Aerial Lift Bridge, to both sides of the bay and up
          the North Shore. Here’s what it costs to get to you.
        </p>
      </PageHead>

      <AreaMapSection title="Map of the western tip of Lake Superior with the core zone around Duluth and Superior and the extended zone out to Cloquet and Two Harbors">
        <AreaMapSection.Legend zone="core">Core zone · standard call-out</AreaMapSection.Legend>
        <AreaMapSection.Legend zone="extended">Extended zone · travel surcharge</AreaMapSection.Legend>
        <AreaMapSection.Legend zone="shop">Shop by the lift bridge</AreaMapSection.Legend>
      </AreaMapSection>

      <Zones>
        <Zones.Zone zone="core" title="Core zone">
          The standard call-out with no surcharge, day or night. Most visits here are within the
          hour on the emergency line.
        </Zones.Zone>
        <Zones.Zone zone="extended" title="Extended zone">
          Worth the drive. A small travel surcharge is added to the call-out, and the dispatcher
          tells you the total before we roll.
        </Zones.Zone>
      </Zones>

      <AreaNote link="Ask if we can reach you">
        <AreaNote.Heading>Not on the list?</AreaNote.Heading>
        <p className="mt-3 text-muted">Ask — we may still reach you. Tell us your town and the job, and we’ll reply with what’s possible.</p>
      </AreaNote>
    </>
  );
}
