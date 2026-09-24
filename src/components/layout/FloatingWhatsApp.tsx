"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Do not display on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const defaultMessage = encodeURIComponent(
    "Hello Tesacola Concierge, I would like to enquire about your footwear collection and bespoke atelier services."
  );
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Card */}
      {isOpen && (
        <div className="mb-3 w-72 bg-[#161b22] border border-[#d6be67]/30 rounded-lg shadow-2xl p-4 text-xs text-neutral-300 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#30363d]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-white tracking-wide text-[11px] uppercase">
                Atelier Concierge
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-0.5"
              aria-label="Close concierge preview"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-neutral-300 leading-relaxed font-light">
            Welcome to Tesacola Empire. Chat directly with our private fitting and bespoke advisory team.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium text-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Floating Trigger Button (Min 48px touch target) */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-[#161b22]/90 border border-[#30363d] text-[11px] text-neutral-300 shadow-lg backdrop-blur-sm">
            Chat with Concierge
          </span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-label="Chat on WhatsApp with Tesacola Atelier Concierge"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
