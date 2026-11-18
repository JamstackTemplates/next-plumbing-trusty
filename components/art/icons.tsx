import type { ReactNode } from 'react';
import type { IconName } from '../../content/services';

type Props = { className?: string; title?: string };
type AllIcons = IconName | 'phone' | 'clock' | 'pin' | 'check' | 'mail';

const paths: Record<AllIcons, ReactNode> = {
  drop: <path d="M12 3c3.2 4.3 6 7.6 6 11a6 6 0 0 1-12 0c0-3.4 2.8-6.7 6-11Zm-2.5 11.5a2.6 2.6 0 0 0 2.4 2.6" />,
  drain: <><circle cx="12" cy="12" r="8.5" /><path d="M12 3.5v17M3.5 12h17M6 6l12 12M18 6 6 18" opacity=".55" /><circle cx="12" cy="12" r="2.2" /></>,
  faucet: <><path d="M4 9h9a4 4 0 0 1 4 4v1.5h-3V13a1 1 0 0 0-1-1H4z" /><path d="M8 9V6.5M5.5 5h5" /><path d="M15.5 17.5c.9 1.2 1.3 2 1.3 2.6a1.3 1.3 0 0 1-2.6 0c0-.6.4-1.4 1.3-2.6Z" /></>,
  heater: <><rect x="6" y="3.5" width="12" height="17" rx="5" /><path d="M9 3.5V1.8M15 3.5V1.8M9 16.5c0-1.6 1.4-2 1.4-3.5.9.7 1.6 1.4 1.6 2.4.6-.5.7-1 .7-1.6 1 .8 1.3 1.6 1.3 2.7" /><path d="M6 8.5h12" /></>,
  snowflake: <path d="M12 2.5v19M3.8 7.2l16.4 9.6M3.8 16.8l16.4-9.6M9.5 4.5 12 6.5l2.5-2M9.5 19.5l2.5-2 2.5 2M4.6 10.2l3 .9-.6 3M19.4 13.8l-3-.9.6-3M4.6 13.8l3-.9-.6-3M19.4 10.2l-3 .9.6 3" />,
  toilet: <><path d="M6 3.5h7v6H6z" /><path d="M4 11.5h15c0 3.6-2.6 5.6-5 6l1 3H8.5l.6-3.4C6 16.4 4 14.4 4 11.5Z" /></>,
  pump: <><path d="M4 21h16M6 21v-8h12v8" /><rect x="9" y="5" width="6" height="8" rx="1.5" /><path d="M12 5V2.5h6v3" /><path d="M8 17h8" opacity=".55" /></>,
  wrench: <path d="M14.5 3.5a4.5 4.5 0 0 0-4.3 5.9L3.7 15.9a2 2 0 1 0 2.8 2.8L13 12.2a4.5 4.5 0 0 0 5.9-4.3l-2.6 2.6-2.8-.6-.6-2.8 2.6-2.6c-.3-.7-.6-1-1-1Z" />,
  phone: <path d="M6.6 3.5h3l1.5 4-2 1.4a10 10 0 0 0 6 6l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>,
  pin: <><path d="M12 21s-6.5-6.4-6.5-11a6.5 6.5 0 0 1 13 0c0 4.6-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></>,
  check: <path d="m4.5 12.5 4.5 4.5 10.5-11" />,
  mail: <><rect x="3" y="5.5" width="18" height="13" rx="1" /><path d="m3.5 6.5 8.5 7 8.5-7" /></>,
};

/** Line icons drawn in the site's 1.5px outline style. Decorative unless a title is given. */
export function Icon({ name, className = 'size-6', title }: Props & { name: AllIcons }) {
  return <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.6}
    strokeLinecap="round" strokeLinejoin="round" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
    {title ? <title>{title}</title> : null}{paths[name]}
  </svg>;
}

/** Shared SVG patterns (hatching, blocks, snow) referenced by the illustrations. Rendered once in the layout. */
export function ArtDefs() {
  return <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
    <defs>
      <pattern id="tn-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="6" className="stroke-outline" strokeWidth="1.2" opacity=".35" />
      </pattern>
      <pattern id="tn-hatch-light" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="5" stroke="#fff" strokeWidth="1" opacity=".35" />
      </pattern>
      <pattern id="tn-blocks" width="80" height="40" patternUnits="userSpaceOnUse">
        <rect width="80" height="40" className="fill-concrete" />
        <path d="M0 .5h80M0 20.5h80M40 0v20M0 20v20M80 20v20" className="stroke-line" strokeWidth="1.5" fill="none" />
      </pattern>
      <pattern id="tn-chevron" width="32" height="32" patternUnits="userSpaceOnUse">
        <rect width="32" height="32" className="fill-reflect" />
        <path d="M0 16 16 0h16L0 32zM16 32 32 16v16z" className="fill-safety" />
      </pattern>
      <pattern id="tn-chevron-r" width="32" height="32" patternUnits="userSpaceOnUse">
        <rect width="32" height="32" className="fill-reflect" />
        <path d="M32 16 16 0H0l32 32zM16 32 0 16v16z" className="fill-safety" />
      </pattern>
      <radialGradient id="tn-glint" cx=".32" cy=".26" r=".75">
        <stop offset="0" stopColor="#fff" stopOpacity=".75" />
        <stop offset=".35" stopColor="#fff" stopOpacity=".12" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>;
}
