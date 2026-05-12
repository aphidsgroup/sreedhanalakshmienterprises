import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const viewport = {
  themeColor: "#1e5f6e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Sree Dhanalakshmi Enterprises | Construction Materials Supplier Chennai",
  description:
    "Chennai's trusted construction material supplier since 1980. Cement, Steel/TMT Bars, Bricks, Sand & Aggregates at best prices. Two branches: Kilpauk & Mangadu.",
  keywords:
    "construction materials Chennai, cement price Chennai, TMT bars Chennai, sand aggregates Chennai, building materials supplier Tamil Nadu",
  openGraph: {
    title: "Sree Dhanalakshmi Enterprises",
    description: "Trusted construction material supplier in Chennai since 1980.",
    type: "website",
    locale: "en_IN",
    siteName: "Sree Dhanalakshmi Enterprises",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.ts" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
