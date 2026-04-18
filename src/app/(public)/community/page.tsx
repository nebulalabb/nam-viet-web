"use client";

import { useState, useEffect } from "react";
import { usePublicNewsList, usePublicFeaturedNews, usePublicNewsCategories } from "@/hooks/api/usePublicNews";
import CommunityPostCard from "@/components/public/CommunityPostCard";
import {
  Search,
  TrendingUp,
  Flame,
  Clock,
  Video,
  Star,
  ChevronLeft,
  ChevronRight,
  Users,
  MessageCircle,
  Eye,
  Loader2,
  X,
  Sparkles,
} from "lucide-react";

const TABS = [
  { value: "", label: "Tất cả", icon: <Sparkles size={14} /> },
  { value: "featured", label: "Nổi bật", icon: <Star size={14} /> },
  { value: "video", label: "Video", icon: <Video size={14} /> },
  { value: "latest", label: "Mới nhất", icon: <Clock size={14} /> },
];

export default function CommunityPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [page, setPage] = useState(1);
  const LIMIT = 9;

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { setPage(1); }, [debouncedSearch, activeTab]);

  const queryParams: any = {
    page,
    limit: LIMIT,
    status: "published",
    ...(debouncedSearch && { search: debouncedSearch }),
  };
  if (activeTab === "featured") queryParams.isFeatured = true;
  if (activeTab === "video") queryParams.contentType = "video";

  const { data: newsResponse, isLoading } = usePublicNewsList(queryParams);
  const { data: featuredList = [] } = usePublicFeaturedNews();
  const { data: categories = [] } = usePublicNewsCategories({ page: 1, limit: 20 });

  const posts = newsResponse?.data || [];
  const meta = newsResponse?.meta;
  const totalPages = meta?.totalPages || 1;

  return (
    <>
      {/* ── Hero ── */}
      <section className="nv-hero pt-24 pb-28">
        <div className="absolute left-1/3 top-10 h-80 w-80 rounded-full bg-[rgba(193,207,184,0.16)] blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-[rgba(192,155,108,0.14)] blur-3xl animate-pulse [animation-delay:0.8s]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="nv-soft-badge mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Users size={14} />
            Cộng đồng Nam Việt
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Tin tức &amp;{" "}
            <span className="bg-gradient-to-r from-[#f4ead9] via-[#d8e3d4] to-[#c6a173] bg-clip-text text-transparent">
              Cộng đồng
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[#d6dbd2]">
            Cập nhật thông tin mới nhất, chia sẻ kiến thức và kết nối cùng cộng đồng Nam Việt.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto">
            <div className="nv-hero-panel flex items-center gap-3 rounded-[28px] p-2 backdrop-blur-xl">
              <Search size={18} className="ml-2 shrink-0 text-[#c7cfca]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm bài viết..."
                className="flex-1 bg-transparent py-1 text-sm text-white outline-none placeholder:text-[#c7cfca]"
                id="community-search"
              />
              {search && (
                <button onClick={() => setSearch("")} className="p-1 text-[#c7cfca] hover:text-white">
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[#d0d8d0]">
            <span className="flex items-center gap-1.5"><Eye size={14} className="text-[#d7c2a1]" /> {(meta?.total || 0).toLocaleString()} bài viết</span>
            <span className="flex items-center gap-1.5"><MessageCircle size={14} className="text-[#d8e2d5]" /> Cộng đồng sôi động</span>
            <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-[#bfcdb7]" /> Cập nhật hàng ngày</span>
          </div>
        </div>
      </section>

      {/* ── Tabs & Main ── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="nv-soft-card mb-8 flex items-center gap-2 overflow-x-auto rounded-[28px] p-3 no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.value
                  ? "nv-primary-button text-white"
                  : "border border-[var(--nv-border)] bg-[rgba(255,255,255,0.82)] text-[var(--nv-muted)] hover:border-[rgba(80,102,82,0.18)] hover:text-[var(--nv-sage-strong)]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}

          {/* Category filter */}
          {categories.length > 0 && (
            <div className="ml-auto shrink-0">
              <select
                onChange={(e) => {
                  // filter by category – could extend queryParams
                }}
                className="rounded-xl border border-[var(--nv-border)] bg-[rgba(255,255,255,0.88)] px-3 py-2 text-sm text-[var(--nv-ink)] outline-none focus:ring-4 focus:ring-[rgba(113,136,111,0.12)]"
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3">
            {/* Featured post (first one if exists) */}
            {!isLoading && posts.length > 0 && page === 1 && activeTab === "" && !debouncedSearch && (
              <div className="mb-8">
                <CommunityPostCard post={posts[0]} variant="featured" />
              </div>
            )}

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 size={36} className="mb-4 animate-spin text-[var(--nv-sage)]" />
                <p className="text-sm text-[var(--nv-muted)]">Đang tải bài viết...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <MessageCircle size={28} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Không có bài viết
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Thử thay đổi bộ lọc hoặc tìm kiếm từ khóa khác.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {(page === 1 && activeTab === "" && !debouncedSearch ? posts.slice(1) : posts).map((post) => (
                    <CommunityPostCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page <= 1}
                      className="nv-outline-button flex items-center gap-1 rounded-2xl px-3 py-2 text-sm text-[var(--nv-muted)] transition-all disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft size={15} /> Trước
                    </button>
                    <span className="px-3 text-sm text-[var(--nv-muted)]">
                      {page} / {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                      className="nv-outline-button flex items-center gap-1 rounded-2xl px-3 py-2 text-sm text-[var(--nv-muted)] transition-all disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Sau <ChevronRight size={15} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Trending / Featured */}
            <div className="nv-soft-card rounded-[28px] p-5">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[var(--nv-ink)]">
                <Flame size={16} className="text-[var(--nv-gold)]" />
                Bài nổi bật
              </h3>
              <div className="space-y-1">
                {featuredList.slice(0, 5).map((post) => (
                  <CommunityPostCard key={post.id} post={post} variant="compact" />
                ))}
                {featuredList.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-4">Chưa có bài nổi bật</p>
                )}
              </div>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="nv-soft-card rounded-[28px] p-5">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-[var(--nv-ink)]">
                  <Star size={16} className="text-[var(--nv-sage)]" />
                  Danh mục
                </h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="group flex cursor-pointer items-center justify-between rounded-2xl px-3 py-2 transition-all hover:bg-[rgba(113,136,111,0.08)]"
                      onClick={() => {}}
                    >
                      <span className="text-sm text-[var(--nv-muted)] transition-colors group-hover:text-[var(--nv-sage-strong)]">
                        {cat.categoryName}
                      </span>
                      {cat._count && (
                        <span className="rounded-full bg-[rgba(113,136,111,0.12)] px-2 py-0.5 text-xs text-[var(--nv-sage-strong)]">
                          {cat._count.news}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
