import type { ReactNode } from 'react';
import type { IconName } from '../content/services';
import { Icon } from './art/icons';
import { PipeRun } from './art/pieces';

/**
 * Inner-page heading on a navy livery panel: stencil eyebrow, large condensed title, a brass valve
 * tag carrying the page's icon and a copper pipe run along the bottom edge.
 */
export function PageHead({ eyebrow, title, children, id, icon = 'wrench', aside }: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  icon?: IconName | 'pin' | 'phone';
  /** Optional element shown at the right on wide screens. */
  aside?: ReactNode;
}) {
  return (
    <header className="livery on-panel relative overflow-hidden">
      <div className="wrap relative grid items-end gap-8 pt-[clamp(2.5rem,6vw,4.5rem)] pb-6 md:grid-cols-[1fr_auto]">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id={id} className="mt-4 max-w-[16ch] text-[clamp(3rem,8vw,6rem)] text-panel-ink">{title}</h1>
          {children ? <div className="mt-5 max-w-(--measure) text-[clamp(1.08rem,1.6vw,1.25rem)] text-panel-muted">{children}</div> : null}
        </div>
        <div className="hidden flex-col items-center md:flex" aria-hidden="true">
          {aside ?? <>
            <div className="chain h-14" />
            <div className="valve-tag swing w-36"><Icon name={icon} className="size-14" /></div>
          </>}
        </div>
      </div>
      <PipeRun className="-mb-1" />
    </header>
  );
}
