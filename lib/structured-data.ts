import { areas } from '../content/areas.ts';
import { business } from '../content/business.ts';
import { feeOf } from '../content/pricing.ts';
import { DAYS } from './hours.ts';
import { absoluteUrl } from './paths.ts';

/** "Call-out $79–$149", derived from content/pricing.ts. */
export function priceRange(): string {
  return `Call-out $${feeOf('standard')}–$${feeOf('after-hours')}`;
}

/** schema.org Plumber, derived entirely from content. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const { address } = business;
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: business.name,
    description: business.introduction,
    email: business.email,
    telephone: business.phoneE164,
    ...(url ? { url, image: `${url}og.png` } : {}),
    priceRange: priceRange(),
    currenciesAccepted: 'USD',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    areaServed: areas.map(area => ({ '@type': 'City', name: `${area.name}, ${area.state}` })),
    openingHoursSpecification: DAYS.flatMap(day => {
      const entry = business.officeHours.find(item => item.day === day);
      return entry?.opens && entry.closes
        ? [{ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${day}`, opens: entry.opens, closes: entry.closes }]
        : [];
    }),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
