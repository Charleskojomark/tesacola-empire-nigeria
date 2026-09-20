import { z } from "zod";

// Customer & Auth schemas
export const registerSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Checkout & Shipping schemas
export const checkoutSchema = z.object({
  customerName: z.string().min(2, "Full name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().min(7, "Valid phone number is required"),
  addressLine1: z.string().min(5, "Delivery street address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  postalCode: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  deliveryNotes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
});

// Custom Enquiry schema
export const customEnquirySchema = z.object({
  customerName: z.string().min(2, "Your name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(7, "Valid phone number is required"),
  location: z.string().min(2, "Your city and country are required"),
  category: z.enum([
    "FOOTWEAR",
    "BAGS",
    "BELTS",
    "LEATHER_GOODS",
    "CORPORATE",
    "SPECIAL_PROJECTS",
  ]),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  specifications: z.string().min(10, "Please provide detailed specifications"),
  colourMaterial: z.string().optional(),
  intendedUse: z.string().optional(),
  requiredDate: z.string().optional(),
  additionalNotes: z.string().optional(),
  fileAttachmentUrl: z.string().optional(),
});

// Business Enquiry schema
export const businessEnquirySchema = z.object({
  contactName: z.string().min(2, "Contact person name is required"),
  businessName: z.string().min(2, "Registered business name is required"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  email: z.string().email("Business email is required"),
  phone: z.string().min(7, "Business phone number is required"),
  businessType: z.enum([
    "RETAILER",
    "WHOLESALER",
    "RESELLER",
    "CORPORATE",
    "INSTITUTION",
    "INTERNATIONAL",
    "MANUFACTURING",
    "PRIVATE_LABEL",
  ]),
  website: z.string().optional(),
  productCategory: z.string().min(2, "Product category or line of interest is required"),
  estimatedQuantity: z.string().min(1, "Estimated order volume is required"),
  targetMarket: z.string().optional(),
  customRequirements: z.string().min(10, "Please describe your commercial requirements"),
  timeline: z.string().optional(),
  fileAttachmentUrl: z.string().optional(),
});

// Contact Message schema
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Admin Product Schema
export const productAdminSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  slug: z.string().min(2, "Slug is required"),
  sku: z.string().min(2, "SKU is required"),
  shortDescription: z.string().min(10, "Short description is required"),
  fullDescription: z.string().min(20, "Full description is required"),
  productStory: z.string().optional(),
  material: z.string().optional(),
  colour: z.string().optional(),
  construction: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be positive"),
  currency: z.string().default("NGN"),
  status: z.enum(["IN_STOCK", "MADE_TO_ORDER", "PRE_ORDER", "UNAVAILABLE"]),
  productionTime: z.string().optional(),
  deliveryInfo: z.string().optional(),
  careInstructions: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  categoryId: z.string().min(1, "Category is required"),
  subcategoryId: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});
