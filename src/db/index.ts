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

// In-memory / Serverless state container
// When DATABASE_URL is provided, this repository handles fallback and sync.
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
    // Initial super admin for development/testing
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("TesacolaAdmin2026!", salt);
    this.users.push({
      id: "usr-admin-01",
      email: "admin@tesacola.com",
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
    let result = [...this.products];

    if (params?.publishedOnly !== false) {
      result = result.filter((p) => p.isPublished);
    }

    if (params?.categorySlug) {
      const cat = this.categories.find((c) => c.slug === params.categorySlug);
      if (cat) {
        result = result.filter((p) => p.categoryId === cat.id);
      }
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
          (p.material && p.material.toLowerCase().includes(q)) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    if (params?.status) {
      result = result.filter((p) => p.status === params.status);
    }

    if (params?.sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (params?.sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (params?.sort === "newest") {
      result.reverse();
    }

    if (params?.offset !== undefined || params?.limit !== undefined) {
      const start = params.offset || 0;
      const end = params.limit ? start + params.limit : undefined;
      return result.slice(start, end);
    }

    return result;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const product = this.products.find((p) => p.slug === slug);
    if (!product) return null;
    const cat = this.categories.find((c) => c.id === product.categoryId);
    return { ...product, category: cat };
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = this.products.find((p) => p.id === id);
    if (!product) return null;
    const cat = this.categories.find((c) => c.id === product.categoryId);
    return { ...product, category: cat };
  }

  async createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.products[index] = {
      ...this.products[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.products[index];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const initialLen = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    return this.products.length < initialLen;
  }

  // --- CATEGORIES ---
  async getCategories(activeOnly = true): Promise<Category[]> {
    if (activeOnly) {
      return this.categories.filter((c) => c.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
    }
    return this.categories.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return this.categories.find((c) => c.slug === slug) || null;
  }

  async createCategory(data: Omit<Category, "id" | "createdAt" | "updatedAt">): Promise<Category> {
    const newCat: Category = {
      ...data,
      id: `cat-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.categories.push(newCat);
    return newCat;
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<Category | null> {
    const index = this.categories.findIndex((c) => c.id === id);
    if (index === -1) return null;
    this.categories[index] = {
      ...this.categories[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return this.categories[index];
  }

  // --- COLLECTIONS ---
  async getCollections(publishedOnly = true): Promise<Collection[]> {
    if (publishedOnly) {
      return this.collections.filter((c) => c.isPublished).sort((a, b) => a.sortOrder - b.sortOrder);
    }
    return this.collections.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getCollectionBySlug(slug: string): Promise<Collection | null> {
    return this.collections.find((c) => c.slug === slug) || null;
  }

  // --- ORDERS ---
  async getOrders(params?: { status?: OrderStatus; search?: string; userId?: string }): Promise<Order[]> {
    let result = [...this.orders];
    if (params?.userId) {
      result = result.filter((o) => o.userId === params.userId);
    }
    if (params?.status) {
      result = result.filter((o) => o.orderStatus === params.status);
    }
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
    return this.orders.find((o) => o.id === id) || null;
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    return this.orders.find((o) => o.orderNumber === orderNumber) || null;
  }

  async createOrder(data: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> {
    const newOrder: Order = {
      ...data,
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.orders.unshift(newOrder);
    return newOrder;
  }

  async updateOrderStatus(id: string, status: OrderStatus, trackingNumber?: string): Promise<Order | null> {
    const order = this.orders.find((o) => o.id === id);
    if (!order) return null;
    order.orderStatus = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;
    order.updatedAt = new Date().toISOString();
    return order;
  }

  async updatePaymentStatus(id: string, paymentStatus: PaymentStatus): Promise<Order | null> {
    const order = this.orders.find((o) => o.id === id);
    if (!order) return null;
    order.paymentStatus = paymentStatus;
    if (paymentStatus === "PAID" && order.orderStatus === "NEW") {
      order.orderStatus = "CONFIRMED";
    }
    order.updatedAt = new Date().toISOString();
    return order;
  }

  // --- CUSTOM ENQUIRIES ---
  async getCustomEnquiries(params?: { status?: CustomEnquiryStatus }): Promise<CustomEnquiry[]> {
    let result = [...this.customEnquiries];
    if (params?.status) {
      result = result.filter((e) => e.status === params.status);
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getCustomEnquiryById(id: string): Promise<CustomEnquiry | null> {
    return this.customEnquiries.find((e) => e.id === id) || null;
  }

  async createCustomEnquiry(data: Omit<CustomEnquiry, "id" | "createdAt" | "updatedAt">): Promise<CustomEnquiry> {
    const item: CustomEnquiry = {
      ...data,
      id: `cst-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.customEnquiries.unshift(item);
    return item;
  }

  async updateCustomEnquiryStatus(
    id: string,
    status: CustomEnquiryStatus,
    internalNotes?: string
  ): Promise<CustomEnquiry | null> {
    const item = this.customEnquiries.find((e) => e.id === id);
    if (!item) return null;
    item.status = status;
    if (internalNotes !== undefined) item.internalNotes = internalNotes;
    item.updatedAt = new Date().toISOString();
    return item;
  }

  // --- BUSINESS / B2B ENQUIRIES ---
  async getBusinessEnquiries(params?: { status?: BusinessEnquiryStatus }): Promise<BusinessEnquiry[]> {
    let result = [...this.businessEnquiries];
    if (params?.status) {
      result = result.filter((e) => e.status === params.status);
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getBusinessEnquiryById(id: string): Promise<BusinessEnquiry | null> {
    return this.businessEnquiries.find((e) => e.id === id) || null;
  }

  async createBusinessEnquiry(data: Omit<BusinessEnquiry, "id" | "createdAt" | "updatedAt">): Promise<BusinessEnquiry> {
    const item: BusinessEnquiry = {
      ...data,
      id: `b2b-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.businessEnquiries.unshift(item);
    return item;
  }

  async updateBusinessEnquiryStatus(
    id: string,
    status: BusinessEnquiryStatus,
    internalNotes?: string
  ): Promise<BusinessEnquiry | null> {
    const item = this.businessEnquiries.find((e) => e.id === id);
    if (!item) return null;
    item.status = status;
    if (internalNotes !== undefined) item.internalNotes = internalNotes;
    item.updatedAt = new Date().toISOString();
    return item;
  }

  // --- JOURNAL ---
  async getJournalPosts(publishedOnly = true): Promise<JournalPost[]> {
    if (publishedOnly) {
      return this.journalPosts.filter((p) => p.isPublished);
    }
    return this.journalPosts;
  }

  async getJournalPostBySlug(slug: string): Promise<JournalPost | null> {
    return this.journalPosts.find((p) => p.slug === slug) || null;
  }

  // --- FAQS ---
  async getFAQs(): Promise<FAQ[]> {
    return this.faqs.filter((f) => f.isPublished).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  // --- USERS & AUTH ---
  async getUserByEmail(email: string): Promise<(User & { passwordHash: string }) | null> {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async createUser(data: { email: string; password: string; name: string; phone?: string }): Promise<User> {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(data.password, salt);
    const newUser = {
      id: `usr-${Date.now()}`,
      email: data.email.toLowerCase(),
      name: data.name,
      phone: data.phone,
      role: "CUSTOMER" as const,
      passwordHash,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    const { passwordHash: _, ...safeUser } = newUser;
    return safeUser;
  }

  // --- DASHBOARD METRICS ---
  async getDashboardMetrics() {
    const totalProducts = this.products.length;
    const activeProducts = this.products.filter((p) => p.isPublished).length;
    const totalOrders = this.orders.length;
    const pendingOrders = this.orders.filter((o) => o.orderStatus === "NEW" || o.orderStatus === "PROCESSING").length;
    const paidOrders = this.orders.filter((o) => o.paymentStatus === "PAID").length;
    const totalRevenue = this.orders
      .filter((o) => o.paymentStatus === "PAID")
      .reduce((sum, o) => sum + o.total, 0);
    const newBusinessEnquiries = this.businessEnquiries.filter((e) => e.status === "NEW").length;
    const newCustomEnquiries = this.customEnquiries.filter((e) => e.status === "NEW").length;
    const recentOrders = this.orders.slice(0, 5);
    const recentCustomEnquiries = this.customEnquiries.slice(0, 5);
    const recentBusinessEnquiries = this.businessEnquiries.slice(0, 5);

    return {
      totalProducts,
      activeProducts,
      totalOrders,
      pendingOrders,
      paidOrders,
      totalRevenue,
      newBusinessEnquiries,
      newCustomEnquiries,
      recentOrders,
      recentCustomEnquiries,
      recentBusinessEnquiries,
    };
  }

  // --- AUDIT LOGS ---
  async logAdminAction(data: Omit<AdminAuditLog, "id" | "createdAt">): Promise<void> {
    this.auditLogs.unshift({
      ...data,
      id: `log-${Date.now()}`,
      createdAt: new Date().toISOString(),
    });
  }

  async getAuditLogs(limit = 50): Promise<AdminAuditLog[]> {
    return this.auditLogs.slice(0, limit);
  }
}

// Singleton instance preserved across serverless route invocations
const globalForRepo = global as unknown as { tesacolaRepo?: TesacolaDataRepository };
export const dbRepository = globalForRepo.tesacolaRepo || new TesacolaDataRepository();
if (process.env.NODE_ENV !== "production") globalForRepo.tesacolaRepo = dbRepository;
