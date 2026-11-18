// Towns we cover. Surcharges are whole US dollars added to the call-out fee.
// x/y place each pin on the drawn map (0–100, left→right and top→bottom).

export interface ServiceArea {
  /** Stable URL-safe ID. */
  id: string;
  name: string;
  state: 'MN' | 'WI';
  /** Core: no surcharge. Extended: a travel surcharge applies. */
  zone: 'core' | 'extended';
  /** Whole US dollars added to the call-out: 0 for core, positive for extended. */
  surcharge: number;
  /** Map position, 0–100 across. */
  x: number;
  /** Map position, 0–100 down. */
  y: number;
}

export const areas: ServiceArea[] = [
  { id: 'duluth', name: 'Duluth', state: 'MN', zone: 'core', surcharge: 0, x: 57, y: 52 },
  { id: 'superior', name: 'Superior', state: 'WI', zone: 'core', surcharge: 0, x: 57, y: 76 },
  { id: 'hermantown', name: 'Hermantown', state: 'MN', zone: 'core', surcharge: 0, x: 44, y: 41 },
  { id: 'proctor', name: 'Proctor', state: 'MN', zone: 'core', surcharge: 0, x: 42, y: 58 },
  { id: 'rice-lake', name: 'Rice Lake', state: 'MN', zone: 'core', surcharge: 0, x: 52, y: 26 },
  { id: 'esko', name: 'Esko', state: 'MN', zone: 'extended', surcharge: 35, x: 28, y: 66 },
  { id: 'cloquet', name: 'Cloquet', state: 'MN', zone: 'extended', surcharge: 35, x: 13, y: 62 },
  { id: 'two-harbors', name: 'Two Harbors', state: 'MN', zone: 'extended', surcharge: 35, x: 86, y: 14 },
];

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateAreas(list: readonly ServiceArea[]): void {
  const ids = new Set<string>();
  for (const area of list) {
    const where = `areas: "${area.id}"`;
    if (!SLUG.test(area.id)) throw new Error(`${where} must be a lowercase URL-safe ID`);
    if (ids.has(area.id)) throw new Error(`areas: duplicate ID "${area.id}"`);
    ids.add(area.id);
    if (!area.name.trim()) throw new Error(`${where} needs a name`);
    if (area.state !== 'MN' && area.state !== 'WI') throw new Error(`${where} state must be MN or WI`);
    if (!Number.isInteger(area.surcharge) || area.surcharge < 0) throw new Error(`${where} surcharge must be a whole number of dollars`);
    if (area.zone === 'core' && area.surcharge !== 0) throw new Error(`${where} is core, so its surcharge must be 0`);
    if (area.zone === 'extended' && area.surcharge <= 0) throw new Error(`${where} is extended, so it needs a surcharge above 0`);
    if (area.zone !== 'core' && area.zone !== 'extended') throw new Error(`${where} zone must be core or extended`);
    for (const key of ['x', 'y'] as const) {
      if (!Number.isFinite(area[key]) || area[key] < 0 || area[key] > 100) throw new Error(`${where} map ${key} must be between 0 and 100`);
    }
  }
}

export const coreAreas = areas.filter(area => area.zone === 'core');
export const extendedAreas = areas.filter(area => area.zone === 'extended');

validateAreas(areas);
