"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star, Tag, Package, Eye } from "lucide-react";
import type { Product } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:5000";

function formatPrice(price: number | string | null | undefined) {
  if (!price) return "Liên hệ";
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num);
}

function getProductTypeLabel(type: string) {
  const map: Record<string, string> = {
    raw_material: "Nguyên liệu",
    packaging: "Bao bì",
    finished_product: "Thành phẩm",
    goods: "Hàng hóa",
  };
  return map[type] || type;
}

function getProductTypeBadge(type: string) {
  const map: Record<string, string> = {
    raw_material: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    packaging: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400",
    finished_product: "bg-[rgba(113,136,111,0.14)] text-[var(--nv-sage-strong)]",
    goods: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400",
  };
  return map[type] || "bg-gray-100 text-gray-700";
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${API_BASE}/${product.image}`
    : null;

  const isActive = product.status === "active";

  return (
    <Link href={`/showcase/${product.id}`} className="group block">
      <div className="nv-soft-card relative overflow-hidden rounded-[28px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(32,48,40,0.12)]">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#ebe6db] via-[#f5f0e7] to-[#dbe5d6]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.productName}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Package size={48} className="text-slate-300 dark:text-slate-600" />
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick view on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="flex items-center gap-2 rounded-full bg-[rgba(255,248,240,0.92)] px-4 py-2 text-xs font-semibold text-[var(--nv-ink)] shadow-lg backdrop-blur-sm">
              <Eye size={14} />
              Xem chi tiết
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${getProductTypeBadge(product.productType)}`}>
              {getProductTypeLabel(product.productType)}
            </span>
            {!isActive && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400">
                Ngừng KD
              </span>
            )}
          </div>

          {/* Featured star */}
          {product.isFeatured && (
            <div className="absolute top-3 right-3">
              <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shadow-lg">
                <Star size={14} className="text-white fill-white" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          {product.category && (
            <div className="flex items-center gap-1 mb-2">
              <Tag size={11} className="text-[var(--nv-gold)]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--nv-sage)]">
                {product.category.categoryName}
              </span>
            </div>
          )}

          {/* Name */}
          <h3 className="mb-3 text-sm font-semibold leading-snug text-[var(--nv-ink)] transition-colors duration-200 line-clamp-2 group-hover:text-[var(--nv-sage-strong)]">
            {product.productName}
          </h3>

          {/* Price */}
          <div className="flex items-end justify-between">
            <div>
              {product.sellingPriceRetail ? (
                <div>
                  <p className="mb-0.5 text-xs text-[var(--nv-muted)]">Giá bán lẻ</p>
                  <p className="text-base font-bold text-[var(--nv-sage-strong)]">
                    {formatPrice(product.sellingPriceRetail)}
                  </p>
                </div>
              ) : (
                <p className="text-base font-semibold text-[var(--nv-muted)]">Liên hệ báo giá</p>
              )}
            </div>
            <div className="nv-icon-badge rounded-2xl p-2.5 transition-all duration-300 group-hover:bg-[var(--nv-sage-strong)] group-hover:text-white">
              <ShoppingCart size={16} />
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="nv-accent-line h-0.5 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
      </div>
    </Link>
  );
}
