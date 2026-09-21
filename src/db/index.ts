import { SEED_CATEGORIES, SEED_COLLECTIONS, SEED_PRODUCTS, SEED_FAQS, SEED_JOURNAL } from "./seed-data";
import {
  Product,
  Category,
  Collection,
  Order,
  CustomEnquiry,
  BusinessEnquiry,
  JournalPost,
  FAQ,
  User,
  AdminAuditLog,
  PaymentStatus,
  OrderStatus,
  CustomEnquiryStatus,
  BusinessEnquiryStatus,
} from "@/types";
import bcrypt from "bcryptjs";

// ---------------------------------------------------------------------------
// Neon SQL client (only instantiated when DATABASE_URL is set)
// ---------------------------------------------------------------------------
type NeonQueryFn = ((strings: TemplateStringsArray, ...values: unknown[]) => Promise<unknown[]>) | null;

let neonSql: NeonQueryFn = null;

if (process.env.DATABASE_URL) {
  try {
    const { neon } = require("@neondatabase/serverless");
    neonSql = neon(process.env.DATABASE_URL);
  } catch {
    // Fall through to in-memory
  }
}

// ---------------------------------------------------------------------------
// In-memory / Serverless state container (fallback when no DATABASE_URL)
// ---------------------------------------------------------------------------
class TesacolaDataRepository {
  private products: Product[] = [...(SEED_PRODUCTS as any)];
  private categories: Category[] = [...(SEED_CATEGORIES as any)];
  private collections: Collection[] = [...(SEED_COLLECTIONS as any)];
  private orders: Order[] = [];
  private customEnquiries: CustomEnquiry[] = [];
  private businessEnquiries: BusinessEnquiry[] = [];
  private journalPosts: JournalPost[] = [...(SEED_JOURNAL as any)];
  private faqs: FAQ[] = [...(SEED_FAQS as any)];
  private auditLogs: AdminAuditLog[] = [];
  private users: (User & { passwordHash: string })[] = [];

  constructor() {
    this.initDefaultUsers();
  }

  private async initDefaultUsers() {
    // Admin credentials configurable via environment variables
    const adminEmail = (process.env.ADMIN_INITIAL_EMAIL || "admin@tesacola.com").toLowerCase().trim();
    const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "TesacolaAdmin2026!";
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(adminPassword, salt);
    this.users.push({
      id: "usr-admin-01",
      email: adminEmail,
      passwordHash: hash,
      name: "Tesacola Master Administrator",
      phone: "+234 800 TESACOLA",
      role: "SUPER_ADMIN",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const custHash = bcrypt.hashSync("TesacolaCustomer2026!", salt);
    this.users.push({
      id: "usr-cust-01",
      email: "client@example.com",
      passwordHash: custHash,
      name: "Demilade Adeleke",
      phone: "+234 801 234 5678",
      role: "CUSTOMER",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  // --- PRODUCTS ---
  async getProducts(params?: {
    categorySlug?: string;
    collectionSlug?: string;
    search?: string;
    status?: string;
    sort?: string;
    featured?: boolean;
    publishedOnly?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Product[]> {
    if (neonSql) {
      try {
        const rows = (await neonSql`
          SELECT p.*, c.name as cat_name, c.slug as cat_slug
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          WHERE 1=1
          ${params?.publishedOnly !== false ? neonSql`AND p.is_published = true` : neonSql``}
          ORDER BY p.created_at DESC
        `) as any[];

        let result = rows.map(rowToProduct);

        if (params?.categorySlug) {
          result = result.filter((p) => p.category?.slug === params.categorySlug);
        }
        if (params?.featured) {
          result = result.filter((p) => p.isFeatured);
        }
        if (params?.search) {
          const q = params.search.toLowerCase();
          result = result.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.shortDescription.toLowerCase().includes(q) ||
              p.sku.toLowerCase().includes(q)
          );
        }
        if (params?.status) {
          result = result.filter((p) => p.status === params.status);
        }
        if (params?.sort === "price-asc") result.sort((a, b) => a.price - b.price);
        else if (params?.sort === "price-desc") result.sort((a, b) => b.price - a.price);

        // Attach variants + images for each product
        result = await Promise.all(
          result.map(async (p) => {
            const variants = (await neonSql!`SELECT * FROM product_variants WHERE product_id = ${p.id}`) as any[];
            const images = (await neonSql!`SELECT * FROM product_images WHERE product_id = ${p.id} ORDER BY sort_order`) as any[];
            return {
              ...p,
              variants: variants.map(rowToVariant),
              images: images.map(rowToImage),
            };
          })
        );

        if (params?.offset !== undefined || params?.limit !== undefined) {
          const start = params.offset || 0;
          const end = params.limit ? start + params.limit : undefined;
          return result.slice(start, end);
        }
        return result;
      } catch (err) {
        console.error("getProducts DB error:", err);
      }
    }

    // In-memory fallback
    let result = [...this.products];
    if (params?.publishedOnly !== false) result = result.filter((p) => p.isPublished);
    if (params?.categorySlug) {
      const cat = this.categories.find((c) => c.slug === params.categorySlug);
      if (cat) result = result.filter((p) => p.categoryId === cat.id);
    }
    if (params?.featured) result = result.filter((p) => p.isFeatured);
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          (p.material && p.material.toLowerCase().includes(q)) ||
          p.sku.toLowerCase().includes(q)
      );
    }
    if (params?.status) result = result.filter((p) => p.status === params.status);
    if (params?.sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (params?.sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (params?.sort === "newest") result.reverse();
    if (params?.offset !== undefined || params?.limit !== undefined) {
      const start = params.offset || 0;
      const end = params.limit ? start + params.limit : undefined;
      return result.slice(start, end);
    }
    return result;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (neonSql) {
      try {
        const rows = (await neonSql`
          SELECT p.*, c.name as cat_name, c.slug as cat_slug
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          WHERE p.slug = ${slug}
          LIMIT 1
        `) as any[];
        if (!rows.length) return null;
        const product = rowToProduct(rows[0]);
        const variants = (await neonSql`SELECT * FROM product_variants WHERE product_id = ${product.id}`) as any[];
        const images = (await neonSql`SELECT * FROM product_images WHERE product_id = ${product.id} ORDER BY sort_order`) as any[];
        return { ...product, variants: variants.map(rowToVariant), images: images.map(rowToImage) };
      } catch (err) {
        console.error("getProductBySlug DB error:", err);
      }
    }
    const product = this.products.find((p) => p.slug === slug);
    if (!product) return null;
    const cat = this.categories.find((c) => c.id === product.categoryId);
    return { ...product, category: cat };
  }

  async getProductById(id: string): Promise<Product | null> {
    if (neonSql) {
      try {
        const rows = (await neonSql`
          SELECT p.*, c.name as cat_name, c.slug as cat_slug
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          WHERE p.id = ${id}
          LIMIT 1
        `) as any[];
        if (!rows.length) return null;
        const product = rowToProduct(rows[0]);
        const variants = (await neonSql`SELECT * FROM product_variants WHERE product_id = ${product.id}`) as any[];
        const images = (await neonSql`SELECT * FROM product_images WHERE product_id = ${product.id} ORDER BY sort_order`) as any[];
        return { ...product, variants: variants.map(rowToVariant), images: images.map(rowToImage) };
      } catch (err) {
        console.error("getProductById DB error:", err);
      }
    }
    const product = this.products.find((p) => p.id === id);
    if (!product) return null;
    const cat = this.categories.find((c) => c.id === product.categoryId);
    return { ...product, category: cat };
  }

  async createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
    const id = `prod-${Date.now()}`;
    if (neonSql) {
      try {
        await neonSql`
          INSERT INTO products (id, name, slug, sku, short_description, full_description, product_story,
            material, colour, construction, price, currency, status, production_time, delivery_info,
            care_instructions, is_featured, is_published, category_id, created_at, updated_at)
          VALUES (${id}, ${data.name}, ${data.slug}, ${data.sku}, ${data.shortDescription}, ${data.fullDescription},
            ${data.productStory || ''}, ${data.material || ''}, ${data.colour || ''}, ${data.construction || ''},
            ${data.price}, ${data.currency || 'NGN'}, ${data.status}, ${data.productionTime || ''},
            ${data.deliveryInfo || ''}, ${data.careInstructions || ''}, ${data.isFeatured}, ${data.isPublished},
            ${data.categoryId}, NOW(), NOW())
        `;
        if (data.images && data.images.length > 0) {
          for (let i = 0; i < data.images.length; i++) {
            const img = data.images[i];
            const imgId = img.id || `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
            const mType = img.mediaType || (img.url?.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i) || img.url?.startsWith("data:video") ? "VIDEO" : "IMAGE");
            await neonSql`
              INSERT INTO product_images (id, product_id, url, alt_text, is_main, sort_order, media_type, created_at)
              VALUES (${imgId}, ${id}, ${img.url}, ${img.altText || data.name}, ${img.isMain ?? (i === 0)}, ${img.sortOrder ?? (i + 1)}, ${mType}, NOW())
            `;
          }
        }
        const created = await this.getProductById(id);
        if (created) return created;
        return { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as Product;
      } catch (err) {
        console.error("createProduct DB error:", err);
      }
    }
    const newProduct: Product = { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.products.unshift(newProduct);
    return newProduct;
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
    if (neonSql) {
      try {
        await neonSql`
          UPDATE products SET
            name = COALESCE(${data.name ?? null}, name),
            price = COALESCE(${data.price ?? null}, price),
            status = COALESCE(${data.status ?? null}, status),
            is_featured = COALESCE(${data.isFeatured ?? null}, is_featured),
            is_published = COALESCE(${data.isPublished ?? null}, is_published),
            short_description = COALESCE(${data.shortDescription ?? null}, short_description),
            full_description = COALESCE(${data.fullDescription ?? null}, full_description),
            material = COALESCE(${data.material ?? null}, material),
            colour = COALESCE(${data.colour ?? null}, colour),
            construction = COALESCE(${data.construction ?? null}, construction),
            category_id = COALESCE(${data.categoryId ?? null}, category_id),
            sku = COALESCE(${data.sku ?? null}, sku),
            updated_at = NOW()
          WHERE id = ${id}
        `;
        if (data.images && Array.isArray(data.images)) {
          await neonSql`DELETE FROM product_images WHERE product_id = ${id}`;
          for (let i = 0; i < data.images.length; i++) {
            const img = data.images[i];
            const imgId = img.id || `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
            const mType = img.mediaType || (img.url?.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i) || img.url?.startsWith("data:video") ? "VIDEO" : "IMAGE");
            await neonSql`
              INSERT INTO product_images (id, product_id, url, alt_text, is_main, sort_order, media_type, created_at)
              VALUES (${imgId}, ${id}, ${img.url}, ${img.altText || ''}, ${img.isMain ?? (i === 0)}, ${img.sortOrder ?? (i + 1)}, ${mType}, NOW())
            `;
          }
        }
        return this.getProductById(id);
      } catch (err) {
        console.error("updateProduct DB error:", err);
      }
    }
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.products[index] = { ...this.products[index], ...data, updatedAt: new Date().toISOString() };
    return this.products[index];
  }

  async deleteProduct(id: string): Promise<boolean> {
    if (neonSql) {
      try {
        await neonSql`DELETE FROM products WHERE id = ${id}`;
        return true;
      } catch (err) {
        console.error("deleteProduct DB error:", err);
      }
    }
    const initialLen = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    return this.products.length < initialLen;
  }

  // --- CATEGORIES ---
  async getCategories(activeOnly = true): Promise<Category[]> {
    if (neonSql) {
      try {
        const rows = (await neonSql`
          SELECT * FROM categories
          ${activeOnly ? neonSql`WHERE is_active = true` : neonSql``}
          ORDER BY sort_order
        `) as any[];
        return rows.map(rowToCategory);
      } catch (err) {
        console.error("getCategories DB error:", err);
      }
    }
    if (activeOnly) return this.categories.filter((c) => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
    return this.categories.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    if (neonSql) {
      try {
        const rows = (await neonSql`SELECT * FROM categories WHERE slug = ${slug} LIMIT 1`) as any[];
        return rows.length ? rowToCategory(rows[0]) : null;
      } catch (err) {
        console.error("getCategoryBySlug DB error:", err);
      }
    }
    return this.categories.find((c) => c.slug === slug) || null;
  }

  async createCategory(data: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category> {
    const id = `cat-${Date.now()}`;
    if (neonSql) {
      try {
        await neonSql`
          INSERT INTO categories (id, name, slug, description, sort_order, is_active, created_at, updated_at)
          VALUES (${id}, ${data.name}, ${data.slug}, ${data.description || ''}, ${data.sortOrder}, ${data.isActive}, NOW(), NOW())
        `;
        return { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      } catch (err) {
        console.error("createCategory DB error:", err);
      }
    }
    const newCat: Category = { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.categories.push(newCat);
    return newCat;
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<Category | null> {
    if (neonSql) {
      try {
        await neonSql`
          UPDATE categories SET
            name = COALESCE(${data.name ?? null}, name),
            slug = COALESCE(${data.slug ?? null}, slug),
            is_active = COALESCE(${data.isActive ?? null}, is_active),
            updated_at = NOW()
          WHERE id = ${id}
        `;
        const rows = (await neonSql`SELECT * FROM categories WHERE id = ${id} LIMIT 1`) as any[];
        return rows.length ? rowToCategory(rows[0]) : null;
      } catch (err) {
        console.error("updateCategory DB error:", err);
      }
    }
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) return null;
    this.categories[index] = { ...this.categories[index], ...data, updatedAt: new Date().toISOString() };
    return this.categories[index];
  }

  // --- COLLECTIONS ---
  async getCollections(publishedOnly = true): Promise<Collection[]> {
    if (neonSql) {
      try {
        const rows = (await neonSql`
          SELECT * FROM collections
          ${publishedOnly ? neonSql`WHERE is_published = true` : neonSql``}
          ORDER BY sort_order
        `) as any[];
        return rows.map(rowToCollection);
      } catch (err) {
        console.error("getCollections DB error:", err);
      }
    }
    if (publishedOnly) return this.collections.filter((c) => c.isPublished).sort((a, b) => a.sortOrder - b.sortOrder);
    return this.collections.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getCollectionBySlug(slug: string): Promise<Collection | null> {
    if (neonSql) {
      try {
        const rows = (await neonSql`SELECT * FROM collections WHERE slug = ${slug} LIMIT 1`) as any[];
        return rows.length ? rowToCollection(rows[0]) : null;
      } catch (err) {
        console.error("getCollectionBySlug DB error:", err);
      }
    }
    return this.collections.find((c) => c.slug === slug) || null;
  }

  // --- ORDERS ---
  async getOrders(params?: { status?: OrderStatus; search?: string; userId?: string }): Promise<Order[]> {
    if (neonSql) {
      try {
        const rows = (await neonSql`
          SELECT * FROM orders ORDER BY created_at DESC
        `) as any[];
        let result = rows.map(rowToOrder);
        if (params?.userId) result = result.filter((o) => o.userId === params.userId);
        if (params?.status) result = result.filter((o) => o.orderStatus === params.status);
        if (params?.search) {
          const q = params.search.toLowerCase();
          result = result.filter(
            (o) =>
              o.orderNumber.toLowerCase().includes(q) ||
              o.customerName.toLowerCase().includes(q) ||
              o.customerEmail.toLowerCase().includes(q)
          );
        }
        return result;
      } catch (err) {
        console.error("getOrders DB error:", err);
      }
    }
    let result = [...this.orders];
    if (params?.userId) result = result.filter((o) => o.userId === params.userId);
    if (params?.status) result = result.filter((o) => o.orderStatus === params.status);
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getOrderById(id: string): Promise<Order | null> {
    if (neonSql) {
      try {
        const rows = (await neonSql`SELECT * FROM orders WHERE id = ${id} LIMIT 1`) as any[];
        if (!rows.length) return null;
        const order = rowToOrder(rows[0]);
        const items = (await neonSql`SELECT * FROM order_items WHERE order_id = ${id}`) as any[];
        return { ...order, items: items.map(rowToOrderItem) };
      } catch (err) {
        console.error("getOrderById DB error:", err);
      }
    }
    return this.orders.find((o) => o.id === id) || null;
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    if (neonSql) {
      try {
        const rows = (await neonSql`SELECT * FROM orders WHERE order_number = ${orderNumber} LIMIT 1`) as any[];
        return rows.length ? rowToOrder(rows[0]) : null;
      } catch (err) {
        console.error("getOrderByNumber DB error:", err);
      }
    }
    return this.orders.find((o) => o.orderNumber === orderNumber) || null;
  }

  async createOrder(data: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> {
    const id = `ord-${Date.now()}`;
    if (neonSql) {
      try {
        await neonSql`
          INSERT INTO orders (id, order_number, user_id, customer_name, customer_email, customer_phone,
            shipping_address, subtotal, shipping_fee, tax, total, currency, payment_status, order_status,
            notes, created_at, updated_at)
          VALUES (${id}, ${data.orderNumber}, ${data.userId || null}, ${data.customerName}, ${data.customerEmail},
            ${data.customerPhone}, ${JSON.stringify(data.shippingAddress)}, ${data.subtotal}, ${data.shippingFee || 0},
            ${data.tax || 0}, ${data.total}, ${data.currency || 'NGN'}, ${data.paymentStatus || 'PENDING'},
            ${data.orderStatus || 'NEW'}, ${data.notes || ''}, NOW(), NOW())
        `;
        if (data.items && data.items.length > 0) {
          for (const item of data.items) {
            await neonSql`
              INSERT INTO order_items (id, order_id, product_id, variant_id, product_name, variant_name,
                unit_price, quantity, line_total, product_image, created_at)
              VALUES (${`oi-${Date.now()}-${Math.random()}`}, ${id}, ${item.productId || null},
                ${item.variantId || null}, ${item.productName}, ${item.variantName || ''},
                ${item.unitPrice}, ${item.quantity}, ${item.lineTotal}, ${item.productImage || ''}, NOW())
            `;
          }
        }
        return { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as Order;
      } catch (err) {
        console.error("createOrder DB error:", err);
      }
    }
    const newOrder: Order = { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.orders.unshift(newOrder);
    return newOrder;
  }

  async updateOrderStatus(id: string, status: OrderStatus, trackingNumber?: string): Promise<Order | null> {
    if (neonSql) {
      try {
        await neonSql`
          UPDATE orders SET order_status = ${status},
            tracking_number = COALESCE(${trackingNumber ?? null}, tracking_number),
            updated_at = NOW()
          WHERE id = ${id}
        `;
        return this.getOrderById(id);
      } catch (err) {
        console.error("updateOrderStatus DB error:", err);
      }
    }
    const order = this.orders.find((o) => o.id === id);
    if (!order) return null;
    order.orderStatus = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    order.updatedAt = new Date().toISOString();
    return order;
  }

  async updatePaymentStatus(id: string, paymentStatus: PaymentStatus): Promise<Order | null> {
    if (neonSql) {
      try {
        await neonSql`
          UPDATE orders SET payment_status = ${paymentStatus},
            order_status = CASE WHEN ${paymentStatus} = 'PAID' AND order_status = 'NEW' THEN 'CONFIRMED' ELSE order_status END,
            updated_at = NOW()
          WHERE id = ${id}
        `;
        return this.getOrderById(id);
      } catch (err) {
        console.error("updatePaymentStatus DB error:", err);
      }
    }
    const order = this.orders.find((o) => o.id === id);
    if (!order) return null;
    order.paymentStatus = paymentStatus;
    if (paymentStatus === "PAID" && order.orderStatus === "NEW") order.orderStatus = "CONFIRMED";
    order.updatedAt = new Date().toISOString();
    return order;
  }

  // --- CUSTOM ENQUIRIES ---
  async getCustomEnquiries(params?: { status?: CustomEnquiryStatus }): Promise<CustomEnquiry[]> {
    if (neonSql) {
      try {
        const rows = (await neonSql`SELECT * FROM custom_enquiries ORDER BY created_at DESC`) as any[];
        let result = rows.map(rowToCustomEnquiry);
        if (params?.status) result = result.filter((e) => e.status === params.status);
        return result;
      } catch (err) {
        console.error("getCustomEnquiries DB error:", err);
      }
    }
    let result = [...this.customEnquiries];
    if (params?.status) result = result.filter((e) => e.status === params.status);
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getCustomEnquiryById(id: string): Promise<CustomEnquiry | null> {
    if (neonSql) {
      try {
        const rows = (await neonSql`SELECT * FROM custom_enquiries WHERE id = ${id} LIMIT 1`) as any[];
        return rows.length ? rowToCustomEnquiry(rows[0]) : null;
      } catch (err) {
        console.error("getCustomEnquiryById DB error:", err);
      }
    }
    return this.customEnquiries.find((e) => e.id === id) || null;
  }

  async createCustomEnquiry(data: Omit<CustomEnquiry, "id" | "createdAt" | "updatedAt">): Promise<CustomEnquiry> {
    const id = `cst-${Date.now()}`;
    if (neonSql) {
      try {
        await neonSql`
          INSERT INTO custom_enquiries (id, reference_number, customer_name, email, phone, location,
            category, quantity, specifications, colour_material, intended_use, required_date,
            additional_notes, status, created_at, updated_at)
          VALUES (${id}, ${data.referenceNumber}, ${data.customerName}, ${data.email}, ${data.phone},
            ${data.location}, ${data.category}, ${data.quantity || 1}, ${data.specifications},
            ${data.colourMaterial || ''}, ${data.intendedUse || ''}, ${data.requiredDate || ''},
            ${data.additionalNotes || ''}, ${data.status || 'NEW'}, NOW(), NOW())
        `;
        return { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as CustomEnquiry;
      } catch (err) {
        console.error("createCustomEnquiry DB error:", err);
      }
    }
    const item: CustomEnquiry = { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.customEnquiries.unshift(item);
    return item;
  }

  async updateCustomEnquiryStatus(id: string, status: CustomEnquiryStatus, internalNotes?: string): Promise<CustomEnquiry | null> {
    if (neonSql) {
      try {
        await neonSql`
          UPDATE custom_enquiries SET status = ${status},
            internal_notes = COALESCE(${internalNotes ?? null}, internal_notes),
            updated_at = NOW()
          WHERE id = ${id}
        `;
        return this.getCustomEnquiryById(id);
      } catch (err) {
        console.error("updateCustomEnquiryStatus DB error:", err);
      }
    }
    const item = this.customEnquiries.find((e) => e.id === id);
    if (!item) return null;
    item.status = status;
    if (internalNotes !== undefined) item.internalNotes = internalNotes;
    item.updatedAt = new Date().toISOString();
    return item;
  }

  // --- BUSINESS ENQUIRIES ---
  async getBusinessEnquiries(params?: { status?: BusinessEnquiryStatus }): Promise<BusinessEnquiry[]> {
    if (neonSql) {
      try {
        const rows = (await neonSql`SELECT * FROM business_enquiries ORDER BY created_at DESC`) as any[];
        let result = rows.map(rowToBusinessEnquiry);
        if (params?.status) result = result.filter((e) => e.status === params.status);
        return result;
      } catch (err) {
        console.error("getBusinessEnquiries DB error:", err);
      }
    }
    let result = [...this.businessEnquiries];
    if (params?.status) result = result.filter((e) => e.status === params.status);
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getBusinessEnquiryById(id: string): Promise<BusinessEnquiry | null> {
    if (neonSql) {
      try {
        const rows = (await neonSql`SELECT * FROM business_enquiries WHERE id = ${id} LIMIT 1`) as any[];
        return rows.length ? rowToBusinessEnquiry(rows[0]) : null;
      } catch (err) {
        console.error("getBusinessEnquiryById DB error:", err);
      }
    }
    return this.businessEnquiries.find((e) => e.id === id) || null;
  }

  async createBusinessEnquiry(data: Omit<BusinessEnquiry, "id" | "createdAt" | "updatedAt">): Promise<BusinessEnquiry> {
    const id = `b2b-${Date.now()}`;
    if (neonSql) {
      try {
        await neonSql`
          INSERT INTO business_enquiries (id, reference_number, contact_name, business_name, country, city,
            email, phone, business_type, website, product_category, estimated_quantity, target_market,
            custom_requirements, timeline, status, created_at, updated_at)
          VALUES (${id}, ${data.referenceNumber}, ${data.contactName}, ${data.businessName}, ${data.country},
            ${data.city}, ${data.email}, ${data.phone}, ${data.businessType}, ${data.website || ''},
            ${data.productCategory}, ${data.estimatedQuantity}, ${data.targetMarket || ''},
            ${data.customRequirements}, ${data.timeline || ''}, ${data.status || 'NEW'}, NOW(), NOW())
        `;
        return { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() } as BusinessEnquiry;
      } catch (err) {
        console.error("createBusinessEnquiry DB error:", err);
      }
    }
    const item: BusinessEnquiry = { ...data, id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    this.businessEnquiries.unshift(item);
    return item;
  }

  async updateBusinessEnquiryStatus(id: string, status: BusinessEnquiryStatus, internalNotes?: string): Promise<BusinessEnquiry | null> {
    if (neonSql) {
      try {
        await neonSql`
          UPDATE business_enquiries SET status = ${status},
            internal_notes = COALESCE(${internalNotes ?? null}, internal_notes),
            updated_at = NOW()
          WHERE id = ${id}
        `;
        return this.getBusinessEnquiryById(id);
      } catch (err) {
        console.error("updateBusinessEnquiryStatus DB error:", err);
      }
    }
    const item = this.businessEnquiries.find((e) => e.id === id);
    if (!item) return null;
    item.status = status;
    if (internalNotes !== undefined) item.internalNotes = internalNotes;
    item.updatedAt = new Date().toISOString();
    return item;
  }

  // --- JOURNAL ---
  async getJournalPosts(publishedOnly = true): Promise<JournalPost[]> {
    if (neonSql) {
      try {
        const rows = (await neonSql`
          SELECT * FROM journal_posts
          ${publishedOnly ? neonSql`WHERE is_published = true` : neonSql``}
          ORDER BY published_at DESC
        `) as any[];
        return rows.map(rowToJournalPost);
      } catch (err) {
        console.error("getJournalPosts DB error:", err);
      }
    }
    if (publishedOnly) return this.journalPosts.filter((p) => p.isPublished);
    return this.journalPosts;
  }

  async getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
    if (neonSql) {
      try {
        const rows = (await neonSql`SELECT * FROM journal_posts WHERE slug = ${slug} LIMIT 1`) as any[];
        return rows.length ? rowToJournalPost(rows[0]) : null;
      } catch (err) {
        console.error("getJournalPostBySlug DB error:", err);
      }
    }
    return this.journalPosts.find((p) => p.slug === slug) || null;
  }

  // --- FAQs ---
  async getFAQs(): Promise<FAQ[]> {
    if (neonSql) {
      try {
        const rows = (await neonSql`SELECT * FROM faqs WHERE is_published = true ORDER BY sort_order`) as any[];
        return rows.map(rowToFAQ);
      } catch (err) {
        console.error("getFAQs DB error:", err);
      }
    }
    return this.faqs.filter((f) => f.isPublished).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  // --- USERS & AUTH ---
  async getUserByEmail(email: string): Promise<(User & { passwordHash: string }) | null> {
    if (neonSql) {
      try {
        const rows = (await neonSql`SELECT * FROM users WHERE LOWER(email) = ${email.toLowerCase()} LIMIT 1`) as any[];
        if (!rows.length) return null;
        const r = rows[0];
        return {
          id: r.id, email: r.email, name: r.name, phone: r.phone,
          role: r.role, passwordHash: r.password_hash,
          createdAt: r.created_at?.toISOString?.() || r.created_at,
          updatedAt: r.updated_at?.toISOString?.() || r.updated_at,
        };
      } catch (err) {
        console.error("getUserByEmail DB error:", err);
      }
    }
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async getUserById(id: string): Promise<User | null> {
    if (neonSql) {
      try {
        const rows = (await neonSql`SELECT * FROM users WHERE id = ${id} LIMIT 1`) as any[];
        if (!rows.length) return null;
        const r = rows[0];
        return {
          id: r.id, email: r.email, name: r.name, phone: r.phone, role: r.role,
          createdAt: r.created_at?.toISOString?.() || r.created_at,
          updatedAt: r.updated_at?.toISOString?.() || r.updated_at,
        };
      } catch (err) {
        console.error("getUserById DB error:", err);
      }
    }
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async createUser(data: { email: string; password: string; name: string; phone?: string }): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(data.password, salt);
    const id = `usr-${Date.now()}`;
    if (neonSql) {
      try {
        await neonSql`
          INSERT INTO users (id, email, password_hash, name, phone, role, created_at, updated_at)
          VALUES (${id}, ${data.email.toLowerCase()}, ${passwordHash}, ${data.name}, ${data.phone || ''}, 'CUSTOMER', NOW(), NOW())
        `;
        return {
          id, email: data.email.toLowerCase(), name: data.name, phone: data.phone,
          role: "CUSTOMER", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        };
      } catch (err) {
        console.error("createUser DB error:", err);
      }
    }
    const newUser = {
      id, email: data.email.toLowerCase(), name: data.name, phone: data.phone,
      role: "CUSTOMER" as const, passwordHash,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    const { passwordHash: _, ...safeUser } = newUser;
    return safeUser;
  }

  // --- DASHBOARD METRICS ---
  async getDashboardMetrics() {
    if (neonSql) {
      try {
        const [productCount] = (await neonSql`SELECT COUNT(*) as count FROM products`) as any[];
        const [activeCount] = (await neonSql`SELECT COUNT(*) as count FROM products WHERE is_published = true`) as any[];
        const [orderCount] = (await neonSql`SELECT COUNT(*) as count FROM orders`) as any[];
        const [pendingCount] = (await neonSql`SELECT COUNT(*) as count FROM orders WHERE order_status IN ('NEW', 'PROCESSING')`) as any[];
        const [revenueRow] = (await neonSql`SELECT COALESCE(SUM(total), 0) as revenue FROM orders WHERE payment_status = 'PAID'`) as any[];
        const [bizNewCount] = (await neonSql`SELECT COUNT(*) as count FROM business_enquiries WHERE status = 'NEW'`) as any[];
        const [custNewCount] = (await neonSql`SELECT COUNT(*) as count FROM custom_enquiries WHERE status = 'NEW'`) as any[];
        const recentOrders = (await neonSql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 5`) as any[];
        const recentCustomEnquiries = (await neonSql`SELECT * FROM custom_enquiries ORDER BY created_at DESC LIMIT 5`) as any[];
        const recentBusinessEnquiries = (await neonSql`SELECT * FROM business_enquiries ORDER BY created_at DESC LIMIT 5`) as any[];
        return {
          totalProducts: Number(productCount.count),
          activeProducts: Number(activeCount.count),
          totalOrders: Number(orderCount.count),
          pendingOrders: Number(pendingCount.count),
          paidOrders: 0,
          totalRevenue: Number(revenueRow.revenue),
          newBusinessEnquiries: Number(bizNewCount.count),
          newCustomEnquiries: Number(custNewCount.count),
          recentOrders: recentOrders.map(rowToOrder),
          recentCustomEnquiries: recentCustomEnquiries.map(rowToCustomEnquiry),
          recentBusinessEnquiries: recentBusinessEnquiries.map(rowToBusinessEnquiry),
        };
      } catch (err) {
        console.error("getDashboardMetrics DB error:", err);
      }
    }
    const totalProducts = this.products.length;
    const activeProducts = this.products.filter((p) => p.isPublished).length;
    const totalOrders = this.orders.length;
    const pendingOrders = this.orders.filter((o) => o.orderStatus === "NEW" || o.orderStatus === "PROCESSING").length;
    const paidOrders = this.orders.filter((o) => o.paymentStatus === "PAID").length;
    const totalRevenue = this.orders.filter((o) => o.paymentStatus === "PAID").reduce((sum, o) => sum + o.total, 0);
    const newBusinessEnquiries = this.businessEnquiries.filter((e) => e.status === "NEW").length;
    const newCustomEnquiries = this.customEnquiries.filter((e) => e.status === "NEW").length;
    return {
      totalProducts, activeProducts, totalOrders, pendingOrders, paidOrders, totalRevenue,
      newBusinessEnquiries, newCustomEnquiries,
      recentOrders: this.orders.slice(0, 5),
      recentCustomEnquiries: this.customEnquiries.slice(0, 5),
      recentBusinessEnquiries: this.businessEnquiries.slice(0, 5),
    };
  }

  // --- AUDIT LOGS ---
  async logAdminAction(data: Omit<AdminAuditLog, "id" | "createdAt">): Promise<void> {
    if (neonSql) {
      try {
        await neonSql`
          INSERT INTO admin_audit_logs (id, user_id, user_email, action, entity_type, entity_id, details, ip_address, created_at)
          VALUES (${`log-${Date.now()}`}, ${data.userId}, ${data.userEmail}, ${data.action},
            ${data.entityType}, ${data.entityId}, ${data.details || ''}, ${data.ipAddress || ''}, NOW())
        `;
        return;
      } catch (err) {
        console.error("logAdminAction DB error:", err);
      }
    }
    this.auditLogs.unshift({ ...data, id: `log-${Date.now()}`, createdAt: new Date().toISOString() });
  }

  async getAuditLogs(limit = 50): Promise<AdminAuditLog[]> {
    if (neonSql) {
      try {
        const rows = (await neonSql`SELECT * FROM admin_audit_logs ORDER BY created_at DESC LIMIT ${limit}`) as any[];
        return rows.map((r: any) => ({
          id: r.id, userId: r.user_id, userEmail: r.user_email, action: r.action,
          entityType: r.entity_type, entityId: r.entity_id, details: r.details,
          ipAddress: r.ip_address, createdAt: r.created_at?.toISOString?.() || r.created_at,
        }));
      } catch (err) {
        console.error("getAuditLogs DB error:", err);
      }
    }
    return this.auditLogs.slice(0, limit);
  }
}

// ---------------------------------------------------------------------------
// Row mapper helpers
// ---------------------------------------------------------------------------
function rowToProduct(r: any): Product {
  return {
    id: r.id, name: r.name, slug: r.slug, sku: r.sku,
    shortDescription: r.short_description, fullDescription: r.full_description,
    productStory: r.product_story, material: r.material, colour: r.colour,
    construction: r.construction, price: r.price, currency: r.currency, status: r.status,
    productionTime: r.production_time, deliveryInfo: r.delivery_info,
    careInstructions: r.care_instructions, isFeatured: r.is_featured, isPublished: r.is_published,
    categoryId: r.category_id,
    category: r.cat_name ? { id: r.category_id, name: r.cat_name, slug: r.cat_slug } as any : undefined,
    createdAt: r.created_at?.toISOString?.() || r.created_at,
    updatedAt: r.updated_at?.toISOString?.() || r.updated_at,
  };
}

function rowToVariant(r: any) {
  return {
    id: r.id, productId: r.product_id, name: r.name, sku: r.sku,
    size: r.size, colour: r.colour, priceAdjustment: r.price_adjustment,
    stockQuantity: r.stock_quantity, isAvailable: r.is_available,
    createdAt: r.created_at?.toISOString?.() || r.created_at,
    updatedAt: r.updated_at?.toISOString?.() || r.updated_at,
  };
}

function rowToImage(r: any) {
  return {
    id: r.id,
    productId: r.product_id,
    url: r.url,
    altText: r.alt_text,
    isMain: r.is_main,
    sortOrder: r.sort_order,
    mediaType: (r.media_type || (r.url?.match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i) || r.url?.startsWith("data:video") ? "VIDEO" : "IMAGE")) as "IMAGE" | "VIDEO",
    createdAt: r.created_at?.toISOString?.() || r.created_at,
  };
}

function rowToCategory(r: any): Category {
  return {
    id: r.id, name: r.name, slug: r.slug, description: r.description,
    image: r.image, parentId: r.parent_id, sortOrder: r.sort_order, isActive: r.is_active,
    seoTitle: r.seo_title, seoDescription: r.seo_description,
    createdAt: r.created_at?.toISOString?.() || r.created_at,
    updatedAt: r.updated_at?.toISOString?.() || r.updated_at,
  };
}

function rowToCollection(r: any): Collection {
  return {
    id: r.id, name: r.name, slug: r.slug, description: r.description,
    heroImage: r.hero_image, isPublished: r.is_published, sortOrder: r.sort_order,
    seoTitle: r.seo_title, seoDescription: r.seo_description,
    createdAt: r.created_at?.toISOString?.() || r.created_at,
    updatedAt: r.updated_at?.toISOString?.() || r.updated_at,
  };
}

function rowToOrder(r: any): Order {
  return {
    id: r.id, orderNumber: r.order_number, userId: r.user_id,
    customerName: r.customer_name, customerEmail: r.customer_email, customerPhone: r.customer_phone,
    shippingAddress: r.shipping_address, subtotal: r.subtotal, shippingFee: r.shipping_fee,
    tax: r.tax, total: r.total, currency: r.currency, paymentStatus: r.payment_status,
    orderStatus: r.order_status, trackingNumber: r.tracking_number, notes: r.notes,
    items: [],
    createdAt: r.created_at?.toISOString?.() || r.created_at,
    updatedAt: r.updated_at?.toISOString?.() || r.updated_at,
  };
}

function rowToOrderItem(r: any) {
  return {
    id: r.id, orderId: r.order_id, productId: r.product_id, variantId: r.variant_id,
    productName: r.product_name, variantName: r.variant_name, unitPrice: r.unit_price,
    quantity: r.quantity, lineTotal: r.line_total, productImage: r.product_image,
    createdAt: r.created_at?.toISOString?.() || r.created_at,
  };
}

function rowToCustomEnquiry(r: any): CustomEnquiry {
  return {
    id: r.id, referenceNumber: r.reference_number, customerName: r.customer_name,
    email: r.email, phone: r.phone, location: r.location, category: r.category,
    quantity: r.quantity, specifications: r.specifications, colourMaterial: r.colour_material,
    intendedUse: r.intended_use, requiredDate: r.required_date,
    additionalNotes: r.additional_notes, status: r.status, internalNotes: r.internal_notes,
    createdAt: r.created_at?.toISOString?.() || r.created_at,
    updatedAt: r.updated_at?.toISOString?.() || r.updated_at,
  };
}

function rowToBusinessEnquiry(r: any): BusinessEnquiry {
  return {
    id: r.id, referenceNumber: r.reference_number, contactName: r.contact_name,
    businessName: r.business_name, country: r.country, city: r.city,
    email: r.email, phone: r.phone, businessType: r.business_type, website: r.website,
    productCategory: r.product_category, estimatedQuantity: r.estimated_quantity,
    targetMarket: r.target_market, customRequirements: r.custom_requirements,
    timeline: r.timeline, status: r.status, internalNotes: r.internal_notes,
    createdAt: r.created_at?.toISOString?.() || r.created_at,
    updatedAt: r.updated_at?.toISOString?.() || r.updated_at,
  };
}

function rowToJournalPost(r: any): JournalPost {
  return {
    id: r.id, title: r.title, slug: r.slug, excerpt: r.excerpt, content: r.content,
    coverImage: r.cover_image, author: r.author, categoryId: r.category_id,
    tags: r.tags, isPublished: r.is_published,
    publishedAt: r.published_at?.toISOString?.() || r.published_at,
    seoTitle: r.seo_title, seoDescription: r.seo_description, ogImage: r.og_image,
    createdAt: r.created_at?.toISOString?.() || r.created_at,
    updatedAt: r.updated_at?.toISOString?.() || r.updated_at,
  };
}

function rowToFAQ(r: any): FAQ {
  return {
    id: r.id, question: r.question, answer: r.answer, category: r.category,
    sortOrder: r.sort_order, isPublished: r.is_published,
    createdAt: r.created_at?.toISOString?.() || r.created_at,
    updatedAt: r.updated_at?.toISOString?.() || r.updated_at,
  };
}

// ---------------------------------------------------------------------------
// Singleton instance preserved across serverless route invocations
// ---------------------------------------------------------------------------
const globalForRepo = global as unknown as { tesacolaRepo?: TesacolaDataRepository };
export const dbRepository = globalForRepo.tesacolaRepo || new TesacolaDataRepository();
if (process.env.NODE_ENV !== "production") globalForRepo.tesacolaRepo = dbRepository;
