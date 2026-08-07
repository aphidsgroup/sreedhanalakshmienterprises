import { Metadata } from "next";

// Always use the canonical production domain — never the Vercel preview URL.
// NEXTAUTH_URL may be set to sde-enterprises.vercel.app in Vercel env, which would
// poison every canonical tag on every page. Hardcode the real domain here.
const BASE_URL = "https://www.sreedhanalakshmienterprises.in";

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
