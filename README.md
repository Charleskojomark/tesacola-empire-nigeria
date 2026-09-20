# Tesacola Empire Nigeria — Master Digital Platform

> **Brand Positioning:** Premium Leather Craftsmanship & Manufacturing  
> **Brand Sign-off:** Enjoying Trust & Quality  
> **Core Brand Idea:** *"Tesacola is building its own world."*

---

## 1. Project Overview & Architectural Principles

The official commercial digital platform for **Tesacola Empire Nigeria** is built as a unified, serverless full-stack application designed specifically for **Vercel** and **Neon PostgreSQL**. 

In strict adherence to the project specification:
- **No separate backend server:** All privileged data operations, payment verification, and administrative CMS endpoints run within Next.js Server Actions and Route Handlers.
- **Relational Integrity:** Normalized relational database schema utilizing Drizzle ORM connecting to Neon PostgreSQL with automatic connection pooling.
- **Dual Customer Journeys:** 
  1. *Retail Customer Journey:* Discover &rarr; Explore &rarr; Select &rarr; Purchase (Server-Verified Checkout) &rarr; Insured Delivery &rarr; Leather Care.
  2. *Business / B2B Commercial Journey:* Discover &rarr; Capability Evaluation &rarr; Commercial Dossier &rarr; Technical Discussion &rarr; Sample Lasts &rarr; Production Run &rarr; Delivery.
- **Brand Guardrails:** 60% Obsidian Black (`#000000`), 30% Pure White (`#FFFFFF`) / Soft Ivory (`#F7F4EA`), 10% Champagne Gold (`#D6BE67`) / Antique Gold (`#AC8D3E`). Official circular globe and pillar crest preserved verbatim.

---

## 2. Technology Stack

- **Framework:** Next.js 14+ / 16 (App Router, React Server Components, Server Actions)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS with custom luxury tokens, Cormorant Garamond / Playfair Display (Serif) & Inter (Sans)
- **Database & ORM:** Neon Serverless PostgreSQL with Drizzle ORM
- **Authentication:** Secure HTTP-only cookie sessions with Jose (JWT) and Bcrypt password hashing
- **Validation:** Zod schemas
- **Payment Abstraction:** Pluggable `PaymentProvider` supporting Paystack (NGN/USD card, USSD, bank transfer) and a local development Sandbox simulator
- **Deployment Platform:** Vercel

---

## 3. Environment Configuration

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### Key Environment Variables:
```ini
# Neon PostgreSQL Connection URL
DATABASE_URL="postgresql://username:password@ep-sample-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
DIRECT_DATABASE_URL="postgresql://username:password@ep-sample.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Serverless Session Cookie Secret (min 32 characters)
AUTH_SECRET="tesacola_dev_secure_key_at_least_32_characters_long_2026"

# Public App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Payment Processor: 'SANDBOX' for local testing or 'PAYSTACK' for live keys
PAYMENT_PROVIDER="SANDBOX"
PAYMENT_PUBLIC_KEY="pk_test_..."
PAYMENT_SECRET_KEY="sk_test_..."
PAYMENT_WEBHOOK_SECRET="whsec_..."

# Default Currency
NEXT_PUBLIC_DEFAULT_CURRENCY="NGN"

# Development Super Admin Credentials
ADMIN_INITIAL_EMAIL="admin@tesacola.com"
ADMIN_INITIAL_PASSWORD="TesacolaAdmin2026!"
```

---

## 4. Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Access routes:**
   - **Public Storefront:** [http://localhost:3000](http://localhost:3000)
   - **Catalogue & Sizing:** [http://localhost:3000/shop](http://localhost:3000/shop)
   - **Bespoke Commissions:** [http://localhost:3000/custom](http://localhost:3000/custom)
   - **Commercial B2B:** [http://localhost:3000/business](http://localhost:3000/business)
   - **Client Portal:** [http://localhost:3000/account/login](http://localhost:3000/account/login)
   - **Administrative Console:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 5. Administrative Console Credentials

- **URL:** `/admin/login`
- **Email:** `admin@tesacola.com`
- **Password:** `TesacolaAdmin2026!`

The control console provides:
- Live business metrics: revenue, order pipeline, bespoke commissions, B2B leads.
- Full product & variant management (SKUs, leather materials, pricing, stock levels).
- Order fulfillment lifecycle (`NEW` &rarr; `CONFIRMED` &rarr; `PROCESSING` &rarr; `READY` &rarr; `SHIPPED` &rarr; `DELIVERED`).
- Bespoke and commercial enquiry workflow management with internal workshop notes.
- Immutable security audit logging for administrative actions.

---

## 6. Payment Security & Verification

- **No client trust:** The checkout pipeline recalculates all product prices directly against the database. Prices submitted by client browsers are strictly ignored.
- **Server verification:** Orders are only transitioned to `PAID` and `CONFIRMED` status after server-to-server gateway verification or signed idempotent webhooks (`/api/webhooks/payment`).

---

## 7. Vercel & Neon Production Deployment

1. **Neon PostgreSQL Database:**
   - Create a project on [console.neon.tech](https://console.neon.tech).
   - Copy the connection string to Vercel environment variables as `DATABASE_URL`.
2. **Vercel Project Setup:**
   - Connect the Git repository to Vercel.
   - Configure environment variables from `.env.example`.
   - Deploy. Vercel will automatically build the Next.js App Router application and provision Serverless Edge and Node functions.

---

## 8. Backup and Maintenance

- Neon PostgreSQL provides automated point-in-time recovery (PITR).
- Regular exports can be scheduled using `pg_dump`:
  ```bash
  pg_dump "$DATABASE_URL" -F c -b -v -f tesacola_backup.dump
  ```
