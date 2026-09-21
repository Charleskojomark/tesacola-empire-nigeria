export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "CONTENT_MANAGER"
  | "ORDER_MANAGER"
  | "CUSTOMER";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  phone: string;
  isDefault: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  heroImage?: string;
  isPublished: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProductStatus =
  | "IN_STOCK"
  | "MADE_TO_ORDER"
  | "PRE_ORDER"
  | "UNAVAILABLE";

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  sku: string;
  size?: string;
  colour?: string;
  priceAdjustment: number;
  stockQuantity: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText: string;
  isMain: boolean;
  sortOrder: number;
  mediaType?: "IMAGE" | "VIDEO";
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  fullDescription: string;
  productStory?: string;
  material?: string;
  colour?: string;
  construction?: string;
  price: number;
  currency: string;
  status: ProductStatus;
  productionTime?: string;
  deliveryInfo?: string;
  careInstructions?: string;
  isFeatured: boolean;
  isPublished: boolean;
  categoryId: string;
  subcategoryId?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  createdAt: string;
  updatedAt: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  category?: Category;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  product: Product;
  variant?: ProductVariant;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  currency: string;
  itemCount: number;
}

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export type OrderStatus =
  | "NEW"
  | "CONFIRMED"
  | "PROCESSING"
  | "MADE_TO_ORDER"
  | "READY"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  productName: string;
  variantName?: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  productImage?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode?: string;
    country: string;
  };
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  currency: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export type CustomEnquiryStatus =
  | "NEW"
  | "REVIEWING"
  | "CONTACTED"
  | "IN_DISCUSSION"
  | "QUOTED"
  | "IN_PRODUCTION"
  | "COMPLETED"
  | "CLOSED";

export type CustomEnquiryCategory =
  | "FOOTWEAR"
  | "BAGS"
  | "BELTS"
  | "LEATHER_GOODS"
  | "CORPORATE"
  | "SPECIAL_PROJECTS";

export interface CustomEnquiry {
  id: string;
  referenceNumber: string;
  customerName: string;
  email: string;
  phone: string;
  location: string;
  category: CustomEnquiryCategory;
  quantity: number;
  specifications: string;
  colourMaterial?: string;
  intendedUse?: string;
  requiredDate?: string;
  additionalNotes?: string;
  fileAttachmentUrl?: string;
  status: CustomEnquiryStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export type BusinessEnquiryStatus =
  | "NEW"
  | "REVIEWING"
  | "CONTACTED"
  | "IN_DISCUSSION"
  | "QUOTED"
  | "CONVERTED"
  | "CLOSED";

export type BusinessType =
  | "RETAILER"
  | "WHOLESALER"
  | "RESELLER"
  | "CORPORATE"
  | "INSTITUTION"
  | "INTERNATIONAL"
  | "MANUFACTURING"
  | "PRIVATE_LABEL";

export interface BusinessEnquiry {
  id: string;
  referenceNumber: string;
  contactName: string;
  businessName: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  businessType: BusinessType;
  website?: string;
  productCategory: string;
  estimatedQuantity: string;
  targetMarket?: string;
  customRequirements: string;
  timeline?: string;
  fileAttachmentUrl?: string;
  status: BusinessEnquiryStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  categoryId?: string;
  tags?: string[];
  isPublished: boolean;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SiteContent {
  id: string;
  key: string;
  section: string;
  content: Record<string, any>;
  updatedAt: string;
}

export interface AdminAuditLog {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: string;
  ipAddress?: string;
  createdAt: string;
}
