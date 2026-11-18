// Services and their "from" prices. All prices are whole US dollars.
// Common owner edits: `priceFrom`, `available` (false shows "Ask us"), `featured` (Home valve tags).

export type IconName = 'drop' | 'drain' | 'faucet' | 'heater' | 'snowflake' | 'toilet' | 'pump' | 'wrench';

export interface ServiceCategory {
  /** Stable URL-safe ID, used in ?category= and #cat-<id>. */
  id: string;
  /** Tab and section label. */
  label: string;
  /** Icon drawn on the binder tab. */
  icon: IconName;
}

export interface Service {
  /** Stable URL-safe ID, used as the anchor on /services/#<id>. */
  id: string;
  name: string;
  /** References a ServiceCategory id. */
  category: string;
  /** What the customer notices. */
  symptom: string;
  /** One sentence on what the plumber does. */
  whatWeDo: string;
  /** Typical time on site, as plain text. */
  typicalVisit: string;
  /** "From" price in whole US dollars: labour and standard parts, confirmed in writing on site. */
  priceFrom: number;
  /** Available on the 24/7 emergency line. */
  emergency: boolean;
  /** Shown as a valve tag on Home. Exactly eight services must be featured. */
  featured: boolean;
  /** False hides the price and shows "Ask us", e.g. when a seasonal job is out of season. */
  available: boolean;
  /** Icon on the valve tag; defaults to the category icon. */
  icon?: IconName;
}

export const FEATURED_COUNT = 8;

export const categories: ServiceCategory[] = [
  { id: 'leaks', label: 'Leaks & pipes', icon: 'drop' },
  { id: 'drains', label: 'Drains & sewer', icon: 'drain' },
  { id: 'fixtures', label: 'Toilets & taps', icon: 'faucet' },
  { id: 'hot-water', label: 'Water heaters', icon: 'heater' },
  { id: 'seasonal', label: 'Sump & seasonal', icon: 'snowflake' },
];

export const services: Service[] = [
  { id: 'burst-pipe', name: 'Burst pipe repair', category: 'leaks', symptom: 'Water spraying or pooling from a line', whatWeDo: 'Shut off, cut out the split section and re-pipe in copper or PEX.', typicalVisit: '1–3 hours', priceFrom: 189, emergency: true, featured: true, available: true },
  { id: 'frozen-pipe', name: 'Frozen pipe thaw', category: 'leaks', symptom: 'No water at one tap after a cold night', whatWeDo: 'Thaw safely with heat, check for splits and add insulation.', typicalVisit: '1–2 hours', priceFrom: 149, emergency: true, featured: true, available: true, icon: 'snowflake' },
  { id: 'leak-detection', name: 'Hidden leak detection', category: 'leaks', symptom: 'Damp ceiling, rising water bill, meter ticking', whatWeDo: 'Pressure test and thermal-camera survey to find the source.', typicalVisit: '1–2 hours', priceFrom: 225, emergency: false, featured: false, available: true },
  { id: 'blocked-drain', name: 'Blocked drain clearing', category: 'drains', symptom: 'Sink, tub or floor drain backing up', whatWeDo: 'Snake or jet the line and test the flow.', typicalVisit: '1 hour', priceFrom: 169, emergency: true, featured: true, available: true },
  { id: 'sewer-camera', name: 'Sewer line camera inspection', category: 'drains', symptom: 'Repeat backups or roots in the main', whatWeDo: 'Run a camera to the street and record the footage for you.', typicalVisit: '1–2 hours', priceFrom: 249, emergency: false, featured: false, available: true },
  { id: 'running-toilet', name: 'Running or leaking toilet', category: 'fixtures', symptom: 'Toilet hisses, runs or rocks', whatWeDo: 'Replace the fill valve, flapper or wax seal.', typicalVisit: 'Under 1 hour', priceFrom: 129, emergency: false, featured: true, available: true, icon: 'toilet' },
  { id: 'dripping-faucet', name: 'Dripping faucet repair', category: 'fixtures', symptom: 'Tap drips or the handle is stiff', whatWeDo: 'Rebuild or replace the cartridge and seats.', typicalVisit: 'Under 1 hour', priceFrom: 119, emergency: false, featured: true, available: true },
  { id: 'water-heater-repair', name: 'Water heater repair', category: 'hot-water', symptom: 'No hot water, or it runs out fast', whatWeDo: 'Diagnose gas or electric faults and replace the failed part.', typicalVisit: '1–2 hours', priceFrom: 159, emergency: true, featured: true, available: true },
  { id: 'water-heater-replace', name: 'Tank water heater replacement', category: 'hot-water', symptom: 'Tank leaking at the base or over 12 years old', whatWeDo: 'Swap in a 40–50 gallon gas or electric tank and haul the old one away.', typicalVisit: 'Half a day', priceFrom: 1890, emergency: false, featured: true, available: true, icon: 'wrench' },
  { id: 'tankless-install', name: 'Tankless water heater install', category: 'hot-water', symptom: 'Want endless hot water and more floor space', whatWeDo: 'Size, mount and vent a condensing tankless unit.', typicalVisit: '1 day', priceFrom: 3450, emergency: false, featured: false, available: true },
  { id: 'sump-pump', name: 'Sump pump repair or replacement', category: 'seasonal', symptom: 'Pit filling, pump humming but not draining', whatWeDo: 'Replace the pump or float switch and test the discharge.', typicalVisit: '1–2 hours', priceFrom: 289, emergency: true, featured: true, available: true, icon: 'pump' },
  { id: 'winterize-outdoor', name: 'Outdoor faucet winterizing', category: 'seasonal', symptom: 'Hose bibs and lines ready for freezing nights', whatWeDo: 'Drain and isolate outdoor lines, and fit frost-free bibs on request.', typicalVisit: 'Under 1 hour', priceFrom: 95, emergency: false, featured: false, available: true },
];

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateServices(list: readonly Service[], cats: readonly ServiceCategory[] = categories): void {
  const catIds = new Set<string>();
  for (const cat of cats) {
    if (!SLUG.test(cat.id)) throw new Error(`categories: "${cat.id}" must be a lowercase URL-safe ID`);
    if (catIds.has(cat.id)) throw new Error(`categories: duplicate ID "${cat.id}"`);
    if (!cat.label.trim()) throw new Error(`categories: "${cat.id}" needs a label`);
    catIds.add(cat.id);
  }
  const ids = new Set<string>();
  for (const item of list) {
    const where = `services: "${item.id}"`;
    if (!SLUG.test(item.id)) throw new Error(`${where} must be a lowercase URL-safe ID`);
    if (ids.has(item.id)) throw new Error(`services: duplicate ID "${item.id}"`);
    ids.add(item.id);
    if (!catIds.has(item.category)) throw new Error(`${where} references unknown category "${item.category}"`);
    for (const key of ['name', 'symptom', 'whatWeDo', 'typicalVisit'] as const) {
      if (!item[key].trim()) throw new Error(`${where} needs ${key}`);
    }
    if (!Number.isInteger(item.priceFrom) || item.priceFrom <= 0) throw new Error(`${where} priceFrom must be a positive whole number of dollars`);
  }
  for (const cat of cats) {
    if (!list.some(item => item.category === cat.id)) throw new Error(`categories: "${cat.id}" has no services`);
  }
  const featured = list.filter(item => item.featured).length;
  if (featured !== FEATURED_COUNT) throw new Error(`services: exactly ${FEATURED_COUNT} must be featured for the Home valve tags (found ${featured})`);
}

export const serviceIcon = (item: Service): IconName =>
  item.icon ?? categories.find(cat => cat.id === item.category)!.icon;

export const servicesIn = (categoryId: string) => services.filter(item => item.category === categoryId);

validateServices(services);
