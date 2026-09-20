"use client";

import React, { useState } from "react";
import { submitBusinessEnquiry } from "@/app/actions/commerce";
import { CheckCircle2, AlertCircle, Loader2, Building2 } from "lucide-react";

export function BusinessEnquiryForm({ initialType }: { initialType?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await submitBusinessEnquiry(formData);
    setIsSubmitting(false);

    if (res.success && res.referenceNumber) {
      setSuccessRef(res.referenceNumber);
      form.reset();
    } else {
      setErrorMsg(res.error || "Failed to submit commercial enquiry. Please check your inputs.");
    }
  };

  if (successRef) {
    return (
      <div className="p-8 sm:p-12 bg-[#0d0d0d] border border-[#d6be67]/30 text-center space-y-4 animate-in fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67]">
          Commercial Dossier Received
        </span>
        <h3 className="font-serif text-2xl text-white font-light">
          Your B2B Partnership Enquiry is Logged
        </h3>
        <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
          Reference: <strong className="text-[#d6be67]">{successRef}</strong>. Our Commercial Accounts Director will analyze your business profile and dispatch a preliminary capability brief and quotation framework within 24 hours.
        </p>
        <button
          onClick={() => setSuccessRef(null)}
          className="mt-4 px-6 py-2.5 bg-[#d6be67] text-black text-xs font-semibold uppercase tracking-widest hover:bg-[#f4e996]"
        >
          Submit Another Commercial Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-12 bg-[#0a0a0a] border border-[#1f1f1f] space-y-6">
      {errorMsg && (
        <div className="p-4 bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Contact Person Full Name *
          </label>
          <input
            type="text"
            name="contactName"
            required
            placeholder="e.g. Folake Bankole"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Registered Company / Entity Name *
          </label>
          <input
            type="text"
            name="businessName"
            required
            placeholder="e.g. Sovereign Retail Holdings Ltd"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Corporate Email Address *
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="procurement@sovereignretail.com"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Direct Corporate Phone / Mobile *
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="+234 803 123 4567"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Country of Operation *
          </label>
          <input
            type="text"
            name="country"
            required
            placeholder="Nigeria / Ghana / United Kingdom / United States"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Headquarter City *
          </label>
          <input
            type="text"
            name="city"
            required
            placeholder="Lagos / Accra / London / Atlanta"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Commercial Partnership Classification *
          </label>
          <select
            name="businessType"
            required
            defaultValue={initialType || "RETAILER"}
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white focus:outline-none"
          >
            <option value="RETAILER">Stockist / Boutique Retailer</option>
            <option value="WHOLESALER">Bulk Wholesaler / Distributor</option>
            <option value="MANUFACTURING">Contract Industrial Manufacturing</option>
            <option value="PRIVATE_LABEL">Private-Label Brand Line</option>
            <option value="CORPORATE">Corporate Gifting &amp; Executive Portfolios</option>
            <option value="INSTITUTION">Institutional / Uniform Procurement</option>
            <option value="INTERNATIONAL">Diaspora &amp; Export Partnership</option>
            <option value="RESELLER">Authorized Reseller</option>
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Corporate Website or Verified Social Profile
          </label>
          <input
            type="url"
            name="website"
            placeholder="https://yourbrand.com"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Product Line of Primary Interest *
          </label>
          <input
            type="text"
            name="productCategory"
            required
            placeholder="e.g. Executive Men's Footwear, Custom Leather Bags, Brass Belts"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Estimated Production Volume per Run *
          </label>
          <input
            type="text"
            name="estimatedQuantity"
            required
            placeholder="e.g. 50–100 pairs / 500 units / Ongoing quarterly runs"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Commercial Requirements, Branding Specifications &amp; Quality Thresholds *
          </label>
          <textarea
            name="customRequirements"
            rows={4}
            required
            placeholder="Detail your desired leather finish, custom logo embossment, packaging expectations, packaging barcodes, and delivery schedules..."
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Target Delivery Timeline / Milestone
          </label>
          <input
            type="text"
            name="timeline"
            placeholder="e.g. Q4 Festive Rollout / Within 60 Days"
            className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
            Technical Pack / Reference Files Link (Optional)
          </label>
          <input
            type="url"
            name="fileAttachmentUrl"
            placeholder="Cloud Storage Link (Drive, WeTransfer, OneDrive)"
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
              <span>Transmitting Commercial File...</span>
            </>
          ) : (
            <>
              <Building2 className="w-4 h-4" />
              <span>Transmit Commercial Enquiry</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
