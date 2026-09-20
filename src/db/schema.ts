import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// 1. Users & Roles
export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    name: text("name").notNull(),
    phone: text("phone"),
    role: text("role", {
      enum: ["SUPER_ADMIN", "ADMIN", "CONTENT_MANAGER", "ORDER_MANAGER", "CUSTOMER"],
    }).default("CUSTOMER").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("user_email_idx").on(table.email),
  ]
);

// 2. Customer Addresses
export const addresses = pgTable("addresses", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  fullName: text("full_name").notNull(),
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  postalCode: text("postal_code"),
  country: text("country").notNull(),
  phone: text("phone").notNull(),
  isDefault: boolean("is_default").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. Categories & Subcategories
export const categories = pgTable(
  "categories",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    image: text("image"),
    parentId: text("parent_id"),
    sortOrder: integer("sort_order").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("category_slug_idx").on(table.slug),
  ]
);

// 4. Collections
export const collections = pgTable(
  "collections",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    heroImage: text("hero_image"),
    isPublished: boolean("is_published").default(true).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("collection_slug_idx").on(table.slug),
  ]
);

// 5. Products
export const products = pgTable(
  "products",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    sku: text("sku").notNull().unique(),
    shortDescription: text("short_description").notNull(),
    fullDescription: text("full_description").notNull(),
    productStory: text("product_story"),
    material: text("material"),
    colour: text("colour"),
    construction: text("construction"),
    price: integer("price").notNull(),
    currency: text("currency").default("NGN").notNull(),
    status: text("status", {
      enum: ["IN_STOCK", "MADE_TO_ORDER", "PRE_ORDER", "UNAVAILABLE"],
    }).default("IN_STOCK").notNull(),
    productionTime: text("production_time"),
    deliveryInfo: text("delivery_info"),
    careInstructions: text("care_instructions"),
    isFeatured: boolean("is_featured").default(false).notNull(),
    isPublished: boolean("is_published").default(true).notNull(),
    categoryId: text("category_id")
      .references(() => categories.id)
      .notNull(),
    subcategoryId: text("subcategory_id"),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    ogImage: text("og_image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("product_slug_idx").on(table.slug),
    index("product_cat_idx").on(table.categoryId),
  ]
);

// 6. Collection Products
export const collectionProducts = pgTable("collection_products", {
  id: text("id").primaryKey(),
  collectionId: text("collection_id")
    .references(() => collections.id, { onDelete: "cascade" })
    .notNull(),
  productId: text("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
});

// 7. Product Variants
export const productVariants = pgTable("product_variants", {
  id: text("id").primaryKey(),
  productId: text("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  sku: text("sku").notNull(),
  size: text("size"),
  colour: text("colour"),
  priceAdjustment: integer("price_adjustment").default(0).notNull(),
  stockQuantity: integer("stock_quantity").default(10).notNull(),
  isAvailable: boolean("is_available").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 8. Product Images
export const productImages = pgTable("product_images", {
  id: text("id").primaryKey(),
  productId: text("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  url: text("url").notNull(),
  altText: text("alt_text").notNull(),
  isMain: boolean("is_main").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 9. Orders
export const orders = pgTable(
  "orders",
  {
    id: text("id").primaryKey(),
    orderNumber: text("order_number").notNull().unique(),
    userId: text("user_id").references(() => users.id),
    customerName: text("customer_name").notNull(),
    customerEmail: text("customer_email").notNull(),
    customerPhone: text("customer_phone").notNull(),
    shippingAddress: jsonb("shipping_address").notNull(),
    subtotal: integer("subtotal").notNull(),
    shippingFee: integer("shipping_fee").default(0).notNull(),
    tax: integer("tax").default(0).notNull(),
    total: integer("total").notNull(),
    currency: text("currency").default("NGN").notNull(),
    paymentStatus: text("payment_status", {
      enum: ["PENDING", "PAID", "FAILED", "CANCELLED", "REFUNDED"],
    }).default("PENDING").notNull(),
    orderStatus: text("order_status", {
      enum: [
        "NEW",
        "CONFIRMED",
        "PROCESSING",
        "MADE_TO_ORDER",
        "READY",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ],
    }).default("NEW").notNull(),
    trackingNumber: text("tracking_number"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("order_number_idx").on(table.orderNumber),
    index("order_user_idx").on(table.userId),
  ]
);

// 10. Order Items
export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .references(() => orders.id, { onDelete: "cascade" })
    .notNull(),
  productId: text("product_id").references(() => products.id),
  variantId: text("variant_id"),
  productName: text("product_name").notNull(),
  variantName: text("variant_name"),
  unitPrice: integer("unit_price").notNull(),
  quantity: integer("quantity").notNull(),
  lineTotal: integer("line_total").notNull(),
  productImage: text("product_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 11. Payments
export const payments = pgTable("payments", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .references(() => orders.id, { onDelete: "cascade" })
    .notNull(),
  reference: text("reference").notNull().unique(),
  provider: text("provider").default("SANDBOX").notNull(),
  amount: integer("amount").notNull(),
  currency: text("currency").default("NGN").notNull(),
  status: text("status", {
    enum: ["PENDING", "SUCCESS", "FAILED"],
  }).default("PENDING").notNull(),
  rawResponse: jsonb("raw_response"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 12. Custom Enquiries
export const customEnquiries = pgTable("custom_enquiries", {
  id: text("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  location: text("location").notNull(),
  category: text("category").notNull(),
  quantity: integer("quantity").default(1).notNull(),
  specifications: text("specifications").notNull(),
  colourMaterial: text("colour_material"),
  intendedUse: text("intended_use"),
  requiredDate: text("required_date"),
  additionalNotes: text("additional_notes"),
  fileAttachmentUrl: text("file_attachment_url"),
  status: text("status", {
    enum: [
      "NEW",
      "REVIEWING",
      "CONTACTED",
      "IN_DISCUSSION",
      "QUOTED",
      "IN_PRODUCTION",
      "COMPLETED",
      "CLOSED",
    ],
  }).default("NEW").notNull(),
  internalNotes: text("internal_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 13. Business / B2B Enquiries
export const businessEnquiries = pgTable("business_enquiries", {
  id: text("id").primaryKey(),
  referenceNumber: text("reference_number").notNull().unique(),
  contactName: text("contact_name").notNull(),
  businessName: text("business_name").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessType: text("business_type").notNull(),
  website: text("website"),
  productCategory: text("product_category").notNull(),
  estimatedQuantity: text("estimated_quantity").notNull(),
  targetMarket: text("target_market"),
  customRequirements: text("custom_requirements").notNull(),
  timeline: text("timeline"),
  fileAttachmentUrl: text("file_attachment_url"),
  status: text("status", {
    enum: [
      "NEW",
      "REVIEWING",
      "CONTACTED",
      "IN_DISCUSSION",
      "QUOTED",
      "CONVERTED",
      "CLOSED",
    ],
  }).default("NEW").notNull(),
  internalNotes: text("internal_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 14. Journal Posts
export const journalPosts = pgTable("journal_posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  author: text("author").default("Tesacola Editorial").notNull(),
  categoryId: text("category_id"),
  tags: jsonb("tags"),
  isPublished: boolean("is_published").default(true).notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  ogImage: text("og_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 15. FAQs
export const faqs = pgTable("faqs", {
  id: text("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 16. Site Content (CMS documents)
export const siteContent = pgTable("site_content", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  section: text("section").notNull(),
  content: jsonb("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 17. Admin Audit Logs
export const adminAuditLogs = pgTable("admin_audit_logs", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  userEmail: text("user_email").notNull(),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  details: text("details"),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
