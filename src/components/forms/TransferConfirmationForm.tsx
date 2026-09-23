"use client";

import React, { useState } from "react";
import { submitBankTransferProof } from "@/app/actions/commerce";
import { CheckCircle2, Copy, Check, Send, Loader2 } from "lucide-react";

interface TransferConfirmationFormProps {
  orderId: string;
  orderNumber: string;
  accountNumber: string;
  amount: number;
}

export function TransferConfirmationForm({
  orderId,
  orderNumber,
  accountNumber,
  amount,
}: TransferConfirmationFormProps) {
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [bankReference, setBankReference] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: "account" | "ref") => {
    navigator.clipboard.writeText(text);
    if (type === "account") {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } else {
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim()) {
      setError("Please enter the account name used for the transfer.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const res = await submitBankTransferProof({
      orderId,
      senderName,
      bankReference,
    });

    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
    } else {
      setError(res.error || "Failed to submit transfer confirmation. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Copy Helper Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          onClick={() => copyToClipboard(accountNumber, "account")}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] text-xs text-neutral-300 transition-colors"
        >
          {copiedAccount ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#d6be67]" />}
          <span>{copiedAccount ? "Account Copied" : "Copy Account Number"}</span>
        </button>

        <button
          type="button"
          onClick={() => copyToClipboard(orderNumber, "ref")}
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#141414] hover:bg-[#1f1f1f] border border-[#2a2a2a] text-xs text-neutral-300 transition-colors"
        >
          {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#d6be67]" />}
          <span>{copiedRef ? "Reference Copied" : "Copy Order Reference"}</span>
        </button>
      </div>

      {/* Confirmation Form */}
      <div className="p-6 bg-[#0f0f0f] border border-[#1f1f1f] rounded-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-3">
          <span className="font-serif text-sm text-white font-medium">
            Confirm Your Bank Transfer
          </span>
          <span className="text-[10px] text-[#d6be67] uppercase tracking-wider">
            Fast Workshop Verification
          </span>
        </div>

        {isSubmitted ? (
          <div className="p-4 bg-emerald-950/40 border border-emerald-800 text-emerald-200 text-xs rounded space-y-1">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Transfer Details Recorded</span>
            </div>
            <p className="text-[11px] text-neutral-300 font-light">
              Thank you. Our workshop accountants will match your payment from <strong>{senderName}</strong> with Order <strong>{orderNumber}</strong>. You will receive an update once verified.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Have you initiated the transfer? Provide your account name below so our team can match and confirm your order promptly.
            </p>

            {error && (
              <p className="text-xs text-red-400 bg-red-950/50 p-2 border border-red-900 rounded">
                {error}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                  Sender Account Name *
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Babatunde Adeyemi"
                  className="w-full bg-[#161616] border border-[#2a2a2a] focus:border-[#d6be67] p-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                  Bank / Transaction Ref (Optional)
                </label>
                <input
                  type="text"
                  value={bankReference}
                  onChange={(e) => setBankReference(e.target.value)}
                  placeholder="e.g. GTB/TRF/982341 or Bank Name"
                  className="w-full bg-[#161616] border border-[#2a2a2a] focus:border-[#d6be67] p-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#d6be67] hover:bg-[#f4e996] disabled:opacity-50 text-black font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>I Have Completed This Transfer</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
