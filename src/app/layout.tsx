import type { Metadata } from "next";
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { AudioProvider } from "@/lib/audio-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { getBaseUrl, SITE_CONFIG } from "@/lib/site";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Tesacola Empire Nigeria | Luxury Handcrafted Footwear & Leather Goods",
    template: "%s | Tesacola Empire Nigeria",
  },
  description:
    "Tesacola Empire Nigeria is an artisanal Nigerian luxury house building a distinctive world of handcrafted leather footwear, bespoke lasts, and fine accessories — rooted in Benin City, Nigeria and created for the world.",
  keywords: [
    "Tesacola Empire Nigeria",
    "Nigerian Luxury Leather",
    "Handcrafted Men's Shoes Nigeria",
    "Bespoke Shoemaking Benin City",
    "Goodyear Welted Shoes Nigeria",
    "Commercial Leather Manufacturing Nigeria",
    "Made in Nigeria Luxury",
  ],
  authors: [{ name: "Tesacola Empire Nigeria" }],
  openGraph: {
    title: "Tesacola Empire Nigeria | Luxury Handcrafted Footwear & Leather Goods",
    description:
      "Tesacola is building its own world. Premium Nigerian leather craftsmanship, bespoke shoemaking and commercial leather production built with a global outlook.",
    url: baseUrl,
    siteName: "Tesacola Empire Nigeria",
    images: [
      {
        url: "/tesacol_logo.png",
        width: 800,
        height: 800,
        alt: "Tesacola Empire Nigeria Official Crest",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tesacola Empire Nigeria | Luxury Handcrafted Footwear & Leather Goods",
    description:
      "Premium Nigerian leather craftsmanship, bespoke shoemaking and commercial leather production built with a global outlook.",
    images: ["/tesacol_logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/tesacol_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: baseUrl,
    logo: `${baseUrl}/tesacol_logo.png`,
    description: SITE_CONFIG.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      addressCountry: SITE_CONFIG.address.countryCode,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.whatsappDisplay,
      contactType: "customer service",
      email: SITE_CONFIG.email,
      availableLanguage: ["English"],
    },
  };

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${jakarta.variable} ${cormorant.variable} h-full antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white font-sans selection:bg-[#d6be67] selection:text-black">
        <AudioProvider>
          <CartProvider>
            <Header />
            <CartDrawer />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <FloatingWhatsApp />
          </CartProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
