export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://tesacola-empire-nigeria.vercel.app";
}

export const SITE_CONFIG = {
  name: "Tesacola Empire Nigeria",
  legalName: "Tesacola Empire Nigeria Ltd",
  shortName: "Tesacola",
  tagline: "Luxury Handcrafted Footwear & Leather Goods",
  description:
    "Tesacola Empire Nigeria is an artisanal luxury house building a distinctive world of handcrafted leather footwear, bespoke lasts, and fine accessories — rooted in Benin City, Nigeria and created for the world.",
  url: getBaseUrl(),
  ogImage: "/tesacol_logo.png",
  whatsappNumber: "2348008372265",
  whatsappDisplay: "+234 800 TESACOLA",
  phoneDisplay: "+234 (0) 800 TESACOLA",
  email: "concierge@tesacola.com",
  commercialEmail: "b2b@tesacola.com",
  cacNumber: "RC: 7389214",
  address: {
    street: "Atelier Quarters, Commercial Avenue",
    city: "Benin City",
    state: "Edo State",
    country: "Nigeria",
    countryCode: "NG",
  },
};
