"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePublicProduct, usePublicProducts } from "@/hooks/api/usePublicProducts";
import ProductCard from "@/components/public/ProductCard";
import {
  ArrowLeft,
  Package,
  Tag,
  Building2,
  Ruler,
  ShoppingCart,
  Star,
  Phone,
  Mail,
  Share2,
  ChevronRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:5000";

function formatPrice(price: number | string | null | undefined) {
  if (!price) return null;
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return null;
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num);
}

function getStatusInfo(status: string) {
  const map: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
    active: {
      label: "Đang kinh doanh",
      icon: <CheckCircle size={14} />,
      cls: "bg-[rgba(113,136,111,0.14)] text-[var(--nv-sage-strong)]",
    },
    inactive: {
      label: "Tạm ngừng",
      icon: <AlertCircle size={14} />,
      cls: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
    },
    discontinued: {
      label: "Ngừng kinh doanh",
      icon: <XCircle size={14} />,
      cls: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    },
  };
  return map[status] || { label: status, icon: null, cls: "bg-gray-100 text-gray-700" };
}

function getTypeLabel(type: string) {
  const map: Record<string, string> = {
    raw_material: "Nguyên liệu thô",
    packaging: "Vật liệu bao bì",
    finished_product: "Thành phẩm",
    goods: "Hàng hóa thương mại",
  };
  return map[type] || type;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: product, isLoading, isError } = usePublicProduct(Number(id));
  const { data: related } = usePublicProducts({ limit: 4, status: "active" });
  const relatedProducts = (related?.data || []).filter((p) => p.id !== Number(id)).slice(0, 4);

  const imageUrl = product?.image
    ? product.image.startsWith("http")
      ? product.image
      : `${API_BASE}/${product.image}`
    : null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-[var(--nv-sage)]" />
          <p className="text-sm text-[var(--nv-muted)]">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5">
          <Package size={36} className="text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Không tìm thấy sản phẩm</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Sản phẩm không tồn tại hoặc đã bị xóa.</p>
        <Link
          href="/showcase"
          className="nv-primary-button rounded-2xl px-5 py-2.5 font-medium text-white transition-colors"
        >
          Quay lại trang sản phẩm
        </Link>
      </div>
    );
  }

  const statusInfo = getStatusInfo(product.status);
  const retailPrice = formatPrice(product.sellingPriceRetail);
  const wholesalePrice = formatPrice(product.sellingPriceWholesale);
  const purchasePrice = formatPrice(product.purchasePrice);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-[rgba(52,67,55,0.08)] bg-[rgba(255,255,255,0.64)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/showcase" className="transition-colors hover:text-[var(--nv-sage-strong)]">
              Sản phẩm
            </Link>
            <ChevronRight size={14} />
            {product.category && (
              <>
                <Link
                  href={`/showcase?category=${product.categoryId}`}
                  className="transition-colors hover:text-[var(--nv-sage-strong)]"
                >
                  {product.category.categoryName}
                </Link>
                <ChevronRight size={14} />
              </>
            )}
            <span className="text-slate-800 dark:text-slate-200 font-medium line-clamp-1">
              {product.productName}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-[32px] bg-gradient-to-br from-[#efe8dc] via-[#f7f2ea] to-[#dbe4d6] shadow-[0_24px_70px_rgba(21,31,26,0.12)]">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.productName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Package size={80} className="text-slate-300 dark:text-slate-600 mb-4" />
                  <p className="text-sm text-slate-400">Chưa có hình ảnh</p>
                </div>
              )}

              {/* Featured badge */}
              {product.isFeatured && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1.5 rounded-full bg-[rgba(192,155,108,0.9)] px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                    <Star size={12} className="fill-white" /> Nổi bật
                  </div>
                </div>
              )}
            </div>

            {/* Share/Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigator.share?.({ title: product.productName, url: window.location.href })}
                className="nv-outline-button flex items-center gap-2 rounded-2xl px-4 py-2 text-sm transition-all"
              >
                <Share2 size={15} /> Chia sẻ
              </button>
              <button
                onClick={() => router.back()}
                className="nv-outline-button flex items-center gap-2 rounded-2xl px-4 py-2 text-sm transition-all"
              >
                <ArrowLeft size={15} /> Quay lại
              </button>
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Type badge + Status */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[rgba(113,136,111,0.12)] px-3 py-1 text-xs font-semibold text-[var(--nv-sage-strong)]">
                {getTypeLabel(product.productType)}
              </span>
              <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.cls}`}>
                {statusInfo.icon}
                {statusInfo.label}
              </span>
            </div>

            {/* Name */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-snug">
                {product.productName}
              </h1>
              {product.description && (
                <p className="mt-3 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Pricing */}
            <div className="rounded-[28px] border border-[var(--nv-border)] bg-[linear-gradient(135deg,rgba(113,136,111,0.1),rgba(192,155,108,0.14))] p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--nv-muted)]">Giá bán</h3>
              <div className="space-y-2">
                {retailPrice ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--nv-muted)]">Giá lẻ</span>
                    <span className="text-2xl font-bold text-[var(--nv-sage-strong)]">{retailPrice}</span>
                  </div>
                ) : (
                  <p className="font-semibold text-[var(--nv-sage-strong)]">Liên hệ để báo giá</p>
                )}
                {wholesalePrice && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-500">Giá sỉ</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{wholesalePrice}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Specs */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Thông tin chi tiết</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Tag size={15} />, label: "Mã SKU", value: product.sku || "—" },
                  { icon: <Ruler size={15} />, label: "Đơn vị", value: product.unit?.unitName || product.unitId || "—" },
                  {
                    icon: <Building2 size={15} />,
                    label: "Nhà cung cấp",
                    value: (product as any).supplier?.supplierName || "—",
                  },
                  {
                    icon: <Tag size={15} />,
                    label: "Danh mục",
                    value: product.category?.categoryName || "—",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-2.5 rounded-2xl border border-[rgba(52,67,55,0.08)] bg-[rgba(255,255,255,0.72)] p-3"
                  >
                    <span className="mt-0.5 shrink-0 text-[var(--nv-sage)]">{item.icon}</span>
                    <div className="min-w-0">
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wide">{item.label}</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="tel:+84123456789"
                className="nv-primary-button flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 font-semibold text-white transition-all duration-300"
              >
                <Phone size={16} /> Gọi tư vấn ngay
              </a>
              <a
                href="mailto:info@namviet.vn"
                className="nv-outline-button flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 font-semibold transition-all duration-200"
              >
                <Mail size={16} /> Báo giá qua email
              </a>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200">
                <ShoppingCart size={20} className="text-[var(--nv-sage)]" />
                Sản phẩm liên quan
              </h2>
              <Link
                href="/showcase"
                className="flex items-center gap-1 text-sm text-[var(--nv-sage-strong)] hover:underline"
              >
                Xem tất cả <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
