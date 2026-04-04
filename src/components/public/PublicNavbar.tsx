"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingBag, Users, Search, Menu, X, ChevronRight } from "lucide-react";

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
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5"
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
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-lime-600 bg-clip-text text-transparent">
                Nam Việt
              </span>
              <span className="block text-[10px] text-slate-500 -mt-1 font-medium tracking-wide">
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-green-600 hover:bg-emerald-50 transition-all duration-200"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search + Actions */}
          <div className="flex items-center gap-2">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 w-52 group focus-within:ring-2 focus-within:ring-lime-400/30 transition-all">
              <Search size={14} className="text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm..."
                className="bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none w-full"
              />
            </div>

            {/* Admin Login */}
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-lime-500 to-green-500 text-white text-sm font-medium hover:from-lime-600 hover:to-green-600 shadow-lg shadow-lime-500/30 hover:shadow-lime-500/50 transition-all duration-300"
            >
              Đăng nhập
              <ChevronRight size={14} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-all"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-green-600 transition-all"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-200">
            <Link
              href="/login"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-lime-500 to-green-500 text-white text-sm font-medium"
            >
              Đăng nhập Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
