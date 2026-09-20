"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatCurrency } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const freeShippingThreshold = 300000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping || subtotal === 0 ? 0 : 5000;
  const grandTotal = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#121212] border border-[#262626] flex items-center justify-center mx-auto text-neutral-500">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl font-light">Your Shopping Bag is Empty</h1>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            Discover our collection of handcrafted wholecut oxfords, artisanal loafers, and executive leather portfolios.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3.5 bg-[#d6be67] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#f4e996] transition-colors"
          >
            Explore Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-6 border-b border-[#1f1f1f]">
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-white">
            Shopping Bag ({itemCount} {itemCount === 1 ? "Piece" : "Pieces"})
          </h1>
          <p className="text-xs text-neutral-400 mt-2">
            Review your selected handcrafted creations prior to secure checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Items Table */}
          <div className="lg:col-span-8 space-y-6">
            {items.map((item) => {
              const unitPrice = item.product.price + (item.variant?.priceAdjustment || 0);
              const imageUrl = item.product.images?.[0]?.url || "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=400&q=80";

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-6 p-6 bg-[#0a0a0a] border border-[#1f1f1f] justify-between items-start sm:items-center"
                >
                  <div className="flex gap-4 items-center">
                    <div className="relative w-24 h-28 bg-[#141414] border border-[#262626] overflow-hidden flex-shrink-0">
                      <Image
                        src={imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#d6be67] uppercase tracking-wider block">
                        {item.product.sku}
                      </span>
                      <Link href={`/product/${item.product.slug}`}>
                        <h3 className="font-serif text-base text-white hover:text-[#d6be67] transition-colors font-medium">
                          {item.product.name}
                        </h3>
                      </Link>
                      {item.variant && (
                        <p className="text-xs text-neutral-400 mt-1">
                          {item.variant.size && `Size: ${item.variant.size}`}
                          {item.variant.colour && ` • Colour: ${item.variant.colour}`}
                        </p>
                      )}
                      <p className="text-sm text-[#d6be67] font-medium mt-1 font-serif">
                        {formatCurrency(unitPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-[#1f1f1f]">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-[#262626] bg-[#121212]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1.5 text-neutral-400 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 text-neutral-400 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-serif text-sm sm:text-base font-medium text-white">
                        {formatCurrency(unitPrice * item.quantity)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-neutral-500 hover:text-red-400 transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-4">
            <div className="p-8 bg-[#0a0a0a] border border-[#1f1f1f] space-y-6 sticky top-28">
              <h2 className="font-serif text-xl text-white font-light pb-4 border-b border-[#1f1f1f]">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span>Bag Subtotal</span>
                  <span className="font-medium text-white">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Insured Nationwide Delivery</span>
                  <span>
                    {isFreeShipping ? (
                      <span className="text-[#d6be67] font-medium">Complimentary</span>
                    ) : (
                      formatCurrency(shippingCost)
                    )}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#1f1f1f] flex justify-between text-sm">
                  <span className="text-white font-medium">Estimated Total</span>
                  <span className="font-serif text-lg text-[#d6be67] font-semibold">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/checkout"
                  className="w-full py-4 bg-[#d6be67] hover:bg-[#f4e996] text-black font-semibold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="pt-4 border-t border-[#1f1f1f] space-y-2 text-[11px] text-neutral-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#d6be67]" />
                  <span>100% Genuine Full-Grain Nigerian Leather Guarantee</span>
                </div>
                <p>
                  Secure server-side verified checkout. Orders are dispatched in custom rigid presentation boxes with cotton dust bags.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
