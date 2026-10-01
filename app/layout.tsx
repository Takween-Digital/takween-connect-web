import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { Footer } from "@/components/shared/Footer";
import { brand, siteUrl } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

const title = brand.name;
const description =
  "A free programme offering professional websites to selected Muslim-owned businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${brand.name}`,
  },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#27a8ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
