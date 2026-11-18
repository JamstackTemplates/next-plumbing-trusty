"use client";
import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/** Optional. Neutral static output; browser refreshes in the business zone every minute. */
export function OpenBadge({ hours, fallback = 'See office hours', prefix = 'Office' }: {
  hours: readonly OpeningHours[];
  /** Static and no-JS text. */
  fallback?: string;
  /** Word placed before the computed status, e.g. "Office · Open now · until 17:30". */
  prefix?: string;
}) {
  const [label, setLabel] = useState(fallback);
  const [open, setOpen] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const update = () => {
      const text = openingLabel(hours, site.timeZone);
      const known = text.startsWith('Open') || text.startsWith('Closed');
      setLabel(known ? `${prefix} · ${text}` : fallback);
      setOpen(known ? text.startsWith('Open') : undefined);
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours, fallback, prefix]);
  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm font-bold tracking-wide uppercase" role="status">
      <span aria-hidden="true" className={`size-2.5 rounded-full border-2 border-outline ${open === undefined ? 'bg-steel' : open ? 'bg-[#3fb950]' : 'bg-safety'}`} />
      {label}
    </span>
  );
}
