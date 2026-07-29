import { motion } from 'framer-motion';
import { useState } from 'react';

export default function IntroScreen({ onStart }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#f8fafc] to-[#e0f0f8] relative overflow-hidden perspective-[1200px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 1 }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#B2D9E8] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-2000"></div>

      <motion.div
        className="relative w-[95%] max-w-2xl aspect-[4/3] md:aspect-[16/10] group"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 50, damping: 15 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ============================== */}
        {/* MẶT TRƯỚC (FRONT) - Thiết kế sang trọng giống thiệp mời */}
        {/* ============================== */}
        <div 
          onClick={() => setIsFlipped(true)}
          className={`absolute inset-0 bg-gradient-to-b from-[#e3f0f6] to-[#B2D9E8] rounded-xl overflow-hidden shadow-2xl cursor-pointer ${isFlipped ? 'pointer-events-none' : 'pointer-events-auto'}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Nắp phong bì (Flap) - Dùng SVG để tạo đường cắt võng xuống */}
          <svg viewBox="0 0 100 55" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-[58%] z-0 filter drop-shadow-[0_5px_15px_rgba(178,217,232,0.6)]">
            <path 
              d="M 0 0 L 100 0 L 100 35 C 80 35 65 35 50 50 C 35 35 20 35 0 35 Z" 
              fill="#ffffff" 
              stroke="#e0f0f8" 
              strokeWidth="0.5" 
            />
          </svg>

          {/* Viền đôi của nắp phong bì (Double foil line) */}
          <svg viewBox="0 0 100 55" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-[58%] z-0 pointer-events-none">
            <path 
              d="M 2 0 L 2 34 C 20 34 35 34 50 48.5 C 65 34 80 34 98 34 L 98 0" 
              fill="none" 
              stroke="#B2D9E8" 
              strokeWidth="0.3" 
              className="opacity-50"
            />
          </svg>

          {/* Typography trên nắp thiệp */}
          <div className="absolute top-8 md:top-12 w-full text-center z-10 flex flex-col items-center pointer-events-none">
            <h1 className="text-3xl md:text-5xl tracking-[0.15em] mb-4 font-serif bg-clip-text text-transparent bg-gradient-to-r from-[#7bb4cc] to-[#a379c0] py-2 leading-tight" style={{ fontFamily: 'Times New Roman, serif' }}>
              KIỀU OANH
            </h1>
            <div className="flex items-center gap-4 text-[#8bbcd1]">
              <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-[#8bbcd1]"></div>
              <span className="uppercase tracking-[0.3em] text-xs md:text-sm font-light">Lễ Tốt Nghiệp</span>
              <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-[#8bbcd1]"></div>
            </div>
          </div>
          
          {/* Con dấu sáp (Wax Seal) & Dải ruy băng */}
          <div className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
            {/* Ruy băng đuôi nheo bằng SVG thay cho CSS Clip-path để chống lỗi hiển thị */}
            <div className="absolute top-6 z-0">
               <svg width="60" height="90" viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                  <path d="M5 0 L25 0 L35 85 L15 75 L0 85 Z" fill="url(#ribbonGrad)" />
                  <path d="M35 0 L55 0 L60 85 L45 75 L25 85 Z" fill="url(#ribbonGrad)" />
                  <defs>
                     <linearGradient id="ribbonGrad" x1="30" y1="0" x2="30" y2="90" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#f8fafc" />
                        <stop offset="1" stopColor="#e0f0f8" />
                     </linearGradient>
                  </defs>
               </svg>
            </div>
            
            {/* Con dấu chính */}
            <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#ffffff] via-[#f8fafc] to-[#e0f0f8] shadow-[0_5px_15px_rgba(178,217,232,0.6)] flex items-center justify-center border-[3px] border-white group-hover:scale-105 transition-transform duration-300 pointer-events-auto">
              <div className="absolute inset-1.5 rounded-full border border-dashed border-[#B2D9E8]"></div>
              <span className="text-2xl md:text-3xl filter drop-shadow-sm relative z-10">🎓</span>
            </div>
          </div>
          
          {/* Chữ phía dưới cùng */}
          <div className="absolute bottom-6 w-full flex flex-col items-center pointer-events-none">
            <p className="text-[10px] md:text-xs text-white/90 tracking-[0.3em] uppercase mb-2 font-medium">XIN DÀNH TẶNG BẠN</p>
            <div className="animate-bounce mt-2 text-white opacity-90">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 1l4 4-4 4"/>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                  <path d="M7 23l-4-4 4-4"/>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                </svg>
            </div>
          </div>
        </div>


        {/* ============================== */}
        {/* MẶT SAU (BACK) - Nội dung mở thiệp */}
        {/* ============================== */}
        <div 
          className={`absolute inset-0 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col items-center justify-between p-6 md:p-8 border border-gray-100 overflow-hidden ${isFlipped ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Viền đứt khúc cute */}
          <div className="absolute inset-4 sm:inset-5 border-[1.5px] border-dashed border-[#B2D9E8]/60 rounded-xl z-0 pointer-events-none"></div>

          {/* Hình ảnh mèo ôm băng rôn */}
          <div className="relative w-full flex-1 flex flex-col items-center justify-center mt-2 md:mt-0 z-10 min-h-0">
            <div className="relative w-[70%] max-w-[200px] md:max-w-[260px] aspect-[3/4] flex items-center justify-center h-full max-h-[280px] md:max-h-[350px]">
              <img 
                src="/cat_banner.jpg" 
                alt="Cute Cat" 
                className="w-full h-full object-contain drop-shadow-sm mix-blend-multiply pointer-events-none" 
              />
              {/* Chữ đè lên băng rôn (Ước lượng vị trí 60% từ trên xuống) */}
              <div className="absolute top-[56%] md:top-[58%] w-full text-center pointer-events-none">
                <span 
                  className="text-white text-xl md:text-3xl font-bold italic tracking-wide -rotate-6 inline-block" 
                  style={{ textShadow: '1px 2px 3px rgba(0,0,0,0.3)', fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
                >
                  congrats
                </span>
              </div>
            </div>
          </div>
          
          <div className="z-20 pb-2 md:pb-4 mt-auto">
            <motion.button
              onClick={(e) => { 
                e.stopPropagation(); 
                onStart(); 
              }}
              onTap={(e) => { 
                e.stopPropagation(); 
                onStart(); 
              }}
              className="relative px-8 py-3 md:px-12 md:py-4 bg-gradient-to-r from-[#B2D9E8] to-[#9ec9dd] text-white rounded-full font-serif tracking-[0.1em] text-sm md:text-base shadow-[0_5px_15px_rgba(178,217,232,0.4)] hover:shadow-[0_8px_25px_rgba(178,217,232,0.6)] transition-all overflow-hidden group cursor-pointer z-50 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>MỞ THIỆP NGAY</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90 group-hover:translate-x-1.5 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
