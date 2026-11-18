'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import type { ServiceCategory } from '../content/services';
import { Icon } from './art/icons';

const ALL = 'all';

/**
 * Binder index tabs for the Services page. Without JavaScript they are in-page anchors and every
 * category stays visible. With JavaScript they filter the sections and keep ?category= in the URL.
 */
export function CategoryFilter({ categories, allLabel }: { categories: readonly ServiceCategory[]; allLabel: string }) {
  const [active, setActive] = useState(ALL);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('category');
    if (requested && categories.some(cat => cat.id === requested)) setActive(requested);
  }, [categories]);

  useEffect(() => {
    for (const section of document.querySelectorAll<HTMLElement>('[data-category-section]')) {
      section.hidden = active !== ALL && section.dataset.categorySection !== active;
    }
  }, [active]);

  function choose(id: string, event: MouseEvent) {
    event.preventDefault();
    setActive(id);
    const url = new URL(window.location.href);
    if (id === ALL) url.searchParams.delete('category'); else url.searchParams.set('category', id);
    url.hash = '';
    window.history.replaceState(window.history.state, '', url);
  }

  const tabs = [{ id: ALL, label: allLabel, icon: 'wrench' as const }, ...categories];
  return (
    <nav aria-label="Service categories" className="no-print">
      <ul className="flex gap-1 overflow-x-auto pb-1 [scrollbar-width:thin]">
        {tabs.map(tab => {
          const current = tab.id === active;
          return (
            <li key={tab.id} className="shrink-0">
              <a href={tab.id === ALL ? '#catalogue' : `#cat-${tab.id}`} onClick={event => choose(tab.id, event)} aria-current={current ? 'true' : undefined}
                className={`flex items-center gap-2 rounded-t-lg border-2 border-b-0 border-outline px-4 pt-2.5 pb-2 font-display text-lg font-bold tracking-wide uppercase no-underline transition-colors ${current ? 'translate-y-[2px] bg-brass text-tag-ink' : 'bg-surface text-ink hover:bg-brass/40'}`}>
                <Icon name={tab.icon} className="size-5" />{tab.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
