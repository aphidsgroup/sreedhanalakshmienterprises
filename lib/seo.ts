import { Metadata } from "next";

const BASE_URL = process.env.NEXTAUTH_URL || "https://sreeDhanalakshmiEnterprises.com";

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
    },
    alternates: { canonical: url },
    metadataBase: new URL(BASE_URL),
  };
}
