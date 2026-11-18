import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, isOpenAt, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';
import { rateAt } from '../lib/rates.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

test('True North office hours and calling-now rate in America/Chicago', () => {
  const zone = 'America/Chicago';
  const labelAt = (iso: string) => openingLabel(business.officeHours, zone, new Date(iso));
  const openAt = (iso: string) => isOpenAt(business.officeHours, zone, new Date(iso));
  const rate = (iso: string) => rateAt(business.officeHours, zone, new Date(iso));

  // Friday (CST, UTC-6): 17:29 open -> 17:30 closed
  assert.equal(openAt('2026-11-20T23:29:00Z'), true);
  assert.equal(labelAt('2026-11-20T23:29:00Z'), 'Open now · until 17:30');
  assert.equal(rate('2026-11-20T23:29:00Z'), 'standard');

  assert.equal(openAt('2026-11-20T23:30:00Z'), false);
  assert.equal(labelAt('2026-11-20T23:30:00Z'), 'Closed · opens Saturday at 08:00');
  assert.equal(rate('2026-11-20T23:30:00Z'), 'after-hours');

  // Saturday (CST, UTC-6): 08:00 opens, 12:00 closes
  assert.equal(openAt('2026-11-21T13:59:00Z'), false);
  assert.equal(rate('2026-11-21T13:59:00Z'), 'after-hours');

  assert.equal(openAt('2026-11-21T14:00:00Z'), true);
  assert.equal(labelAt('2026-11-21T14:00:00Z'), 'Open now · until 12:00');
  assert.equal(rate('2026-11-21T14:00:00Z'), 'standard');

  assert.equal(openAt('2026-11-21T18:00:00Z'), false);
  assert.equal(labelAt('2026-11-21T18:00:00Z'), 'Closed · opens Monday at 07:00');
  assert.equal(rate('2026-11-21T18:00:00Z'), 'after-hours');

  // Sunday: closed, opens Monday at 07:00
  assert.equal(openAt('2026-11-22T16:00:00Z'), false);
  assert.equal(labelAt('2026-11-22T16:00:00Z'), 'Closed · opens Monday at 07:00');
  assert.equal(rate('2026-11-22T16:00:00Z'), 'after-hours');

  // DST spring forward (8 March 2026) and following Monday morning (9 March 2026, CDT UTC-5)
  assert.equal(labelAt('2026-03-08T16:00:00Z'), 'Closed · opens Monday at 07:00');
  assert.equal(rate('2026-03-08T16:00:00Z'), 'after-hours');
  assert.equal(openAt('2026-03-09T11:59:00Z'), false);
  assert.equal(rate('2026-03-09T11:59:00Z'), 'after-hours');
  assert.equal(openAt('2026-03-09T12:00:00Z'), true);
  assert.equal(labelAt('2026-03-09T12:00:00Z'), 'Open now · until 17:30');
  assert.equal(rate('2026-03-09T12:00:00Z'), 'standard');

  // DST fall back (1 November 2026) and following Monday morning (2 November 2026, CST UTC-6)
  assert.equal(labelAt('2026-11-01T16:00:00Z'), 'Closed · opens Monday at 07:00');
  assert.equal(rate('2026-11-01T16:00:00Z'), 'after-hours');
  assert.equal(openAt('2026-11-02T12:59:00Z'), false);
  assert.equal(rate('2026-11-02T12:59:00Z'), 'after-hours');
  assert.equal(openAt('2026-11-02T13:00:00Z'), true);
  assert.equal(labelAt('2026-11-02T13:00:00Z'), 'Open now · until 17:30');
  assert.equal(rate('2026-11-02T13:00:00Z'), 'standard');

  // Missing/invalid zone keeps rate undefined
  assert.equal(rateAt(business.officeHours, '', new Date('2026-11-20T18:00:00Z')), undefined);
  assert.equal(rateAt(business.officeHours, 'Mars/Base', new Date('2026-11-20T18:00:00Z')), undefined);
});
