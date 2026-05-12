import { Metadata } from "next";

const BASE_URL = process.env.NEXTAUTH_URL || "https://sree-enterprises.vercel.app";

export function buildMetadata({
  title,
  description,
  path = "",
  keywords = "",
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
}): Metadata {
  const fullTitle = `${title} | Sree Dhanalakshmi Enterprises`;
  const url = `${BASE_URL}${path}`;
  const ogImage = "/logo.jpeg";

  return {
    title: fullTitle,
    description,
    keywords: `construction materials Chennai, ${keywords}`,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "Sree Dhanalakshmi Enterprises",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: ogImage,
          width: 800,
          height: 800,
          alt: "Sree Dhanalakshmi Enterprises Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: { canonical: url },
    metadataBase: new URL(BASE_URL),
  };
}
