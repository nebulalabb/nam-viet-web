"use client";

import Image from "next/image";
import { ShieldCheck, HeartPulse, Lightbulb, Handshake, CheckCircle2, Leaf, Globe2, Sprout, Users, Scale, Phone, MapPin, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative w-full -mt-[80px] pt-[180px] pb-32 bg-emerald-900 border-b-8 border-emerald-700 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/carousel/carousel-01.png"
            alt="Công Ty Cổ Phần Hóa Sinh Nam Việt"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-emerald-900/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-black/40 to-transparent" />
          {/* Top fade for header */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/95 via-white/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight drop-shadow-lg">
            Công Ty Cổ Phần<br />Hóa Sinh Nam Việt
          </h1>
          <p className="mx-auto max-w-3xl text-base md:text-lg font-medium text-emerald-50 leading-relaxed drop-shadow-sm">
            Chuyên sản xuất các loại phân bón cho tất cả các loại cây trồng từ nguồn nguyên liệu ngoại nhập — Chất lượng đặt lên hàng đầu.
          </p>
        </div>
      </section>

      {/* ── Lời chào Ban Giám Đốc ── */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative hidden md:block">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-500 z-10">
                <Image src="/images/carousel/carousel-02.png" alt="Nhà máy sản xuất Nam Việt" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-2/3 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500 z-0">
                <Image src="/images/carousel/carousel-03.png" alt="Sản phẩm phân bón Nam Việt" fill className="object-cover" />
              </div>
            </div>
            
            <div className="lg:pl-8 mt-4 lg:mt-0">
              <h2 className="text-sm font-black text-emerald-600 uppercase tracking-widest mb-3">Ban Giám Đốc Mến Chào</h2>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6 leading-tight">
                Vững bước tiên phong trong lĩnh vực <span className="text-emerald-600">Phân bón & Hóa sinh</span>
              </h3>
              <p className="text-slate-600 text-base mb-5 leading-relaxed font-medium">
                <strong className="text-emerald-700">Công Ty Cổ Phần Hóa Sinh Nam Việt</strong> được thành lập vào năm <strong>2010</strong> với 4 thành viên sáng lập, mang theo khát vọng nâng tầm chất lượng nông sản Việt Nam.
              </p>
              <p className="text-slate-600 text-base mb-5 leading-relaxed font-medium">
                Chúng tôi chuyên <strong>sản xuất các loại phân bón cho tất cả các loại cây trồng</strong> từ nguồn nguyên liệu ngoại nhập, đảm bảo tiêu chuẩn chất lượng cao nhất. Với tiêu chí <em className="text-emerald-700 font-bold not-italic">"Chất lượng đặt lên hàng đầu"</em>, Nam Việt cam kết đồng hành cùng bà con nông dân trên mọi mùa vụ.
              </p>
              
              <div className="grid grid-cols-2 gap-5 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mt-8">
                <div className="flex flex-col gap-1.5">
                  <span className="text-3xl font-black text-emerald-600">2010</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Năm Thành Lập</span>
                </div>
                <div className="flex flex-col gap-1.5 border-l border-slate-100 pl-5">
                  <span className="text-3xl font-black text-emerald-600">4</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thành Viên Sáng Lập</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tiêu chí hoạt động ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-sm font-black text-emerald-600 uppercase tracking-widest mb-3">Cam Kết</h2>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800">Tiêu Chí Hoạt Động</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <ShieldCheck size={28} />
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-3">Chất lượng hàng đầu</h4>
              <p className="text-slate-600 font-medium leading-relaxed text-sm">
                Tiêu chí chất lượng luôn được đặt lên hàng đầu trong mọi sản phẩm. Nguyên liệu ngoại nhập, quy trình sản xuất nghiêm ngặt đảm bảo hiệu quả tối ưu cho cây trồng.
              </p>
            </div>
            
            {/* Card 2 - Highlighted */}
            <div className="bg-emerald-700 rounded-3xl p-8 border border-emerald-600 shadow-lg hover:-translate-y-2 transition-transform duration-300 transform md:scale-105 z-10 group">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-emerald-700 transition-colors">
                <Scale size={28} />
              </div>
              <h4 className="text-lg font-bold text-white mb-3">Cân bằng lợi ích</h4>
              <p className="text-emerald-50 font-medium leading-relaxed text-sm">
                Cân bằng lợi ích giữa <strong>Công ty — Đại lý — Nông dân</strong>. Mỗi mắt xích trong chuỗi giá trị đều được tôn trọng và đảm bảo quyền lợi công bằng.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <Handshake size={28} />
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-3">Hợp tác cùng phát triển</h4>
              <p className="text-slate-600 font-medium leading-relaxed text-sm">
                Hợp tác bền vững, cùng nhau phát triển. Nam Việt đồng hành với đối tác và bà con nông dân trên hành trình nâng cao năng suất và cải thiện đời sống.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Giá Trị Cốt Lõi ── */}
      <section id="gia-tri" className="py-20 bg-slate-900 text-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-3">Nền Tảng</h2>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">Giá Trị Cốt Lõi</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { title: "Chất Lượng", icon: <CheckCircle2 size={28} />, desc: "Nguyên liệu ngoại nhập, quy trình sản xuất chuẩn mực, sản phẩm phân bón hiệu quả cho mọi loại cây trồng." },
              { title: "Uy Tín", icon: <ShieldCheck size={28} />, desc: "Hơn 14 năm xây dựng thương hiệu, luôn giữ vững lời hứa với đại lý và bà con nông dân." },
              { title: "Công Bằng", icon: <Scale size={28} />, desc: "Cân bằng lợi ích giữa Công ty - Đại lý - Nông dân, đảm bảo mọi bên đều được hưởng lợi xứng đáng." },
              { title: "Đồng Hành", icon: <Handshake size={28} />, desc: "Hợp tác cùng phát triển, đồng hành lâu dài với bà con nông dân trong mọi mùa vụ." },
            ].map((core, i) => (
              <div key={i} className="group bg-slate-800/80 hover:bg-emerald-800/50 border border-slate-700 hover:border-emerald-500/50 rounded-3xl p-6 transition-all duration-300">
                <div className="w-14 h-14 bg-slate-700/80 group-hover:bg-emerald-600 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:text-white mb-6 transition-all shadow-inner">
                  {core.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-200 transition-colors">{core.title}</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed group-hover:text-slate-300 transition-colors">{core.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lịch Sử Hình Thành & Bản Đồ Phân Phối ── */}
      <section id="lich-su" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Cột trái: Bản đồ phân phối */}
            <div className="flex flex-col items-center text-center sticky top-28">
              <h2 className="text-2xl md:text-3xl font-black text-emerald-700 uppercase tracking-wide mb-10 leading-snug">
                Đưa Sản Phẩm Tốt Nhất<br />Đến Tay Khách Hàng
              </h2>
              
              <div className="relative w-full max-w-md mx-auto">
                <Image 
                  src="/images/hero/vietnam-map.png" 
                  alt="Bản đồ phân phối Nam Việt" 
                  width={500} 
                  height={600} 
                  className="w-full h-auto object-contain"
                />
                
                {/* Logo Nam Việt - Góc trên phải */}
                <div className="absolute top-4 right-0 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-emerald-100">
                  <div className="relative w-8 h-8">
                    <Image src="/images/logo/logo-nobackground.png" alt="Logo" fill className="object-contain" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-black text-emerald-700 leading-none">NAM</span>
                    <span className="block text-xs font-black text-emerald-700 leading-none">VIỆT</span>
                  </div>
                </div>
                
                {/* Logo Nam Việt - Góc dưới phải */}
                <div className="absolute bottom-8 right-0 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-emerald-100">
                  <div className="relative w-8 h-8">
                    <Image src="/images/logo/logo-nobackground.png" alt="Logo" fill className="object-contain" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-black text-emerald-700 leading-none">NAM</span>
                    <span className="block text-xs font-black text-emerald-700 leading-none">VIỆT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải: Timeline */}
            <div>
              <div className="text-center lg:text-left mb-14">
                <h2 className="text-sm font-black text-emerald-600 uppercase tracking-widest mb-3">Hành Trình</h2>
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800">Cột Mốc Phát Triển</h3>
              </div>

              <div className="relative border-l-4 border-emerald-100 ml-4 pl-8 space-y-14 py-4">
                {[
                  { year: "2010", title: "Thành Lập Công Ty", desc: "Công Ty Cổ Phần Hóa Sinh Nam Việt chính thức được thành lập với 4 thành viên sáng lập, đặt trụ sở tại Quốc lộ 30, ấp Đông Mỹ, xã Mỹ Thọ, tỉnh Đồng Tháp." },
                  { year: "2014", title: "Mở Rộng Sản Phẩm", desc: "Phát triển đa dạng dòng sản phẩm phân bón cho tất cả các loại cây trồng, mở rộng hệ thống đại lý phân phối khắp khu vực Đồng bằng sông Cửu Long." },
                  { year: "2020", title: "Khẳng Định Thương Hiệu", desc: "Sau 10 năm phát triển, Nam Việt khẳng định vị thế trên thị trường phân bón với nguồn nguyên liệu ngoại nhập chất lượng cao và mạng lưới đại lý vững mạnh." },
                  { year: "2026", title: "Chuyển Đổi Số & Phát Triển Bền Vững", desc: "Ứng dụng công nghệ số vào quản lý sản xuất và phân phối. Tiếp tục cam kết cân bằng lợi ích giữa Công ty - Đại lý - Nông dân." },
                ].map((item, i) => (
                  <div key={i} className="relative group">
                    {/* Dấu chấm Timeline */}
                    <div className="absolute -left-[43px] top-1.5 w-6 h-6 rounded-full bg-emerald-500 border-4 border-emerald-100 group-hover:scale-125 group-hover:border-emerald-200 transition-all z-20 shadow-sm"></div>
                    
                    {/* Năm - Nằm ẩn chìm */}
                    <h4 className="text-5xl font-black text-emerald-50 group-hover:text-emerald-100 transition-colors absolute -top-10 left-0 select-none z-0 tracking-tighter">
                      {item.year}
                    </h4>
                    
                    <div className="relative z-10 mt-2">
                      <div className="inline-block bg-emerald-100 px-3 py-1 rounded-lg text-emerald-700 font-black text-sm mb-2">Năm {item.year}</div>
                      <h5 className="text-lg font-bold text-slate-800 mb-1.5">{item.title}</h5>
                      <p className="text-slate-600 font-medium leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Hợp tác cùng Nam Việt ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 md:p-14 text-center">
            <Sprout size={36} className="mx-auto mb-5 text-emerald-500" />
            <h3 className="text-2xl font-extrabold text-slate-800 mb-3">Hợp tác cùng Nam Việt</h3>
            <p className="text-slate-600 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
              Liên hệ ngay để được tư vấn về các dòng sản phẩm phân bón chất lượng cao, phù hợp với mọi loại cây trồng.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="tel:0886357788" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-5 py-3 rounded-xl shadow-md hover:bg-emerald-700 hover:-translate-y-0.5 transition-all">
                <Phone size={18} /> 088 635 7788
              </a>
              <a href="tel:0868759588" className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 font-bold px-5 py-3 rounded-xl border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all">
                <Phone size={18} /> 0868 759 588
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
