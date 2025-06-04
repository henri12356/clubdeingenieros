import { Metadata } from 'next';

type OpenGraphType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: OpenGraphType;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

export function constructMetadata({
  title,
  description,
  keywords = [],
  image = "/images/og-default.jpg",
  url = "https://clubdeingenieros.com",
  type = "website",
  publishedTime,
  modifiedTime,
  authors = ["Club de Ingenieros"],
  section = "Cursos de Ingeniería",
  tags = []
}: SEOProps): Metadata {
  const fullTitle = `${title} | Club de Ingenieros`;
  const domain = "clubdeingenieros.com";
  const fullImageUrl = image.startsWith('http') ? image : `https://${domain}${image}`;

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, "ingeniería", "cursos", "capacitación profesional", ...tags],
    metadataBase: new URL(`https://${domain}`),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type,
      siteName: "Club de Ingenieros",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      publishedTime,
      modifiedTime,
      authors,
      section,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [fullImageUrl],
      creator: "@clubingenieros",
      site: "@clubingenieros",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "GOOGLE_VERIFICATION_CODE",
      yandex: "YANDEX_VERIFICATION_CODE",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    other: {
      "theme-color": "#1a365d",
      "msapplication-TileColor": "#1a365d",
      "og:locale": "es_ES",
      "og:region": "PE",
    },
  };
}