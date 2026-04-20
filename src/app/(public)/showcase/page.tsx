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
  Box,
  Sprout,
  Gift,
  ArrowUpDown,
  ChevronDown,
  MapPin,
  Phone,
  Globe,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const PRODUCT_TYPES = [
  { value: "", label: "Tất cả", icon: <Grid3x3 size={18} /> },
  { value: "goods", label: "Hàng hóa", icon: <Package size={18} /> },
  { value: "finished_product", label: "Thành phẩm", icon: <Box size={18} /> },
  { value: "raw_material", label: "Nguyên liệu", icon: <Sprout size={18} /> },
  { value: "packaging", label: "Bao bì", icon: <Gift size={18} /> },
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
  const [isSortOpen, setIsSortOpen] = useState(false);
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
      <section className="relative pt-36 pb-20 overflow-hidden min-h-[420px] flex items-center mt-[-80px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero/rice-fields.png"
            alt="Cánh đồng lúa Nam Việt"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Layered overlays for depth - refined for transparent header */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/10 to-white" />
          <div className="absolute inset-0 bg-emerald-900/5 backdrop-blur-[0.5px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* Localized glow behind text to lift it from image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/20 blur-[120px] -z-1" />
          
          <h1 className="text-4xl md:text-7xl font-semibold text-slate-950 mb-8 tracking-wide leading-[1.1] drop-shadow-[0_4px_24px_rgba(255,255,255,1)] font-cormorant">
            Giải pháp sản phẩm<br /> 
            <span className="font-bold italic bg-gradient-to-r from-emerald-900 to-green-800 bg-clip-text text-transparent pr-4 drop-shadow-sm">
               chất lượng vượt trội
            </span>
          </h1>
        </div>
      </section>

      {/* ── Category Filters Section ── */}
      <div className="relative z-20 -mt-10 mb-12 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="inline-flex flex-wrap items-center justify-center p-2 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100">
            {PRODUCT_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setProductType(t.value)}
                className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] text-sm font-black tracking-widest uppercase transition-all duration-500 hover:scale-105 active:scale-95 ${
                  productType === t.value
                    ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20"
                    : "text-slate-600 hover:text-emerald-900 hover:bg-emerald-50"
                }`}
              >
                <span className={`${productType === t.value ? "text-emerald-200" : "text-emerald-700/40"}`}>
                  {t.icon}
                </span> 
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Product List Section ── */}
      <section className="bg-white pb-20">
        {/* ── Stats Bar ── */}
        <div className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white mx-auto max-w-7xl rounded-[28px] px-6 py-4 shadow-xl border border-emerald-50">
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
              {/* Custom Sort Dropdown */}
              <div className="relative sort-dropdown">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-white/90 backdrop-blur-md px-4 py-2.5 text-sm font-black text-emerald-900 shadow-sm transition-all hover:bg-white hover:shadow-md active:scale-95"
                >
                  <ArrowUpDown size={14} className="text-emerald-600" />
                  <span>{SORT_OPTIONS.find(o => o.value === sort)?.label}</span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isSortOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsSortOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-48 z-50 overflow-hidden rounded-2xl border border-emerald-50 bg-white p-1.5 shadow-2xl animate-in fade-in zoom-in duration-200">
                      {SORT_OPTIONS.map((o) => (
                        <button
                          key={o.value}
                          onClick={() => {
                            setSort(o.value);
                            setIsSortOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                            sort === o.value 
                              ? "bg-emerald-50 text-emerald-700" 
                              : "text-slate-600 hover:bg-slate-50 hover:text-emerald-900"
                          }`}
                        >
                          {o.label}
                          {sort === o.value && <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

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
      </section>
    </>
  );
}
