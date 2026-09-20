"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginAction } from "@/app/actions/auth";
import { Lock, Mail, Loader2, AlertCircle, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);

    setIsSubmitting(false);

    if (res.success && res.role !== "CUSTOMER") {
      router.push("/admin/dashboard");
      router.refresh();
    } else if (res.success && res.role === "CUSTOMER") {
      setErrorMessage("Access Denied: Customer accounts cannot access the administrative portal.");
    } else {
      setErrorMessage(res.error || "Invalid administrator credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Brand Crest */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-3">
            <Image
              src="/tesacol_logo.png"
              alt="Tesacola"
              width={56}
              height={56}
              className="object-contain filter brightness-110"
            />
          </div>
          <h1 className="font-serif text-2xl font-light text-white tracking-wide">
            TESACOLA EMPIRE
          </h1>
          <p className="text-xs text-[#d6be67] tracking-widest uppercase mt-1">
            Administrative Control Console
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-3 rounded">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="bg-[#161b22] border border-[#30363d] p-8 rounded-lg shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  defaultValue="admin@tesacola.com"
                  placeholder="admin@tesacola.com"
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#d6be67] pl-10 pr-3 py-2.5 text-xs text-white placeholder-neutral-600 rounded focus:outline-none"
                />
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                Security Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  defaultValue="TesacolaAdmin2026!"
                  placeholder="••••••••••••"
                  className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#d6be67] pl-10 pr-3 py-2.5 text-xs text-white placeholder-neutral-600 rounded focus:outline-none"
                />
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#238636] hover:bg-[#2ea043] text-white font-medium text-xs tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authorizing Session...</span>
                  </>
                ) : (
                  <span>Authenticate &amp; Enter Console</span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-[#30363d] text-[11px] text-neutral-500 text-center">
            Development Master Credentials: <code className="text-neutral-400">admin@tesacola.com</code>
          </div>
        </div>
      </div>
    </div>
  );
}
