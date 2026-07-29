import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles } from 'lucide-react';
import avatarImg from '../assets/anh/anh1.png';

export default function WelcomeSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#e0f0f8] to-[#f8fafc]"
    >
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-[10%] w-32 h-16 bg-white/40 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-[15%] w-48 h-24 bg-white/50 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-[20%] w-64 h-32 bg-[#B2D9E8]/30 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        style={{ y: yText, opacity }}
        className="z-10 flex flex-col items-center text-center px-4 w-full pt-10 md:pt-0"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#5b8a9f] mb-8 md:mb-12 drop-shadow-sm flex items-center justify-center gap-2 md:gap-4 font-sans w-full tracking-tight"
        >
          <Sparkles className="text-yellow-400 w-6 h-6 md:w-10 md:h-10 animate-pulse flex-shrink-0" />
          <span className="text-center bg-clip-text text-transparent bg-gradient-to-r from-[#7bb4cc] to-[#a379c0]">Chúc mừng tốt nghiệp</span>
          <Sparkles className="text-yellow-400 w-6 h-6 md:w-10 md:h-10 animate-pulse flex-shrink-0" />
        </motion.h1>

        {/* Khung ảnh Blob lớn */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.2 }}
          className="relative mb-12 md:mb-16 w-full flex justify-center"
        >
          <div 
            className="relative w-[280px] h-[300px] md:w-[450px] md:h-[480px] overflow-hidden border-[8px] md:border-[12px] border-[#eaf4f8] shadow-[0_20px_50px_rgba(178,217,232,0.5)] bg-white group cursor-pointer transition-transform duration-700 hover:scale-105"
            style={{ borderRadius: '50% 50% 40% 60% / 60% 40% 60% 40%' }}
          >
            <img src={avatarImg} alt="Kiều Oanh" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>

          {/* Tên đè lên khung ảnh (Dùng kĩ thuật text stroke 2 lớp để viền dày không lẹm vào chữ) */}
          <div className="absolute -bottom-10 md:-bottom-14 w-full flex flex-col justify-center items-center z-20 pointer-events-none">
             <div className="relative inline-block text-center flex flex-col items-center">
               {/* Lớp bóng đổ / Viền ngoài dày */}
               <h2 className="absolute top-0 left-0 w-full font-black uppercase tracking-wider text-[#ebbd70] drop-shadow-xl flex flex-col leading-tight items-center"
                   style={{ WebkitTextStroke: '10px #ebbd70', fontFamily: 'Quicksand, Comic Sans MS, Nunito, sans-serif' }}>
                 <span className="text-2xl md:text-4xl -mb-1 md:-mb-2">NGÔ PHẠM</span>
                 <span className="text-[2.5rem] md:text-[5rem] leading-none">KIỀU OANH</span>
               </h2>
               {/* Lớp viền mỏng + Chữ màu trắng (Foreground) */}
               <h2 className="relative font-black uppercase tracking-wider text-white flex flex-col leading-tight items-center"
                   style={{ WebkitTextStroke: '2px #ca953e', fontFamily: 'Quicksand, Comic Sans MS, Nunito, sans-serif' }}>
                 <span className="text-2xl md:text-4xl -mb-1 md:-mb-2">NGÔ PHẠM</span>
                 <span className="text-[2.5rem] md:text-[5rem] leading-none">KIỀU OANH</span>
               </h2>
             </div>
          </div>
        </motion.div>

        {/* Thông tin trường lớp, ngày sinh */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass mt-4 md:mt-8 p-5 md:p-8 rounded-[2rem] border border-white/60 shadow-[0_10px_30px_rgba(178,217,232,0.2)] max-w-lg w-full mx-auto flex flex-col gap-3 md:gap-4 bg-white/40"
        >
          <div className="flex items-center justify-center gap-3 text-slate-500 font-medium text-sm md:text-base bg-white/50 py-2 px-6 rounded-full w-fit mx-auto shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#ebbd70] animate-pulse"></span>
            Ngày tốt nghiệp: 30/07/2026
            <span className="w-2 h-2 rounded-full bg-[#ebbd70] animate-pulse"></span>
          </div>
          
          <div className="space-y-1 mt-2">
            <p className="text-sm md:text-base text-slate-600">Đại học Khoa học Xã hội và Nhân văn</p>
            <p className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7bb4cc] to-[#a379c0]">ĐHQG TP.HCM</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Elements (Flowers/Stars) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            {i % 2 === 0 ? '🌸' : '✨'}
          </motion.div>
        ))}
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-60">
        <span className="text-sm font-light tracking-widest text-slate-500 mb-2">CUỘN XUỐNG</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </section>
  );
}
