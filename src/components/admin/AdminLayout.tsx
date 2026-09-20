"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Briefcase,
  Sparkles,
  BookOpen,
  HelpCircle,
  FolderTree,
  ShieldAlert,
  LogOut,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { logoutAction } from "@/app/actions/auth";

interface AdminLayoutProps {
  children: React.ReactNode;
  userEmail?: string;
  userRole?: string;
}

export function AdminLayout({ children, userEmail, userRole }: AdminLayoutProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products & Inventory", href: "/admin/products", icon: Package },
    { name: "Orders & Fulfillment", href: "/admin/orders", icon: ShoppingBag },
    { name: "Custom Enquiries", href: "/admin/custom-enquiries", icon: Sparkles },
    { name: "Business & B2B Leads", href: "/admin/business-enquiries", icon: Briefcase },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
    { name: "Audit Trail", href: "/admin/audit-logs", icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-neutral-200 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#161b22] border-r border-[#30363d] flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/tesacol_logo.png"
                alt="Tesacola"
                width={32}
                height={32}
                className="object-contain filter brightness-110"
              />
              <div>
                <span className="font-semibold text-sm text-white tracking-wide block">
                  TESACOLA
                </span>
                <span className="text-[10px] text-[#d6be67] tracking-wider uppercase font-medium">
                  Control Console
                </span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-[#21262d] text-[#d6be67] font-semibold"
                      : "text-neutral-400 hover:text-white hover:bg-[#1f242c]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#d6be67]" : "text-neutral-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Status & Sign Out */}
        <div className="p-4 border-t border-[#30363d] space-y-3">
          <div className="px-1 text-xs">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Logged In As</span>
            <p className="font-medium text-white truncate text-xs">{userEmail || "admin@tesacola.com"}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#238636]/20 text-[#3fb950] border border-[#238636]/40">
              {userRole || "ADMIN"}
            </span>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <Link
              href="/"
              target="_blank"
              className="text-neutral-400 hover:text-white flex items-center gap-1"
            >
              <span>View Store</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className="text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-14 bg-[#161b22] border-b border-[#30363d] px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
            <span className="text-white capitalize">
              {pathname?.split("/")[2] || "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-[11px] text-neutral-400">Serverless Neon Gateway: Active</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </header>

        {/* Inner Page View */}
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
