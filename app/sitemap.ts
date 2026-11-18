import type { MetadataRoute } from 'next';
import { absoluteUrl } from '../lib/paths';
import { ROUTES } from '../lib/routes';
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(path => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
