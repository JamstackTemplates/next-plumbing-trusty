import { DAYS, type OpeningHours } from './hours.ts';

/** "$1,890" — whole US dollars. */
export function usd(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

/** "07:00" → "7:00", "17:30" → "17:30" (24-hour, as written on the job ticket). */
export function clock(value: string): string {
  return value.replace(/^0/, '');
}

const SHORT: Record<string, string> = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };

/** Group consecutive days with the same hours: [{ days: "Mon–Fri", time: "7:00–17:30" }, …]. */
export function hoursRows(hours: readonly OpeningHours[]): { days: string; time: string }[] {
  const ordered = DAYS.map(day => hours.find(entry => entry.day === day)!);
  const rows: { from: string; to: string; time: string }[] = [];
  for (const entry of ordered) {
    const time = entry.opens && entry.closes ? `${clock(entry.opens)}–${clock(entry.closes)}` : 'Closed';
    const last = rows.at(-1);
    if (last && last.time === time) last.to = entry.day;
    else rows.push({ from: entry.day, to: entry.day, time });
  }
  return rows.map(row => ({ days: row.from === row.to ? SHORT[row.from] : `${SHORT[row.from]}–${SHORT[row.to]}`, time: row.time }));
}
