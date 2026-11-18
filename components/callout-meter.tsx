'use client';

import { useEffect, useRef, useState } from 'react';
import { business } from '../content/business';
import { callOutFees, type FeeId } from '../content/pricing';
import { usd } from '../lib/format';
import { rateAt } from '../lib/rates';
import { site } from '../lib/site';
import { TrueNorthDial } from './art/dial';
import { JobTicket } from './art/pieces';

/**
 * The call-out meter on Pricing: a control-panel toggle swings the dial's needle to a fee band.
 * Without JavaScript the radios still work as a form control, both fees are listed on the ticket
 * and the needle rests on the office-hours band. In the browser, the "calling now" line is
 * computed from the office hours in the business time zone and refreshed every minute.
 */
export function CallOutMeter({ legend, options, neutral, now, holidayNote }: {
  legend: string;
  /** Toggle labels, keyed by fee id. */
  options: Record<FeeId, string>;
  /** Static, time-neutral line shown before (or without) JavaScript. */
  neutral: string;
  /** "Calling now?" copy keyed by the rate that applies right now. */
  now: Record<FeeId, string>;
  holidayNote: string;
}) {
  const [selected, setSelected] = useState<FeeId>('standard');
  const [current, setCurrent] = useState<FeeId | undefined>(undefined);
  const touched = useRef(false);

  useEffect(() => {
    const update = () => {
      const rate = rateAt(business.officeHours, site.timeZone);
      setCurrent(rate);
      if (rate && !touched.current) setSelected(rate);
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
      <div className="flex flex-col items-center gap-6">
        <TrueNorthDial value={selected} className="size-72 sm:size-80" />
        <fieldset className="border-[3px] border-outline bg-panel p-2 shadow-[5px_6px_0_var(--shadow)]">
          <legend className="sr-only">{legend}</legend>
          <div className="flex">
            {callOutFees.map(fee => (
              <label key={fee.id} className={`cursor-pointer px-4 py-2.5 font-display text-lg font-bold tracking-wide uppercase transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-safety ${selected === fee.id ? (fee.id === 'standard' ? 'bg-primary text-white ring-2 ring-white/70' : 'bg-safety text-on-safety') : 'text-panel-muted hover:text-panel-ink'}`}>
                <input type="radio" name="call-out-rate" value={fee.id} checked={selected === fee.id} className="sr-only"
                  onChange={() => { touched.current = true; setSelected(fee.id); }} />
                {options[fee.id]}
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <JobTicket title="Call-out fee" stamp="Upfront" number="0142">
        <ul className="divide-y-2 divide-dashed divide-rule">
          {callOutFees.map(fee => (
            <li key={fee.id} className={`flex items-baseline justify-between gap-4 py-4 transition-opacity ${selected === fee.id ? '' : 'opacity-55'}`}>
              <span>
                <span className="block font-display text-2xl font-extrabold uppercase">{fee.label}</span>
                <span className="text-sm text-muted">{fee.when}</span>
              </span>
              <span className="flex items-center gap-3">
                {selected === fee.id ? <span aria-hidden="true" className="text-2xl text-safety">◀</span> : null}
                <span className="font-mono text-4xl font-bold sm:text-5xl">{usd(fee.fee)}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 border-t-2 border-outline pt-3 font-bold" role="status" aria-live="polite">
          {current ? now[current] : neutral}
        </p>
        <p className="mt-1 text-sm text-muted">{holidayNote}</p>
      </JobTicket>
    </div>
  );
}
