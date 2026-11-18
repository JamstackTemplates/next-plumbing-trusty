import type { ReactNode } from 'react';
import { callOut, type FeeId } from '../content/pricing';
import type { Service } from '../content/services';
import { usd } from '../lib/format';

/** A call-out fee from content/pricing.ts, followed by its label copy. */
export function Fee({ id, children, className = '' }: { id: FeeId; children?: ReactNode; className?: string }) {
  return <span className={className}><strong className="font-mono font-bold">{usd(callOut(id).fee)}</strong>{children ? <> {children}</> : null}</span>;
}

/** "from $189", or "Ask us" when the service is marked unavailable. */
export function PriceFrom({ service, className = '' }: { service: Service; className?: string }) {
  return service.available
    ? <span className={className}><span className="text-[.8em] font-normal uppercase">from </span><span className="font-mono font-bold">{usd(service.priceFrom)}</span></span>
    : <span className={className}>Ask us</span>;
}
