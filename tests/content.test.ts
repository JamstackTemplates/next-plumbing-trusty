import assert from 'node:assert/strict';
import { test } from 'node:test';
import { areas, coreAreas, extendedAreas, validateAreas } from '../content/areas.ts';
import { business } from '../content/business.ts';
import { callOutFees, feeOf, validateFees } from '../content/pricing.ts';
import { categories, FEATURED_COUNT, services, validateServices } from '../content/services.ts';
import { businessStructuredData, jsonLd, priceRange } from '../lib/structured-data.ts';

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone', 'phoneE164'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.match(business.phoneE164, /^\+\d{10,15}$/, 'business.phoneE164: valid E.164 number required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
});

test('call-out fees are valid positive integers and after-hours exceeds standard', () => {
  assert.doesNotThrow(() => validateFees(callOutFees));
  assert.ok(feeOf('after-hours') > feeOf('standard'));
  assert.throws(() => validateFees([{ id: 'standard', label: 'Std', when: 'Day', fee: 0 }, callOutFees[1]]), /standard/);
  assert.throws(() => validateFees([{ id: 'standard', label: 'Std', when: 'Day', fee: 149 }, { id: 'after-hours', label: 'AH', when: 'Night', fee: 149 }]), /greater/);
  assert.throws(() => validateFees([{ id: 'standard', label: 'Std', when: 'Day', fee: 79.5 }, callOutFees[1]]), /standard/);
});

test('services and categories satisfy uniqueness, references, prices and featured count', () => {
  assert.doesNotThrow(() => validateServices(services, categories));
  assert.equal(services.filter(item => item.featured).length, FEATURED_COUNT);

  const dup = [...services, { ...services[0] }];
  assert.throws(() => validateServices(dup, categories), /burst-pipe/);

  const badCat = services.map((item, i) => i === 0 ? { ...item, category: 'bogus' } : item);
  assert.throws(() => validateServices(badCat, categories), /burst-pipe.*bogus/);

  const badPrice = services.map((item, i) => i === 1 ? { ...item, priceFrom: 0 } : item);
  assert.throws(() => validateServices(badPrice, categories), /frozen-pipe/);

  const wrongFeatured = services.map((item, i) => i === 0 ? { ...item, featured: false } : item);
  assert.throws(() => validateServices(wrongFeatured, categories), /8/);

  const emptyCat = [...categories, { id: 'empty-cat', label: 'Empty', icon: 'wrench' as const }];
  assert.throws(() => validateServices(services, emptyCat), /empty-cat/);
});

test('service areas have valid surcharges, unique IDs and coordinates in range', () => {
  assert.doesNotThrow(() => validateAreas(areas));
  assert.ok(coreAreas.every(area => area.surcharge === 0));
  assert.ok(extendedAreas.every(area => area.surcharge > 0));

  assert.throws(() => validateAreas([...areas, { ...areas[0] }]), /duluth/);
  assert.throws(() => validateAreas(areas.map(a => a.id === 'duluth' ? { ...a, surcharge: 10 } : a)), /duluth/);
  assert.throws(() => validateAreas(areas.map(a => a.id === 'esko' ? { ...a, surcharge: 0 } : a)), /esko/);
  assert.throws(() => validateAreas(areas.map(a => a.id === 'cloquet' ? { ...a, x: 105 } : a)), /cloquet/);
  assert.throws(() => validateAreas(areas.map(a => a.id === 'proctor' ? { ...a, y: -1 } : a)), /proctor/);
});

test('structured data models Plumber with pricing, areas and office hours', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'Plumber');
  assert.equal(schema.telephone, business.phoneE164);
  assert.equal(schema.email, business.email);
  assert.equal(schema.priceRange, priceRange());
  assert.equal(schema.priceRange, `Call-out $${feeOf('standard')}–$${feeOf('after-hours')}`);
  assert.equal(schema.areaServed.length, areas.length);
  assert.equal(schema.openingHoursSpecification.length, 6);
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
