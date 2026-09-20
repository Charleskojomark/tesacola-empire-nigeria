"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 300000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#0a0a0a] border-l border-[#1f1f1f] h-full flex flex-col z-10 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#1f1f1f] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#d6be67]" />
            <h3 className="font-serif text-lg text-white uppercase tracking-wider font-medium">
              Shopping Bag ({itemCount})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-neutral-400 hover:text-white p-1 transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#121212] px-6 py-3 border-b border-[#1f1f1f]">
          <div className="flex justify-between text-[11px] text-neutral-300 mb-1.5">
            <span>
              {subtotal >= freeShippingThreshold ? (
                <span className="text-[#d6be67] font-medium">You have unlocked Complimentary Delivery</span>
              ) : (
                <>Add <strong className="text-white">{formatCurrency(freeShippingThreshold - subtotal)}</strong> for free shipping</>
              )}
            </span>
            <span className="text-neutral-500">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#262626] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#d6be67] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-16 h-16 rounded-full bg-[#121212] border border-[#262626] flex items-center justify-center text-neutral-500">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-lg text-white font-medium">Your Bag is Empty</h4>
              <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                Explore our handcrafted Nigerian leather footwear, executive portfolios, and bespoke accessories.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2.5 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#f4e996] transition-colors"
              >
                Explore Catalogue
              </button>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice = item.product.price + (item.variant?.priceAdjustment || 0);
              const imageUrl = item.product.images?.[0]?.url || "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=400&q=80";

              return (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-[#1f1f1f] group"
                >
                  <div className="relative w-20 h-24 bg-[#141414] border border-[#262626] flex-shrink-0 overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-medium text-white line-clamp-1 pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.variant && (
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          {item.variant.size && `Size: ${item.variant.size}`}
                          {item.variant.colour && ` • ${item.variant.colour}`}
                        </p>
                      )}

                      <p className="text-xs font-medium text-[#d6be67] mt-1">
                        {formatCurrency(unitPrice)}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-[#262626] bg-[#121212]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs text-white font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-[11px] text-neutral-400 ml-auto">
                        Subtotal: {formatCurrency(unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Checkout Button */}
        {items.length > 0 && (
          <div className="p-6 bg-[#121212] border-t border-[#1f1f1f] space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-400">Order Subtotal</span>
              <span className="font-serif text-lg font-medium text-white">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Taxes and insured courier delivery calculated during final checkout.
            </p>

            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#f4e996] transition-all shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2.5 text-xs text-neutral-400 hover:text-white uppercase tracking-wider text-center transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
