"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatCurrency } from "@/lib/utils";
import { processCheckout } from "@/app/actions/commerce";
import { ShieldCheck, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    addressLine1: "",
    addressLine2: "",
    city: "Lagos",
    state: "Lagos State",
    postalCode: "",
    country: "Nigeria",
    deliveryNotes: "",
  });

  const freeShippingThreshold = 300000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingFee = isFreeShipping || subtotal === 0 ? 0 : 5000;
  const grandTotal = subtotal + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMessage("Your shopping bag is empty.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await processCheckout({
        ...formData,
        cartItems: items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          quantity: i.quantity,
        })),
      });

      if (!response.success || !response.checkoutUrl) {
        setErrorMessage(response.error || "Failed to initiate order. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Clear local bag after order successfully registered in DB
      clearCart();

      // Redirect to payment gateway or sandbox confirmation
      window.location.href = response.checkoutUrl;
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred during checkout.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white pt-36 pb-24 flex items-center justify-center">
        <div className="text-center space-y-4 max-w-sm px-4">
          <h1 className="font-serif text-2xl">Bag is Empty</h1>
          <p className="text-xs text-neutral-400">Please add items to your shopping bag before proceeding to checkout.</p>
          <Link href="/shop" className="inline-block px-6 py-3 bg-[#d6be67] text-black text-xs font-semibold uppercase tracking-widest">
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-6 border-b border-[#1f1f1f]">
          <div className="text-[11px] text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Link href="/cart" className="hover:text-white">Shopping Bag</Link>
            <span>/</span>
            <span className="text-[#d6be67]">Secure Checkout</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-white flex items-center gap-3">
            <span>Client Order &amp; Delivery</span>
            <Lock className="w-5 h-5 text-[#d6be67]" />
          </h1>
        </div>

        {errorMessage && (
          <div className="mb-8 p-4 bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Client Details & Delivery Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Contact */}
            <div className="p-8 bg-[#0a0a0a] border border-[#1f1f1f] space-y-5">
              <h2 className="font-serif text-lg font-medium text-white border-b border-[#1f1f1f] pb-3">
                1. Customer Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="e.g. Babatunde Adeyemi"
                    className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    required
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="babatunde@example.com"
                    className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Phone Number (WhatsApp preferred) *
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    required
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="+234 801 234 5678"
                    className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="p-8 bg-[#0a0a0a] border border-[#1f1f1f] space-y-5">
              <h2 className="font-serif text-lg font-medium text-white border-b border-[#1f1f1f] pb-3">
                2. Delivery Destination
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    required
                    value={formData.addressLine1}
                    onChange={handleChange}
                    placeholder="House/Apartment number, street name"
                    className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Suite, Unit or Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    placeholder="Opposite Landmark Center, Victoria Island"
                    className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Lagos / Abuja / Port Harcourt"
                      className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Lagos State"
                      className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] px-4 py-3 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <textarea
                    name="deliveryNotes"
                    rows={2}
                    value={formData.deliveryNotes}
                    onChange={handleChange}
                    placeholder="Gate code, specific delivery hour preferences, or recipient instructions..."
                    className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Final Payment Trigger */}
          <div className="lg:col-span-5">
            <div className="p-8 bg-[#0a0a0a] border border-[#1f1f1f] space-y-6 sticky top-28">
              <h2 className="font-serif text-lg font-medium text-white border-b border-[#1f1f1f] pb-3">
                Order Review ({items.length} {items.length === 1 ? "Item" : "Items"})
              </h2>

              {/* Items List */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => {
                  const unitPrice = item.product.price + (item.variant?.priceAdjustment || 0);
                  const imageUrl = item.product.images?.[0]?.url || "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=200&q=80";

                  return (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <div className="relative w-12 h-14 bg-[#141414] border border-[#262626] flex-shrink-0">
                        <Image src={imageUrl} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">{item.product.name}</p>
                        <p className="text-[11px] text-neutral-400">
                          {item.variant ? `${item.variant.size || ""} ` : ""}Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-serif text-white font-medium">
                        {formatCurrency(unitPrice * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Totals Breakdown */}
              <div className="pt-4 border-t border-[#1f1f1f] space-y-2.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Insured Delivery</span>
                  <span className="text-white font-medium">
                    {isFreeShipping ? (
                      <span className="text-[#d6be67]">Free</span>
                    ) : (
                      formatCurrency(shippingFee)
                    )}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#1f1f1f] flex justify-between text-sm">
                  <span className="font-medium text-white">Grand Total</span>
                  <span className="font-serif text-xl font-bold text-[#d6be67]">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#d6be67] hover:bg-[#f4e996] disabled:opacity-50 text-black font-semibold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Securing Order Session...</span>
                    </>
                  ) : (
                    <>
                      <span>Authorize Payment ({formatCurrency(grandTotal)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-[#d6be67]" />
                <span>256-Bit Encrypted Payment Authorization</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
