import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { TrueNorthDial } from './art/dial';
import { Icon } from './art/icons';
import { SiteLink } from './site-link';

const nav = [
  { href: '/services/', label: 'Services' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/areas/', label: 'Service areas' },
  { href: '/contact/', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="border-b-[3px] border-outline bg-paper">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2.5 sm:py-3">
        <SiteLink href="/" className="flex items-center gap-3 text-ink no-underline" aria-label={`${business.name} home`}>
          <TrueNorthDial className="size-12 shrink-0 sm:size-14" bands={false} />
          <span className="grid leading-none">
            <span className="font-display text-[1.7rem] font-extrabold tracking-wide uppercase sm:text-[2rem]">True North</span>
            <span className="font-display text-[.95rem] font-semibold tracking-[.32em] text-muted uppercase">Plumbing · Duluth</span>
          </span>
        </SiteLink>
        <div className="flex items-center gap-3 lg:order-3">
          <a href={`tel:${business.phoneE164}`} className="button min-h-11 px-3 text-base max-sm:hidden sm:px-4">
            <Icon name="phone" className="size-5" /><span>Call 24/7</span>
          </a>
          <DarkModeToggle />
        </div>
        <nav aria-label="Main" className="w-full lg:order-2 lg:ml-auto lg:w-auto">
          <ul className="flex justify-between gap-x-5 border-t border-line pt-2 lg:justify-end lg:gap-x-7 lg:border-0 lg:pt-0">
            {nav.map(item => (
              <li key={item.href}>
                <SiteLink href={item.href} markCurrent="page"
                  className="font-display text-[1.05rem] font-bold tracking-wider text-ink uppercase no-underline decoration-safety decoration-4 underline-offset-8 hover:underline aria-[current=page]:underline sm:text-lg">
                  {item.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
