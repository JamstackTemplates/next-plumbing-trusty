import { business } from '../content/business';

/**
 * The 24/7 emergency call bar above the header on every page: sticky on phones, a plain tel:
 * link that works without JavaScript.
 */
export function EmergencyBar() {
  return (
    <div className="emergency-bar sticky top-0 z-40 bg-safety text-on-safety md:static">
      <div className="wrap flex min-h-12 items-center justify-between gap-3 py-1.5">
        <p className="flex items-center gap-3 font-display text-[1.05rem] leading-tight font-bold tracking-wide uppercase sm:text-xl">
          <span className="beacon shrink-0" aria-hidden="true" />
          <span><span className="sm:hidden">Emergency? 24/7</span><span className="hidden sm:inline">Burst pipe or no hot water? We answer 24/7</span></span>
        </p>
        <a href={`tel:${business.phoneE164}`} className="font-mono text-lg font-bold whitespace-nowrap text-on-safety underline decoration-2 underline-offset-4 sm:text-2xl"
          aria-label={`Call ${business.phone}, answered 24/7`}>{business.phone}</a>
      </div>
      <div className="hazard h-1.5" aria-hidden="true" />
    </div>
  );
}
