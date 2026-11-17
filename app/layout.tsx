import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Link previews (WhatsApp, Instagram, etc.) need the site's full address. Set
// NEXT_PUBLIC_SITE_URL once the site has a domain. On Vercel the production
// address is filled in automatically.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Quetzal Computers - Una computadora por cada estudiante mexicano";
const description =
  "Donamos computadoras reacondicionadas a estudiantes prometedores de México. Únete a nuestra misión de cerrar la brecha digital.";

// The tab icon (icon.png, apple-icon.png) and share image (opengraph-image.jpg)
// are picked up automatically from files in this folder.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "Quetzal Computers",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body suppressHydrationWarning className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
