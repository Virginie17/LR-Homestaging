import { MetadataRoute } from 'next';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/contact', '/studio', '/offres', '/form'],
    },
    sitemap: 'https://lr-homestaging.vercel.app/sitemap.xml',
  };
}