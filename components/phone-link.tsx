import type { ReactNode } from 'react';
import { business } from '../content/business';
import { Icon } from './art/icons';

/** tel: link to the 24/7 line. Children default to the formatted number. */
export function PhoneLink({ className = '', children, icon = false }: { className?: string; children?: ReactNode; icon?: boolean }) {
  return <a href={`tel:${business.phoneE164}`} className={className}>
    {icon ? <Icon name="phone" className="size-5 shrink-0" /> : null}
    {children ?? <span className="font-mono">{business.phone}</span>}
  </a>;
}
