import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://namviet.com'; // Change to actual domain when deployed

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Chặn các URL hệ thống nội bộ
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
