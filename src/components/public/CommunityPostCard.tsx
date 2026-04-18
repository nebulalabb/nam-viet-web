"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, Heart, MessageCircle, Clock, Video, Star } from "lucide-react";
import type { News } from "@/hooks/api/useNews";

const API_BASE = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:5000";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

function getImageUrl(path?: string) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_BASE}/${path}`;
}

interface CommunityPostCardProps {
  post: News;
  variant?: "default" | "featured" | "compact";
}

export default function CommunityPostCard({ post, variant = "default" }: CommunityPostCardProps) {
  const imageUrl = getImageUrl(post.featuredImage || post.videoThumbnail);
  const isVideo = post.contentType === "video";

  if (variant === "compact") {
    return (
      <Link href={`/community/${post.slug}`} className="group flex gap-3 rounded-2xl p-3 transition-all duration-200 hover:bg-[rgba(113,136,111,0.08)]">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#e8e4da]">
          {imageUrl ? (
            <Image src={imageUrl} alt={post.title} fill className="object-cover" sizes="64px" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <MessageCircle size={20} className="text-slate-400" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="line-clamp-2 text-sm font-medium text-[var(--nv-ink)] transition-colors group-hover:text-[var(--nv-sage-strong)]">
            {post.title}
          </p>
          <p className="mt-1 text-xs text-[var(--nv-muted)]">{formatDate(post.createdAt)}</p>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/community/${post.slug}`} className="group block relative aspect-[16/9] overflow-hidden rounded-[30px] shadow-[0_24px_70px_rgba(24,35,30,0.2)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#1f312b_0%,#375145_54%,#6c816d_100%)]" />
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover opacity-45 transition-all duration-700 group-hover:scale-105 group-hover:opacity-55"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full border border-white/12 bg-[rgba(245,239,228,0.18)] px-2.5 py-1 text-[11px] font-semibold text-[#f6efe2] backdrop-blur-sm">
              {post.category?.categoryName}
            </span>
            {isVideo && (
              <span className="flex items-center gap-1 rounded-full bg-red-500/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                <Video size={11} /> Video
              </span>
            )}
            {post.isFeatured && (
              <span className="flex items-center gap-1 rounded-full bg-[rgba(192,155,108,0.82)] px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                <Star size={11} className="fill-white" /> Nổi bật
              </span>
            )}
          </div>
          <h3 className="line-clamp-2 text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#f4ead9]">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-slate-300 text-sm mt-2 line-clamp-2 hidden sm:block">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-4 mt-4 text-slate-300 text-xs">
            <span className="flex items-center gap-1"><Eye size={13} />{formatCount(post.viewCount)}</span>
            <span className="flex items-center gap-1"><Heart size={13} />{formatCount(post.likeCount)}</span>
            <span className="flex items-center gap-1"><MessageCircle size={13} />{formatCount(post.commentCount)}</span>
            <span className="flex items-center gap-1 ml-auto"><Clock size={13} />{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/community/${post.slug}`} className="group block">
      <div className="nv-soft-card overflow-hidden rounded-[28px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_54px_rgba(32,48,40,0.12)]">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#f2ece1] via-[#ebe6db] to-[#d6e2d2]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(113,136,111,0.12)]">
                {isVideo ? (
                  <Video size={28} className="text-[var(--nv-sage-strong)]" />
                ) : (
                  <MessageCircle size={28} className="text-[var(--nv-sage-strong)]" />
                )}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {isVideo && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-semibold">
                <Video size={10} /> Video
              </span>
            )}
            {post.isFeatured && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-white text-[10px] font-semibold">
                <Star size={10} className="fill-white" /> Nổi bật
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category + Date */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--nv-sage)]">
              {post.category?.categoryName}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-[var(--nv-muted)]">
              <Clock size={11} />
              {formatDate(post.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-sm font-semibold leading-snug text-[var(--nv-ink)] transition-colors line-clamp-2 group-hover:text-[var(--nv-sage-strong)]">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mb-4 line-clamp-2 text-xs text-[var(--nv-muted)]">
              {post.excerpt}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-3 border-t border-[rgba(52,67,55,0.08)] pt-3 text-xs text-[var(--nv-muted)]">
            <span className="flex cursor-pointer items-center gap-1 transition-colors hover:text-[var(--nv-sage-strong)]">
              <Eye size={13} /> {formatCount(post.viewCount)}
            </span>
            <span className="flex cursor-pointer items-center gap-1 transition-colors hover:text-red-500">
              <Heart size={13} /> {formatCount(post.likeCount)}
            </span>
            <span className="flex cursor-pointer items-center gap-1 transition-colors hover:text-[#507a74]">
              <MessageCircle size={13} /> {formatCount(post.commentCount)}
            </span>
            {post.author && (
              <span className="ml-auto max-w-[100px] truncate text-[var(--nv-muted)]">
                {post.author.fullName}
              </span>
            )}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="nv-accent-line h-0.5 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
      </div>
    </Link>
  );
}
