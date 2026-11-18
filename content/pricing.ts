// Upfront call-out fees. All amounts are whole US dollars.
// The most common owner edit: change `fee` below. Home, Pricing, the dial and structured data all read it.

export type FeeId = 'standard' | 'after-hours';

export interface CallOutFee {
  /** Stable ID used by the dial and the "calling now" line. */
  id: FeeId;
  /** Short name, e.g. "Office-hours call-out". */
  label: string;
  /** Plain-text description of when this fee applies. */
  when: string;
  /** Whole US dollars, a positive integer. */
  fee: number;
}

export const callOutFees: CallOutFee[] = [
  { id: 'standard', label: 'Office-hours call-out', when: 'Mon–Fri 7:00–17:30, Sat 8:00–12:00', fee: 79 },
  { id: 'after-hours', label: 'After-hours call-out', when: 'Evenings, nights, Sundays and holidays', fee: 149 },
];

/** What the call-out fee covers, shown as a checklist on Pricing. */
export const callOutCovers: string[] = [
  'Travel to your door anywhere in our core service area',
  'The first 30 minutes on site, including diagnosis',
  'A written price for the job before any work starts',
  'Credited against the job if you go ahead',
];

export function validateFees(fees: readonly CallOutFee[]): void {
  const ids: FeeId[] = ['standard', 'after-hours'];
  for (const id of ids) {
    const matches = fees.filter(fee => fee.id === id);
    if (matches.length !== 1) throw new Error(`pricing: "${id}" call-out fee must appear exactly once`);
  }
  if (fees.length !== ids.length) throw new Error('pricing: expected only the "standard" and "after-hours" call-out fees');
  for (const fee of fees) {
    if (!fee.label.trim() || !fee.when.trim()) throw new Error(`pricing: "${fee.id}" needs a label and when text`);
    if (!Number.isInteger(fee.fee) || fee.fee <= 0) throw new Error(`pricing: "${fee.id}" fee must be a positive whole number of dollars`);
  }
  if (feeOf('after-hours', fees) <= feeOf('standard', fees)) {
    throw new Error('pricing: the "after-hours" fee must be greater than the "standard" fee');
  }
}

export function feeOf(id: FeeId, fees: readonly CallOutFee[] = callOutFees): number {
  const match = fees.find(fee => fee.id === id);
  if (!match) throw new Error(`pricing: unknown call-out fee "${id}"`);
  return match.fee;
}

export function callOut(id: FeeId): CallOutFee {
  return callOutFees.find(fee => fee.id === id)!;
}

validateFees(callOutFees);
