"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Sprout, Leaf, Apple, TreePine, ShieldCheck, Handshake, Phone, ArrowRight, Eye, MapPin, Mail, Globe } from "lucide-react";

const banners = [
  { src: "/images/banner/banner-01.png", alt: "Cánh đồng xanh mướt" },
  { src: "/images/banner/banner-02.png", alt: "Nhà máy sản xuất" },
  { src: "/images/banner/banner-03.png", alt: "Mùa thu hoạch bội thu" },
];

const categories = [
  { icon: <Sprout size={32} />, label: "Tất cả\nsản phẩm", href: "/showcase" },
  { icon: <TreePine size={32} />, label: "Sản phẩm\ncho Cây trồng", href: "/showcase?type=goods" },
  { icon: <Apple size={32} />, label: "Sản phẩm\ncho Trái cây", href: "/showcase?type=finished_product" },
];

// Mock data sản phẩm
const mockCayTrong = [
  { id: 1, name: "Phân NPK 16-16-8", tag: "Phân bón gốc", price: "185.000đ", badge: "HOT" },
  { id: 2, name: "Phân DAP 18-46-0", tag: "Phân bón gốc", price: "320.000đ", badge: null },
  { id: 3, name: "Phân Urê 46%", tag: "Đạm cao cấp", price: "210.000đ", badge: "NEW" },
  { id: 4, name: "Phân Kali MOP 60%", tag: "Kali nhập khẩu", price: "275.000đ", badge: null },
  { id: 5, name: "Vi sinh Trichoderma", tag: "Sinh học", price: "95.000đ", badge: null },
  { id: 6, name: "Phân lân nung chảy", tag: "Lân Văn Điển", price: "120.000đ", badge: "LIMITED" },
  { id: 7, name: "NPK 20-20-15 + TE", tag: "Cao cấp", price: "245.000đ", badge: "HOT" },
  { id: 8, name: "Phân hữu cơ vi sinh", tag: "Hữu cơ", price: "68.000đ", badge: null },
];

const mockTraiCay = [
  { id: 9, name: "NPK Trái cây 15-15-20", tag: "Chuyên trái cây", price: "195.000đ", badge: "HOT" },
  { id: 10, name: "Canxi Bo dạng nước", tag: "Phun lá", price: "85.000đ", badge: "NEW" },
  { id: 11, name: "Kích thích ra hoa", tag: "Hormone thực vật", price: "130.000đ", badge: null },
  { id: 12, name: "Phân bón lá K-Humate", tag: "Kali hữu cơ", price: "110.000đ", badge: null },
  { id: 13, name: "NPK 12-12-17+8S", tag: "Nuôi trái", price: "215.000đ", badge: "LIMITED" },
  { id: 14, name: "Amino Acid lá", tag: "Dinh dưỡng lá", price: "75.000đ", badge: null },
  { id: 15, name: "Phân chống rụng trái", tag: "Chuyên dụng", price: "145.000đ", badge: "HOT" },
  { id: 16, name: "Siêu Kali MKP 0-52-34", tag: "Nhập khẩu", price: "380.000đ", badge: null },
];

const badgeColors: Record<string, string> = {
  HOT: "bg-red-500",
  NEW: "bg-emerald-500",
  LIMITED: "bg-amber-500",
};

// Mock Product Card
function MockProductCard({ product }: { product: typeof mockCayTrong[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
      {/* Image placeholder */}
      <div className="relative h-44 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center overflow-hidden">
        <Sprout size={48} className="text-emerald-300 group-hover:scale-110 transition-transform duration-300" />
        {product.badge && (
          <span className={`absolute top-2 right-2 text-[10px] font-black text-white px-2 py-0.5 rounded-md ${badgeColors[product.badge]}`}>
            {product.badge}
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md">
            <Eye size={16} className="text-emerald-600" />
          </div>
        </div>
      </div>
      {/* Info */}
      <div className="p-4">
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
          {product.tag}
        </span>
        <h4 className="text-sm font-bold text-slate-800 mt-2 mb-1 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-snug">
          {product.name}
        </h4>
        <p className="text-base font-black text-emerald-600">{product.price}</p>
      </div>
    </div>
  );
}

// Horizontal scroll component
function ProductScrollRow({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="mb-14 last:mb-0">
      <div className="flex items-center justify-center gap-2 mb-8">
        <span className="text-emerald-600">{icon}</span>
        <h3 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-wide">{title}</h3>
      </div>
      
      <div className="relative group/scroll">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-300 transition-all opacity-0 group-hover/scroll:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-300 transition-all opacity-0 group-hover/scroll:opacity-100"
          >
            <ChevronRight size={20} />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-2 px-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % banners.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + banners.length) % banners.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <>
      {/* ── Hero Carousel ── */}
      <section className="relative w-full -mt-[80px] min-h-[550px] overflow-hidden flex items-center pt-40 pb-24">
        {banners.map((banner, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <Image src={banner.src} alt={banner.alt} fill className="object-cover" priority={i === 0} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/90 via-white/60 to-transparent" />
          </div>
        ))}

        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all">
          <ChevronLeft size={22} />
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all">
          <ChevronRight size={22} />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {banners.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`h-2 rounded-full transition-all duration-500 ${i === current ? "w-8 bg-emerald-400" : "w-2 bg-white/50 hover:bg-white/80"}`} />
          ))}
        </div>
      </section>

      {/* ── Danh Mục Sản Phẩm ── */}
      <section className="relative py-14 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/banner/banner-01.png" alt="" fill className="object-cover blur-sm" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf size={28} className="mx-auto mb-3 text-emerald-200" />
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider mb-10">Sản Phẩm Của Nam Việt</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {categories.map((cat, i) => (
              <Link key={i} href={cat.href} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center">
                <div className="text-emerald-600 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                <p className="text-sm font-bold text-slate-700 leading-relaxed whitespace-pre-line group-hover:text-emerald-700 transition-colors">{cat.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sản Phẩm Nổi Bật (Mock Data) ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ProductScrollRow title="Sản Phẩm Cây Trồng" icon={<TreePine size={24} />}>
            {mockCayTrong.map((p) => (
              <div key={p.id} className="min-w-[200px] max-w-[200px] snap-start shrink-0">
                <MockProductCard product={p} />
              </div>
            ))}
          </ProductScrollRow>

          <ProductScrollRow title="Sản Phẩm Trái Cây" icon={<Apple size={24} />}>
            {mockTraiCay.map((p) => (
              <div key={p.id} className="min-w-[200px] max-w-[200px] snap-start shrink-0">
                <MockProductCard product={p} />
              </div>
            ))}
          </ProductScrollRow>

          <div className="text-center mt-6">
            <Link href="/showcase" className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:text-emerald-600 transition-colors group">
              Xem tất cả sản phẩm <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Dịch Vụ Tại Nam Việt ── */}
      <section className="relative py-14 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/banner/banner-03.png" alt="" fill className="object-cover blur-sm" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Leaf size={28} className="mx-auto mb-3 text-emerald-200" />
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider mb-12">Dịch Vụ Tại Nam Việt</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {[
              { icon: <ShieldCheck size={28} />, label: "Sản phẩm\nchất lượng cao" },
              { icon: <Sprout size={28} />, label: "Tư vấn kỹ thuật\nchuyên nghiệp" },
              { icon: <Handshake size={28} />, label: "Giao hàng\nnhanh chóng" },
              { icon: <Phone size={28} />, label: "Chăm sóc\nkhách hàng tận tâm" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group">
                <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300">
                  {s.icon}
                </div>
                <p className="text-sm font-bold text-white/90 leading-relaxed whitespace-pre-line">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Thông tin Liên hệ ── */}
      <section className="px-4 pb-24 pt-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-12 bg-slate-50/70 rounded-[48px] p-8 lg:p-12 shadow-sm border border-slate-100 transition-all">
            
            {/* Left: Branding Column */}
            <div className="flex flex-col items-center justify-center text-center space-y-6 lg:w-[35%] py-4">
               <div className="relative w-28 h-28 md:w-32 md:h-32 transition-transform duration-500 hover:scale-105">
                 <Image 
                    src="/images/logo/logo-nobackground.png" 
                    alt="Logo Nam Việt" 
                    fill
                    className="object-contain"
                 />
               </div>
               <div className="space-y-3">
                 <div className="flex flex-col items-center">
                   <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                     CÔNG TY NAM VIỆT
                   </h3>
                   <p className="text-[10px] md:text-xs font-bold text-slate-400 tracking-[0.4em] uppercase mt-2">
                     Nông nghiệp xanh
                   </p>
                 </div>
               </div>
            </div>

            {/* Right: Contact Details Stacked Card */}
            <div className="lg:w-[65%] w-full flex flex-col justify-center">
              <div className="bg-slate-50/50 rounded-3xl border border-slate-100 overflow-hidden divide-y divide-slate-100/80">
                
                {/* Address */}
                <div className="flex items-stretch group hover:bg-white transition-colors">
                  <div className="w-[120px] sm:w-[140px] bg-slate-50/80 p-4 border-r border-slate-100 flex flex-col items-center justify-center text-center group-hover:bg-emerald-50/30 transition-colors">
                     <MapPin size={18} className="text-slate-500 mb-1" />
                     <span className="text-[11px] font-bold text-slate-700 uppercase leading-tight">Địa<br/>chỉ</span>
                  </div>
                  <div className="flex-1 p-4 sm:p-5 flex items-center">
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      Quốc Lộ 30, Ấp Đông Mỹ, Xã Mỹ Hội, Huyện Cao Lãnh, Tỉnh Đồng Tháp.
                    </p>
                  </div>
                </div>

                {/* Hotline */}
                <div className="flex items-stretch group hover:bg-white transition-colors">
                  <div className="w-[120px] sm:w-[140px] bg-slate-50/80 p-4 border-r border-slate-100 flex flex-col items-center justify-center text-center group-hover:bg-emerald-50/30 transition-colors">
                     <Phone size={18} className="text-slate-500 mb-1" />
                     <span className="text-[11px] font-bold text-slate-700 uppercase leading-none">Hotline</span>
                  </div>
                  <div className="flex-1 p-4 sm:p-5 flex items-center">
                    <a href="tel:0886357788" className="text-[15px] sm:text-base font-black text-emerald-600 hover:text-emerald-700 transition-colors">
                      088 635 7788 - 0868 759 588
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-stretch group hover:bg-white transition-colors">
                  <div className="w-[120px] sm:w-[140px] bg-slate-50/80 p-4 border-r border-slate-100 flex flex-col items-center justify-center text-center group-hover:bg-emerald-50/30 transition-colors">
                     <Globe size={18} className="text-slate-500 mb-1" />
                     <span className="text-[11px] font-bold text-slate-700 uppercase leading-none">Website</span>
                  </div>
                  <div className="flex-1 p-4 sm:p-5 flex items-center">
                    <a href="https://hoasinhnamviet.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 font-medium hover:text-emerald-700 transition-colors">
                      https://hoasinhnamviet.com/
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-stretch group hover:bg-white transition-colors">
                  <div className="w-[120px] sm:w-[140px] bg-slate-50/80 p-4 border-r border-slate-100 flex flex-col items-center justify-center text-center group-hover:bg-emerald-50/30 transition-colors">
                     <Mail size={18} className="text-slate-500 mb-1" />
                     <span className="text-[11px] font-bold text-slate-700 uppercase leading-none">Email</span>
                  </div>
                  <div className="flex-1 p-4 sm:p-5 flex items-center">
                    <a href="mailto:hoasinhnamviet@gmail.com" className="text-sm text-slate-500 font-medium hover:text-emerald-700 transition-colors">
                      hoasinhnamviet@gmail.com
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
