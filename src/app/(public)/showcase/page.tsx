"use client";

import { useState, useEffect } from "react";
import { usePublicProducts } from "@/hooks/api/usePublicProducts";
import ProductCard from "@/components/public/ProductCard";
import {
  Search,
  SlidersHorizontal,
  Package,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Grid3x3,
  List,
  X,
  Loader2,
} from "lucide-react";
import Link from "next/link";

const PRODUCT_TYPES = [
  { value: "", label: "Tất cả", emoji: "🛍️" },
  { value: "goods", label: "Hàng hóa", emoji: "📦" },
  { value: "finished_product", label: "Thành phẩm", emoji: "✨" },
  { value: "raw_material", label: "Nguyên liệu", emoji: "🌿" },
  { value: "packaging", label: "Bao bì", emoji: "🎁" },
];

const SORT_OPTIONS = [
  { value: "createdAt_desc", label: "Mới nhất" },
  { value: "productName_asc", label: "Tên A → Z" },
  { value: "productName_desc", label: "Tên Z → A" },
  { value: "sellingPriceRetail_asc", label: "Giá tăng dần" },
  { value: "sellingPriceRetail_desc", label: "Giá giảm dần" },
];

export default function ShowcasePage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [productType, setProductType] = useState("");
  const [sort, setSort] = useState("createdAt_desc");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const LIMIT = 12;

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { setPage(1); }, [debouncedSearch, productType, sort]);

  const [sortField, sortOrder] = sort.split("_");

  const { data: productsResponse, isLoading, isFetching } = usePublicProducts({
    page,
    limit: LIMIT,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(productType && { productType: productType as any }),
    sortBy: sortField,
    sortOrder: sortOrder as "asc" | "desc",
    status: "active",
  });

  const products = productsResponse?.data || [];
  const meta = productsResponse?.meta;
  const totalPages = meta?.totalPages || 1;

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="nv-hero pt-24 pb-28">
        {/* Background orbs */}
        <div className="absolute left-[14%] top-10 h-96 w-96 rounded-full bg-[rgba(201,214,192,0.16)] blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-[16%] h-80 w-80 rounded-full bg-[rgba(192,155,108,0.14)] blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.07)] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="nv-soft-badge mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Sparkles size={14} className="animate-spin [animation-duration:3s]" />
            Danh mục sản phẩm Nam Việt
          </div>

          <h1 className="mb-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Sản phẩm{" "}
            <span className="bg-gradient-to-r from-[#f4ead9] via-[#d8e3d4] to-[#c6a173] bg-clip-text text-transparent">
              chất lượng cao
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[#d6dbd2]">
            Khám phá bộ sưu tập đa dạng từ nguyên liệu, bao bì đến thành phẩm – đáp ứng mọi nhu cầu sản xuất và thương mại.
          </p>

          {/* Search Hero */}
          <div className="max-w-2xl mx-auto">
            <div className="nv-hero-panel flex items-center gap-3 rounded-[28px] p-2 backdrop-blur-xl">
              <Search size={20} className="ml-3 shrink-0 text-[#d1d8cf]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="flex-1 bg-transparent py-1 text-base text-white outline-none placeholder:text-[#c7cfca]"
                id="showcase-search"
              />
              {search && (
                <button onClick={() => setSearch("")} className="p-1 text-[#c7cfca] transition-colors hover:text-white">
                  <X size={16} />
                </button>
              )}
              <button className="nv-primary-button shrink-0 rounded-2xl px-5 py-2.5 text-sm font-medium text-white transition-all duration-200">
                Tìm kiếm
              </button>
            </div>
          </div>

          {/* Quick type filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {PRODUCT_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setProductType(t.value)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  productType === t.value
                    ? "nv-filter-pill-active"
                    : "nv-filter-pill hover:bg-white/[0.14] hover:text-white"
                }`}
              >
                <span>{t.emoji}</span> {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="nv-soft-card mx-auto max-w-7xl rounded-[28px] px-6 py-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-[var(--nv-muted)]">
              <Package size={16} className="text-[var(--nv-gold)]" />
              <span>
                <strong className="text-[var(--nv-ink)]">{meta?.total || 0}</strong> sản phẩm
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--nv-muted)]">
              <TrendingUp size={16} className="text-[var(--nv-sage)]" />
              <span>Cập nhật liên tục</span>
            </div>

            {/* Spacer */}
            <div className="ml-auto flex items-center gap-3">
              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-[var(--nv-border)] bg-[rgba(255,255,255,0.88)] px-3 py-2 text-sm text-[var(--nv-ink)] outline-none focus:ring-4 focus:ring-[rgba(113,136,111,0.12)]"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>

              {/* View mode */}
              <div className="flex items-center overflow-hidden rounded-xl border border-[var(--nv-border)] bg-white/80">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-all ${viewMode === "grid" ? "bg-[var(--nv-sage-strong)] text-white" : "text-[var(--nv-muted)] hover:bg-[rgba(113,136,111,0.08)]"}`}
                >
                  <Grid3x3 size={15} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-all ${viewMode === "list" ? "bg-[var(--nv-sage-strong)] text-white" : "text-[var(--nv-muted)] hover:bg-[rgba(113,136,111,0.08)]"}`}
                >
                  <List size={15} />
                </button>
              </div>

              {/* Filters toggle on mobile */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 rounded-xl border border-[var(--nv-border)] px-3 py-2 text-sm text-[var(--nv-muted)] transition-all hover:bg-white/80 lg:hidden"
              >
                <SlidersHorizontal size={14} /> Lọc
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Loading state */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-28">
            <Loader2 size={40} className="mb-4 animate-spin text-[var(--nv-sage)]" />
            <p className="text-sm text-[var(--nv-muted)]">Đang tải sản phẩm...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-5">
              <Package size={36} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm sản phẩm phù hợp.
            </p>
            {(search || productType) && (
              <button
                onClick={() => { setSearch(""); setProductType(""); }}
                className="nv-primary-button rounded-2xl px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className={`grid gap-6 ${
              isFetching ? "opacity-60 pointer-events-none" : ""
            } ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2"
            } transition-opacity duration-200`}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="nv-outline-button flex items-center gap-1.5 rounded-2xl px-4 py-2 text-sm font-medium text-[var(--nv-muted)] transition-all disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} /> Trước
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                    .map((p, idx, arr) => (
                      <div key={p} className="flex">
                        {idx > 0 && arr[idx - 1] !== p - 1 && (
                          <span key={`dot-${p}`} className="px-1 text-slate-400">…</span>
                        )}
                        <button
                          onClick={() => setPage(p)}
                          className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                            p === page
                              ? "nv-primary-button text-white"
                              : "text-[var(--nv-muted)] hover:bg-white/70 hover:text-[var(--nv-sage-strong)]"
                          }`}
                        >
                          {p}
                        </button>
                      </div>
                    ))}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="nv-outline-button flex items-center gap-1.5 rounded-2xl px-4 py-2 text-sm font-medium text-[var(--nv-muted)] transition-all disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Sau <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── CTA ── */}
      <section className="px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="nv-hero mx-auto max-w-7xl rounded-[36px] px-6 py-16 text-center shadow-[0_28px_80px_rgba(19,29,24,0.18)]">
          <h2 className="text-3xl font-bold text-white mb-4">Cần tư vấn sản phẩm?</h2>
          <p className="mb-8 text-[#d6dbd2]">
            Đội ngũ của chúng tôi sẵn sàng hỗ trợ bạn tìm sản phẩm phù hợp nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/community"
              className="nv-secondary-button rounded-2xl px-6 py-3 font-medium transition-all"
            >
              Đọc tin tức & Blog
            </Link>
            <a
              href="mailto:info@namviet.vn"
              className="nv-outline-button rounded-2xl px-6 py-3 font-semibold transition-all"
            >
              Liên hệ ngay
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
