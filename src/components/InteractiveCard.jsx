import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useState } from 'react';

export default function InteractiveCard() {
  const [isOpen, setIsOpen] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.9) 0%, transparent 60%)`;

  const handleMouseMove = (e) => {
    if (isOpen) return; // Disable tilt when open
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center py-20 px-4 bg-[#f8fafc] perspective-[1000px]">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-serif italic text-slate-600 mb-2">Một món quà nhỏ...</h3>
          <p className="text-slate-400 font-light tracking-wider">Nhấp vào thiệp để mở</p>
        </motion.div>

        <motion.div
          style={{
            rotateX: isOpen ? 0 : rotateX,
            rotateY: isOpen ? 0 : rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTap={() => setIsOpen(!isOpen)}
          className="relative w-full max-w-lg aspect-[4/3] md:aspect-[16/10] cursor-pointer group"
        >
          {/* Card Flap / Cover */}
          <motion.div
            animate={{
              rotateX: isOpen ? -180 : 0,
            }}
            transition={{ duration: 1, type: "spring", stiffness: 60, damping: 15 }}
            style={{ transformOrigin: 'top', transformStyle: 'preserve-3d' }}
            className="absolute inset-0 z-20"
          >
            {/* Front of Cover */}
            <div 
              style={{ backfaceVisibility: 'hidden' }}
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white/60 bg-gradient-to-br from-[#f8fbfd] to-[#e3f0f6]"
            >
              {/* Dynamic Glare Overlay */}
              <motion.div 
                className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: glareBackground }}
              />
              
              {/* Decorative Border */}
              <div className="absolute inset-3 sm:inset-5 border border-[#B2D9E8]/30 rounded-xl z-10 flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-[2px]">
                {/* Decorative corners */}
                <div className="absolute top-[-1px] left-[-1px] w-4 h-4 border-t-2 border-l-2 border-[#B2D9E8]/60"></div>
                <div className="absolute top-[-1px] right-[-1px] w-4 h-4 border-t-2 border-r-2 border-[#B2D9E8]/60"></div>
                <div className="absolute bottom-[-1px] left-[-1px] w-4 h-4 border-b-2 border-l-2 border-[#B2D9E8]/60"></div>
                <div className="absolute bottom-[-1px] right-[-1px] w-4 h-4 border-b-2 border-r-2 border-[#B2D9E8]/60"></div>

                {/* Wax Seal / Stamp */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#B2D9E8] to-[#8bbcd1] shadow-[0_8px_20px_rgba(178,217,232,0.4)] flex items-center justify-center mb-6 border-[3px] border-white relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                   <div className="absolute inset-1 border border-white/50 rounded-full border-dashed animate-[spin_10s_linear_infinite]"></div>
                   <span className="text-3xl filter drop-shadow-md relative z-10">🎓</span>
                   <div className="absolute inset-0 bg-white/20 w-full h-full -translate-x-full skew-x-12 group-hover:animate-[shimmer_1.5s_ease-in-out]"></div>
                </div>
                
                <h4 className="text-xl md:text-2xl text-slate-700 font-medium tracking-[0.1em] uppercase">To: Kiều Oanh</h4>
                <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#B2D9E8] to-transparent mt-4"></div>

                <div className="mt-8 text-[#8bbcd1] opacity-70 animate-bounce">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M19 12l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Back of Cover (inside top) */}
            <div 
              style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
              className="absolute inset-0 bg-[#fefefe] rounded-2xl border border-gray-100 p-8 shadow-inner"
            >
              <div className="w-full h-full border-2 border-dashed border-[#B2D9E8]/30 rounded-xl bg-gray-50/50"></div>
            </div>
          </motion.div>

          {/* Card Base (Inside Bottom) */}
          <div className="absolute inset-0 z-10 bg-white rounded-2xl p-4 sm:p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col justify-center items-center text-center">
            <h4 className="text-xl sm:text-2xl md:text-3xl text-slate-800 mb-3 md:mb-6">Mừng Ngày Tốt Nghiệp!</h4>
            <p className="text-slate-600 font-light leading-relaxed max-w-md mx-auto text-xs sm:text-sm md:text-base">
              Chúc mừng Kiều Oanh đã hoàn thành chặng đường 4 năm tại USSH. 
              Chúc bạn luôn giữ được nụ cười tươi tắn, gặp nhiều may mắn và thành công trên con đường sắp tới!
            </p>
            <div className="mt-8 flex gap-2 justify-center">
              <span className="text-[#8bbcd1]">✨</span>
              <span className="text-[#8bbcd1]">🎉</span>
              <span className="text-[#8bbcd1]">✨</span>
            </div>
          </div>

          {/* Shadow element for 3D depth */}
          <motion.div 
            style={{ translateZ: -50 }}
            className="absolute inset-0 bg-black/5 rounded-3xl blur-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
