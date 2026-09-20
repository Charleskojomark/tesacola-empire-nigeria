"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginAction, registerAction } from "@/app/actions/auth";
import { ShieldCheck, Lock, Mail, User as UserIcon, Phone, Loader2, AlertCircle } from "lucide-react";

export default function AccountLoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const res = isRegister ? await registerAction(formData) : await loginAction(formData);

    setIsSubmitting(false);

    if (res.success && res.redirectTo) {
      router.push(res.redirectTo);
      router.refresh();
    } else {
      setErrorMessage(res.error || "Authentication failed. Please check credentials.");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white pt-32 pb-24 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        {/* Brand Crest */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-3">
            <Image
              src="/tesacol_logo.png"
              alt="Tesacola"
              width={48}
              height={48}
              className="object-contain filter brightness-110"
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#d6be67] font-light">
            Enjoying Trust &amp; Quality
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-white mt-1">
            {isRegister ? "Create Client Account" : "Private Client Login"}
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            {isRegister
              ? "Access order tracking, bespoke consultations, and saved sizing profiles."
              : "Sign in to manage orders, bespoke requests, and private consultations."}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Container */}
        <div className="p-8 bg-[#0a0a0a] border border-[#1f1f1f] shadow-2xl">
          <form onSubmit={handleAuth} className="space-y-4">
            {isRegister && (
              <>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Demilade Adeleke"
                      className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] pl-10 pr-3 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    />
                    <UserIcon className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+234 801 234 5678"
                      className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] pl-10 pr-3 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    />
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="client@example.com"
                  className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] pl-10 pr-3 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                />
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-[#121212] border border-[#262626] focus:border-[#d6be67] pl-10 pr-3 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none"
                />
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#d6be67] hover:bg-[#f4e996] text-black font-semibold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>{isRegister ? "Register Account" : "Access Account"}</span>
                )}
              </button>
            </div>
          </form>

          {/* Toggle Register / Login */}
          <div className="mt-6 pt-6 border-t border-[#1f1f1f] text-center">
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setErrorMessage(null);
              }}
              className="text-xs text-neutral-400 hover:text-[#d6be67] transition-colors"
            >
              {isRegister
                ? "Already hold a registered account? Sign In"
                : "New client? Create a private client profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
