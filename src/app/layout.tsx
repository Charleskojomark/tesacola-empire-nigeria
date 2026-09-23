import type { Metadata } from "next";
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { AudioProvider } from "@/lib/audio-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Tesacola Empire Nigeria | Premium Nigerian Leather Craftsmanship",
    template: "%s | Tesacola Empire Nigeria",
  },
  description:
    "Tesacola Empire Nigeria is building a distinctive world of premium leather craftsmanship, thoughtful design and commercial possibility — rooted in Nigeria and created with a global outlook.",
  keywords: [
    "Tesacola Empire Nigeria",
    "Nigerian Leather Footwear",
    "Handcrafted Leather Goods",
    "Bespoke Shoemaking Nigeria",
    "Commercial Leather Production",
    "Made in Nigeria Luxury",
  ],
  authors: [{ name: "Tesacola Empire Nigeria" }],
  openGraph: {
    title: "Tesacola Empire Nigeria | Premium Nigerian Leather Craftsmanship",
    description: "Tesacola is building its own world. Premium Nigerian leather craftsmanship, bespoke design and commercial production built with a global outlook.",
    url: "https://tesacola.com",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${playfair.variable} ${jakarta.variable} ${cormorant.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white font-sans selection:bg-[#d6be67] selection:text-black">
        <AudioProvider>
          <CartProvider>
            <Header />
            <CartDrawer />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </CartProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
