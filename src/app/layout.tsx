import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Tesacola Empire Nigeria | Premium Leather Craftsmanship & Manufacturing",
    template: "%s | Tesacola Empire Nigeria",
  },
  description:
    "Official digital platform for Tesacola Empire Nigeria. Artisanal handcrafted footwear, executive briefcases, belts, and industrial leather manufacturing. Enjoying Trust & Quality.",
  keywords: [
    "Tesacola Empire Nigeria",
    "Nigerian Leather Footwear",
    "Wholecut Oxford Shoes",
    "Executive Leather Bags",
    "African Leather Manufacturing",
    "Made in Nigeria Luxury",
    "Bespoke Shoemaking",
  ],
  authors: [{ name: "Tesacola Empire Nigeria" }],
  openGraph: {
    title: "Tesacola Empire Nigeria | Premium Leather Craftsmanship",
    description: "Enjoying Trust & Quality. Discover our handcrafted footwear and commercial leather manufacturing.",
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
      className={`${cormorant.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white font-sans selection:bg-[#d6be67] selection:text-black">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
