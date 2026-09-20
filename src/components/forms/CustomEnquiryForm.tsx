"use client";

import React, { useState } from "react";
import { submitCustomEnquiry } from "@/app/actions/commerce";
import { CheckCircle2, AlertCircle, Loader2, Sparkles, Upload } from "lucide-react";

export function CustomEnquiryForm({ initialCategory, initialProduct }: { initialCategory?: string; initialProduct?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await submitCustomEnquiry(formData);
    setIsSubmitting(false);

    if (res.success && res.referenceNumber) {
      setSuccessReference(res.referenceNumber);
      form.reset();
    } else {
      setErrorMessage(res.error || "Failed to submit custom project enquiry. Please check your inputs.");
    }
  };

  if (successReference) {
    return (
      <div className="p-8 sm:p-12 bg-[#0d0d0d] border border-[#d6be67]/30 text-center space-y-4 animate-in fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67]">
          Bespoke Commission Received
        </span>
        <h3 className="font-serif text-2xl text-white font-light">
          Your Project Dossier Has Been Registered
        </h3>
        <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
          Reference: <strong className="text-[#d6be67]">{successReference}</strong>. Our Master Craftsman and Bespoke Concierge will review your specifications and contact you within 24–48 hours to discuss material availability, lasting profiles, and production timelines.
        </p>
        <button
          onClick={() => setSuccessReference(null)}
          className="mt-4 px-6 py-2.5 bg-[#d6be67] text-black text-xs font-semibold uppercase tracking-widest hover:bg-[#f4e996]"
        >
          Submit Another Commission
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-12 bg-[#0a0a0a] border border-[#1f1f1f] space-y-6">
      {errorMessage && (
        <div className="p-4 bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="customerName"
            required
            placeholder="e.g. Chief Oladipo Mensah"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="oladipo@example.com"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Phone / WhatsApp Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="+234 802 345 6789"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Current Location / City &amp; Country *
          </label>
          <input
            type="text"
            name="location"
            required
            placeholder="Lagos, Nigeria / London, UK / Houston, USA"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Product Category *
          </label>
          <select
            name="category"
            required
            defaultValue={initialCategory || "FOOTWEAR"}
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white focus:outline-none"
          >
            <option value="FOOTWEAR">Custom Footwear (Oxfords, Loafers, Boots)</option>
            <option value="BAGS">Custom Bags (Briefcases, Portfolios, Totes)</option>
            <option value="BELTS">Custom Belts &amp; Hardware</option>
            <option value="LEATHER_GOODS">Small Leather Goods &amp; Desk Accessories</option>
            <option value="CORPORATE">Corporate Custom Gift Sets</option>
            <option value="SPECIAL_PROJECTS">Special Architectural / Bespoke Projects</option>
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Quantity Required *
          </label>
          <input
            type="number"
            name="quantity"
            min={1}
            defaultValue={1}
            required
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Preferred Material, Leather Texture &amp; Colour Palette
          </label>
          <input
            type="text"
            name="colourMaterial"
            defaultValue={initialProduct ? `Inspired by ${initialProduct}` : ""}
            placeholder="e.g. Full-grain black box calfskin with antique brass accents and wine lining"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Detailed Project Specifications &amp; Lasting Requirements *
          </label>
          <textarea
            name="specifications"
            rows={4}
            required
            placeholder="Describe your desired silhouette, heel height, sole welt type, anatomical width requirements, or custom initials/monogramming..."
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Target Completion / Occasion Date
          </label>
          <input
            type="date"
            name="requiredDate"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Reference Image / Sketch Link (Optional)
          </label>
          <input
            type="url"
            name="fileAttachmentUrl"
            placeholder="Dropbox, Google Drive, or Cloud Image URL"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-10 py-4 bg-[#d6be67] hover:bg-[#f4e996] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Project Dossier...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Submit Bespoke Commission</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
