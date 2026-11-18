// True North Plumbing: fictitious sample business for the Jamstacks gallery.
// Owners: replace every value here with your real details. Page copy lives in app/**/page.tsx.
import { validateHours, type OpeningHours } from '../lib/hours.ts';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short line used in metadata and the social card. */
  tagline: string;
  /** Plain-text introduction used for fallback metadata and structured data. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public phone number as displayed, e.g. "(218) 555-0142". Answered 24/7 (see `emergencyLine`). */
  phone: string;
  /** The same number in E.164 form for tel: links, e.g. "+12185550142". */
  phoneE164: string;
  /** Short statement about the 24/7 line. Static copy: the site never computes it. */
  emergencyLine: string;
  /** Shop and dispatch location. A service-area business: walk-ins by appointment. */
  address: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
    /** Landmark hint shown beside the address. */
    note: string;
  };
  /**
   * Office and scheduled-work hours in site.config.json's timeZone. Seven entries, same-day only.
   * These drive the open-now badge and the "calling now" rate on Pricing.
   */
  officeHours: OpeningHours[];
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Never promises a booking, a time slot or a final price. */
    introduction: string;
    /** Suggestions for the message text, not additional form inputs. */
    usefulToInclude: string[];
  };
}

export const business: Business = {
  name: 'True North Plumbing',
  tagline: '24/7 plumber for Duluth & the Twin Ports',
  introduction: 'True North Plumbing fixes leaks, frozen pipes, blocked drains and water heaters across Duluth and the Twin Ports, with the call-out fee quoted before we roll.',
  email: 'dispatch@truenorthplumbing.example',
  phone: '(218) 555-0142',
  phoneE164: '+12185550142',
  emergencyLine: 'Our phone line is answered 24 hours a day, 7 days a week.',
  address: {
    street: 'Lake Avenue South, Canal Park',
    locality: 'Duluth',
    region: 'MN',
    postalCode: '55802',
    country: 'US',
    note: 'Two blocks from the Aerial Lift Bridge. Visits by appointment.',
  },
  officeHours: [
    { day: 'Monday', opens: '07:00', closes: '17:30' },
    { day: 'Tuesday', opens: '07:00', closes: '17:30' },
    { day: 'Wednesday', opens: '07:00', closes: '17:30' },
    { day: 'Thursday', opens: '07:00', closes: '17:30' },
    { day: 'Friday', opens: '07:00', closes: '17:30' },
    { day: 'Saturday', opens: '08:00', closes: '12:00' },
    { day: 'Sunday' },
  ],
  enquiries: {
    title: 'Non-urgent work request',
    introduction: 'Ask for a quote, a visit for planned work or anything else that can wait a day. We’ll reply to arrange a time; nothing is booked until we do.',
    usefulToInclude: [
      'Your town or neighbourhood and street',
      'What is happening, and since when',
      'The fixture or appliance (for water heaters: gas or electric, tank size and rough age)',
      'A phone number if you’d like a call back',
      'Days or times that suit a visit',
    ],
  },
};

validateHours(business.officeHours);
