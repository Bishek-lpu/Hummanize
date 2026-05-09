import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hummanize.ai';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Don't crawl internal API routes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
