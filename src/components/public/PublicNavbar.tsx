"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingBag, Users, Search, Menu, X } from "lucide-react";

export default function PublicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/showcase", label: "Sản phẩm", icon: <ShoppingBag size={16} /> },
    { href: "/community", label: "Cộng đồng", icon: <Users size={16} /> },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "border-b border-[rgba(52,67,55,0.08)] bg-[rgba(247,243,235,0.84)] backdrop-blur-2xl shadow-[0_18px_45px_rgba(15,23,18,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/showcase" className="flex items-center gap-3 group">
            <Image 
              src="/images/logo/logo-nobackground.png" 
              alt="Nam Việt Logo" 
              width={40} 
              height={40} 
              className="object-contain drop-shadow-md group-hover:scale-105 transition-transform" 
            />
            <div className="hidden sm:block">
              <span className="text-lg font-bold bg-gradient-to-r from-[var(--nv-sage-strong)] via-[var(--nv-sage)] to-[var(--nv-gold)] bg-clip-text text-transparent">
                Nam Việt
              </span>
              <span className="block text-[10px] text-[var(--nv-muted)] -mt-1 font-medium tracking-[0.22em] uppercase">
                Sản xuất & Thương mại
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-[var(--nv-muted)] transition-all duration-200 hover:bg-[rgba(255,255,255,0.7)] hover:text-[var(--nv-sage-strong)]"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search + Actions */}
          <div className="flex items-center gap-2">
            {/* Search Bar */}
            <div className="hidden lg:flex w-56 items-center gap-2 rounded-full border border-[var(--nv-border)] bg-[rgba(255,255,255,0.72)] px-3.5 py-2 shadow-[0_10px_30px_rgba(27,39,33,0.05)] transition-all focus-within:border-[rgba(80,102,82,0.22)] focus-within:ring-4 focus-within:ring-[rgba(113,136,111,0.12)]">
              <Search size={14} className="shrink-0 text-[var(--nv-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm..."
                className="w-full bg-transparent text-sm text-[var(--nv-ink)] placeholder:text-[var(--nv-muted)] outline-none"
              />
            </div>

            {/* Login button removed as per user request */}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="rounded-full p-2 text-[var(--nv-muted)] transition-all hover:bg-[rgba(255,255,255,0.72)] md:hidden"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="border-t border-[rgba(52,67,55,0.08)] bg-[rgba(247,243,235,0.96)] px-4 py-4 shadow-[0_20px_40px_rgba(18,24,20,0.08)] backdrop-blur-2xl md:hidden">
          <div className="space-y-2 rounded-[24px] border border-[var(--nv-border)] bg-[rgba(255,255,255,0.74)] p-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-medium text-[var(--nv-ink)] transition-all hover:bg-[rgba(113,136,111,0.08)] hover:text-[var(--nv-sage-strong)]"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          </div>
          {/* Login section removed */}
        </div>
      )}
    </nav>
  );
}
