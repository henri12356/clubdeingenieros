import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://clubdeingenieros.vercel.app'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/cursos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cursos/analisis-cuencas-hidrograficas-qgis`,
      lastModified: new Date('2023-11-05'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Agrega más URLs según sea necesario
  ]
}