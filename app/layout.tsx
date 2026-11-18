import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import '@fontsource/barlow-condensed/800.css';
import '@fontsource/atkinson-hyperlegible/400.css';
import '@fontsource/atkinson-hyperlegible/700.css';
import '@fontsource/overpass-mono/400.css';
import '@fontsource/overpass-mono/600.css';
import '@fontsource/overpass-mono/700.css';
import { ArtDefs } from '../components/art/icons';
import { EmergencyBar } from '../components/emergency-bar';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { business } from '../content/business';
import { site } from '../lib/site';
import './tailwind.input.css';

const description = site.description || business.introduction;
const title = `${business.name} · ${business.tagline}`;
// Absolute social image only when the deployed URL is known at build time.
const images = site.url ? [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: `${business.name}: 24/7 plumber, ${business.phone}` }] : undefined;

export const metadata: Metadata = {
  title: { default: title, template: `%s · ${business.name}` },
  description,
  applicationName: business.name,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: { type: 'website', siteName: business.name, title, description, ...(site.url ? { url: `${site.url}/` } : {}), images },
  twitter: { card: images ? 'summary_large_image' : 'summary', title, description, images: images?.map(image => image.url) },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f26a1b' },
    { media: '(prefers-color-scheme: dark)', color: '#0a1424' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en-US" suppressHydrationWarning>
    <head><ThemeScript /></head>
    <body><ThemeProvider>
      <ArtDefs />
      <a className="skip-link" href="#main">Skip to content</a>
      <EmergencyBar />
      <SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter />
    </ThemeProvider></body>
  </html>;
}
