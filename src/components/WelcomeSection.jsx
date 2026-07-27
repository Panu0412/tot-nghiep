import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';

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
        className="z-10 flex flex-col items-center text-center px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="mb-6 p-4 rounded-full bg-white/50 backdrop-blur-sm border border-white shadow-lg"
        >
          <GraduationCap className="w-12 h-12 text-[#8bbcd1]" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6 drop-shadow-sm flex items-center gap-4"
        >
          <Sparkles className="text-yellow-400 w-8 h-8 md:w-12 md:h-12 hidden md:block animate-pulse" />
          Chúc mừng tốt nghiệp
          <Sparkles className="text-yellow-400 w-8 h-8 md:w-12 md:h-12 hidden md:block animate-pulse" />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass p-8 md:p-12 rounded-3xl mt-4 border border-white/60 shadow-xl max-w-2xl w-full mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#8bbcd1] to-[#b78fd1] mb-6 pb-1">
            Ngô Phạm Kiều Oanh
          </h2>
          
          <div className="space-y-4 text-slate-600 text-lg md:text-xl font-light">
            <p className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B2D9E8]"></span>
              20/10/2004
            </p>
            <div className="h-[1px] w-1/2 mx-auto bg-gradient-to-r from-transparent via-slate-200 to-transparent my-4"></div>
            <p>Đại học Khoa học Xã hội và Nhân văn</p>
            <p className="font-medium">ĐHQG TP.HCM</p>
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
