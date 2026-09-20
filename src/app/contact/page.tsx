"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    // Simulate safe server action submission
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-black min-h-screen text-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 pb-8 border-b border-[#1f1f1f]">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#d6be67] font-light block mb-2">
            Private Client Desk
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            Concierge &amp; Workshop Contact
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            Reach out directly to our private client advisory, commercial manufacturing liaison, or bespoke fitting consultants.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-[#0a0a0a] border border-[#1f1f1f] space-y-6">
              <h2 className="font-serif text-xl text-white font-medium pb-3 border-b border-[#1f1f1f]">
                Atelier Headquarters
              </h2>

              <div className="space-y-5 text-xs text-neutral-300 font-light">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#d6be67] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Manufacturing &amp; Showroom Hub</strong>
                    <span>Lagos State, Federal Republic of Nigeria</span>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">Visits strictly by scheduled appointment</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#d6be67] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Direct Correspondence</strong>
                    <span>concierge@tesacola.com</span>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">Commercial: b2b@tesacola.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#d6be67] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">WhatsApp &amp; Telephone Hotline</strong>
                    <span>+234 800 TESACOLA</span>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">+234 (0) 801 234 5678</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#d6be67] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Workshop Working Hours</strong>
                    <span>Monday – Friday: 08:30 – 18:00 WAT</span>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">Saturday: 10:00 – 15:00 WAT (Private Fittings)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#0d0d0d] border border-[#d6be67]/20">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d6be67] block mb-1">
                Enjoying Trust &amp; Quality
              </span>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                All client consultations are treated with strict commercial confidentiality.
              </p>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="p-8 sm:p-12 bg-[#0a0a0a] border border-[#d6be67]/30 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-white font-light">
                  Message Dispatched to Concierge
                </h3>
                <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. A dedicated Tesacola client advisor will review your message and respond within one business day.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#d6be67] text-black text-xs font-semibold uppercase tracking-widest hover:bg-[#f4e996]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 sm:p-12 bg-[#0a0a0a] border border-[#1f1f1f] space-y-6">
                <h2 className="font-serif text-xl text-white font-medium pb-3 border-b border-[#1f1f1f]">
                  Send a Direct Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amina Danjuma"
                      className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="amina@example.com"
                      className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      Subject Matter *
                    </label>
                    <select
                      required
                      className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white focus:outline-none"
                    >
                      <option value="GENERAL">General Product &amp; Sizing Inquiry</option>
                      <option value="BESPOKE">Custom / Bespoke Commission</option>
                      <option value="COMMERCIAL">Commercial B2B / Manufacturing</option>
                      <option value="ORDER">Existing Client Order Assistance</option>
                      <option value="PRESS">Press &amp; Editorial Media</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                      Detailed Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="How may the Tesacola atelier assist you today?..."
                      className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] p-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#d6be67] hover:bg-[#f4e996] text-black font-semibold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
