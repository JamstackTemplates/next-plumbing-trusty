import { isOpenAt, type OpeningHours } from './hours.ts';
import type { FeeId } from '../content/pricing.ts';

/**
 * Which call-out rate applies at `now`: inside office hours is "standard", outside is "after-hours".
 * Undefined when the time zone is missing or invalid, so callers keep their neutral static copy.
 * Public holidays are not modelled; the copy says so.
 */
export function rateAt(hours: readonly OpeningHours[], timeZone: string, now = new Date()): FeeId | undefined {
  const open = isOpenAt(hours, timeZone, now);
  return open === undefined ? undefined : open ? 'standard' : 'after-hours';
}
