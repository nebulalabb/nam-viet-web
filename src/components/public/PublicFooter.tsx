"use client";

import Link from "next/link";
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Youtube, Globe } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shadow-sm border border-green-100">
                <ShoppingBag size={20} className="text-green-600" />
              </div>
              <div>
                <span className="block text-green-800 font-bold text-lg leading-tight">Nam Việt</span>
                <span className="text-xs text-green-600">Sản xuất & Thương mại</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
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
                  className="w-9 h-9 rounded-lg bg-green-50 hover:bg-green-100 flex items-center justify-center text-green-700 hover:text-green-900 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-green-800 font-semibold mb-5 text-sm uppercase tracking-wider">Khám phá</h3>
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
                    className="text-sm text-gray-600 hover:text-green-700 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-green-800 font-semibold mb-5 text-sm uppercase tracking-wider">Công ty</h3>
            <ul className="space-y-3">
              {[
                { href: "#", label: "Về chúng tôi" },
                { href: "#", label: "Lịch sử hình thành" },
                { href: "#", label: "Chứng nhận chất lượng" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-green-700 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-green-800 font-semibold mb-5 text-sm uppercase tracking-wider">Liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-green-600 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-600">
                  123 Đường Nam Việt, Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-green-600 shrink-0" />
                <a href="tel:+84123456789" className="text-sm text-gray-600 hover:text-green-700 transition-colors">
                  +84 (0) 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-green-600 shrink-0" />
                <a href="mailto:info@namviet.vn" className="text-sm text-gray-600 hover:text-green-700 transition-colors">
                  info@namviet.vn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Nam Việt. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-gray-500 hover:text-green-700 transition-colors">Chính sách bảo mật</Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-green-700 transition-colors">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
