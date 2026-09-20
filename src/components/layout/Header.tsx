"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, User, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();

  // Hide on admin routes
  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  if (isAdminRoute) return null;

  const navLinks = [
    { name: "SHOP", href: "/shop" },
    { name: "COLLECTIONS", href: "/collections" },
    { name: "CUSTOM", href: "/custom" },
    { name: "BUSINESS", href: "/business" },
    { name: "CRAFT", href: "/craft" },
    { name: "ABOUT", href: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md border-b border-[#1f1f1f] shadow-lg shadow-black/40 py-3"
            : "bg-black/80 backdrop-blur-sm border-b border-white/10 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-white hover:text-[#d6be67] p-2 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Official Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden flex items-center justify-center">
              <Image
                src="/tesacol_logo.png"
                alt="Tesacola Empire Nigeria Crest"
                width={48}
                height={48}
                priority
                className="object-contain filter brightness-110 drop-shadow-[0_0_8px_rgba(214,190,103,0.3)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-medium tracking-[0.18em] text-white group-hover:text-[#d6be67] transition-colors uppercase">
                Tesacola
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#d6be67] font-light uppercase -mt-1">
                Empire Nigeria
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs tracking-[0.2em] font-medium transition-colors duration-200 py-1 relative ${
                    isActive
                      ? "text-[#d6be67]"
                      : "text-[#ededed] hover:text-[#d6be67]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#d6be67]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Utility Action Icons */}
          <div className="flex items-center space-x-5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-[#d6be67] transition-colors p-1"
              aria-label="Search catalogue"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account / User Portal */}
            <Link
              href="/account"
              className="text-white hover:text-[#d6be67] transition-colors p-1"
              aria-label="Customer Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Trigger with Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-white hover:text-[#d6be67] transition-colors p-1 relative"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#d6be67] text-black font-semibold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-[#1f1f1f] bg-black/95 px-4 py-4 max-w-7xl mx-auto flex items-center gap-3 animate-in fade-in slide-in-from-top duration-200">
            <Search className="w-5 h-5 text-[#d6be67]" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
                }
              }}
              className="flex-1 flex items-center"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search wholecut oxfords, briefcases, belts, leather goods..."
                className="w-full bg-transparent border-none text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-0"
                autoFocus
              />
              <button
                type="submit"
                className="text-xs uppercase tracking-widest text-[#d6be67] hover:underline px-3"
              >
                Search
              </button>
            </form>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm bg-black border-r border-[#1f1f1f] h-full flex flex-col z-10 px-6 py-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-[#1f1f1f]">
              <div className="flex items-center gap-2">
                <Image
                  src="/tesacol_logo.png"
                  alt="Tesacola"
                  width={36}
                  height={36}
                  className="object-contain"
                />
                <span className="font-serif text-lg text-white font-medium tracking-wider uppercase">
                  Tesacola
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-neutral-400 hover:text-white p-1"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col space-y-5 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium tracking-[0.2em] text-neutral-200 hover:text-[#d6be67] flex items-center justify-between group py-1"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-[#d6be67] group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>

            {/* Secondary links & Brand Sign-off */}
            <div className="mt-auto pt-6 border-t border-[#1f1f1f] space-y-4">
              <div className="flex flex-col space-y-2 text-xs text-neutral-400">
                <Link href="/account" className="hover:text-[#d6be67]">Customer Account</Link>
                <Link href="/faq" className="hover:text-[#d6be67]">Client Care & FAQs</Link>
                <Link href="/shipping" className="hover:text-[#d6be67]">Shipping & Delivery</Link>
                <Link href="/contact" className="hover:text-[#d6be67]">Contact Concierge</Link>
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] tracking-[0.2em] text-[#d6be67] uppercase font-serif">
                  Enjoying Trust & Quality
                </p>
                <p className="text-[10px] text-neutral-500 mt-1">
                  Tesacola Empire Nigeria
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
