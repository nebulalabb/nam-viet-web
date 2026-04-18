"use client";

import Link from "next/link";
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Youtube, Globe } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="mt-10 border-t border-white/10 bg-[#24342d] text-[#f2e9dd]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] shadow-sm backdrop-blur">
                <ShoppingBag size={20} className="text-[#f1dfc5]" />
              </div>
              <div>
                <span className="block text-lg font-bold leading-tight text-white">Nam Việt</span>
                <span className="text-xs text-[#c8d6c4]">Sản xuất & Thương mại</span>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-[#d8d1c5]">
              Chuyên cung cấp các sản phẩm chất lượng cao, đáp ứng nhu cầu sản xuất và thương mại trong nước và quốc tế.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: <Facebook size={18} />, label: "Facebook", href: "#" },
                { icon: <Youtube size={18} />, label: "Youtube", href: "#" },
                { icon: <Globe size={18} />, label: "Website", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] text-[#f0e2cc] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.14] hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#f0e2cc]">Khám phá</h3>
            <ul className="space-y-3">
              {[
                { href: "/showcase", label: "Tất cả sản phẩm" },
                { href: "/showcase?type=goods", label: "Hàng hóa" },
                { href: "/showcase?type=finished_product", label: "Thành phẩm" },
                { href: "/community", label: "Tin tức & Blog" },
                { href: "/community?type=video", label: "Video" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-[#d8d1c5] transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#c09b6c] opacity-0 transition-opacity group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#f0e2cc]">Công ty</h3>
            <ul className="space-y-3">
              {[
                { href: "#", label: "Về chúng tôi" },
                { href: "#", label: "Lịch sử hình thành" },
                { href: "#", label: "Chứng nhận chất lượng" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-[#d8d1c5] transition-colors duration-200 hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#c09b6c] opacity-0 transition-opacity group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#f0e2cc]">Liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#c09b6c]" />
                <span className="text-sm text-[#d8d1c5]">
                  123 Đường Nam Việt, Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-[#c09b6c]" />
                <a href="tel:+84123456789" className="text-sm text-[#d8d1c5] transition-colors hover:text-white">
                  +84 (0) 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-[#c09b6c]" />
                <a href="mailto:info@namviet.vn" className="text-sm text-[#d8d1c5] transition-colors hover:text-white">
                  info@namviet.vn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#bfc6bc]">
            © {new Date().getFullYear()} Nam Việt. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-[#bfc6bc] transition-colors hover:text-white">Chính sách bảo mật</Link>
            <Link href="#" className="text-xs text-[#bfc6bc] transition-colors hover:text-white">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
