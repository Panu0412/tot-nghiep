import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function InteractiveCard() {
  const [isOpen, setIsOpen] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.8) 0%, transparent 50%)`;

  const handleMouseMove = (e) => {
    if (isOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-[#f0f8fb] to-[#e0f0f8] perspective-[1200px] overflow-hidden">
      
      {/* Floating Background Orbs for ambiance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-64 h-64 bg-[#B2D9E8]/30 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-[#c6e4f1]/40 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative w-full max-w-[95vw] md:max-w-4xl flex flex-col items-center z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <h3 className="text-3xl md:text-5xl font-serif text-[#5b8a9f] mb-3 md:mb-4 tracking-wide drop-shadow-sm flex items-center justify-center gap-3">
            <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-yellow-400 animate-pulse" />
            Một món quà nhỏ...
            <Sparkles className="w-5 h-5 md:w-8 md:h-8 text-yellow-400 animate-pulse" />
          </h3>
          <p className="text-slate-500 font-light tracking-[0.2em] text-xs md:text-sm uppercase">Nhấp vào thiệp để mở</p>
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
          className="relative w-full max-w-[340px] sm:max-w-[450px] md:max-w-[600px] lg:max-w-[700px] aspect-[4/5] sm:aspect-[4/3] md:aspect-[16/10] cursor-pointer group"
        >
          {/* Card Flap / Cover */}
          <motion.div
            animate={{ rotateX: isOpen ? -175 : 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 45, damping: 15 }}
            style={{ transformOrigin: 'top', transformStyle: 'preserve-3d' }}
            className="absolute inset-0 z-30"
          >
            {/* Front of Cover */}
            <div 
              style={{ backfaceVisibility: 'hidden' }}
              className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-white bg-gradient-to-br from-[#ffffff] via-[#f8fbfd] to-[#e3f0f6] flex flex-col items-center justify-center"
            >
              {/* Dynamic Glare */}
              <motion.div 
                className="absolute inset-0 z-0 pointer-events-none opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100 hidden md:block"
                style={{ background: glareBackground }}
              />
              
              {/* Elegant Gold/Blue Border */}
              <div className="absolute inset-3 sm:inset-5 md:inset-6 border-[1.5px] border-[#B2D9E8]/60 rounded-2xl z-10 flex flex-col items-center justify-center p-6 bg-white/30 backdrop-blur-[2px]">
                {/* Vintage Corner Ornaments */}
                <div className="absolute top-[-2px] left-[-2px] w-6 h-6 md:w-10 md:h-10 border-t-2 border-l-2 border-[#8bbcd1] rounded-tl-xl"></div>
                <div className="absolute top-[-2px] right-[-2px] w-6 h-6 md:w-10 md:h-10 border-t-2 border-r-2 border-[#8bbcd1] rounded-tr-xl"></div>
                <div className="absolute bottom-[-2px] left-[-2px] w-6 h-6 md:w-10 md:h-10 border-b-2 border-l-2 border-[#8bbcd1] rounded-bl-xl"></div>
                <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 md:w-10 md:h-10 border-b-2 border-r-2 border-[#8bbcd1] rounded-br-xl"></div>

                {/* Wax Seal */}
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#ffffff] to-[#e0f0f8] shadow-[0_10px_25px_rgba(178,217,232,0.6)] flex items-center justify-center mb-6 md:mb-10 border-[3px] border-white relative overflow-hidden group-hover:scale-110 transition-transform duration-700">
                   <div className="absolute inset-1.5 border border-[#8bbcd1]/40 rounded-full border-dashed animate-[spin_15s_linear_infinite]"></div>
                   <span className="text-3xl md:text-4xl filter drop-shadow-sm relative z-10">🎓</span>
                   <div className="absolute inset-0 bg-white/50 w-full h-full -translate-x-full skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]"></div>
                </div>
                
                <h4 className="text-xl sm:text-2xl md:text-3xl text-[#5b8a9f] font-sans font-bold tracking-[0.15em] uppercase text-center leading-relaxed">
                  Xin dành tặng bạn,<br/>
                  <span className="text-2xl sm:text-3xl md:text-4xl mt-2 block bg-clip-text text-transparent bg-gradient-to-r from-[#7bb4cc] to-[#a379c0]">
                    Kiều Oanh
                  </span>
                </h4>
                <div className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-transparent via-[#8bbcd1] to-transparent mt-6 md:mt-8"></div>

                <div className="mt-6 md:mt-10 text-[#8bbcd1] opacity-70 animate-bounce">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-8 md:h-8">
                    <path d="M12 5v14M19 12l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Back of Cover (inside top when opened) */}
            <div 
              style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
              className="absolute inset-0 bg-[#fdfbf7] rounded-[2rem] border border-gray-100 p-4 sm:p-6 md:p-8 shadow-inner flex items-center justify-center"
            >
              <div className="w-full h-full border-[1.5px] border-dashed border-[#d1d5db] rounded-2xl flex items-center justify-center opacity-30">
                <span className="text-6xl">✨</span>
              </div>
            </div>
          </motion.div>

          {/* Card Base (Inside Bottom) */}
          <div className="absolute inset-0 z-10 bg-[#fdfbf7] rounded-[2rem] p-6 sm:p-8 md:p-14 shadow-2xl border border-white flex flex-col justify-center items-center text-center overflow-hidden">
            {/* Soft decorative background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8bbcd1 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
            
            <h4 className="relative z-10 text-2xl sm:text-3xl md:text-5xl font-sans text-[#5b8a9f] mb-4 md:mb-8 tracking-wide font-bold">
              Mừng Ngày Tốt Nghiệp!
            </h4>
            
            <div className="relative z-10 text-[#64748b] font-sans italic leading-loose md:leading-loose text-base sm:text-lg md:text-xl max-w-xl mx-auto px-2">
              <p className="mb-4">
                Khép lại chặng đường thanh xuân rực rỡ tại USSH. Mọi nỗ lực của bạn đã được đền đáp xứng đáng.
              </p>
              <p>
                Chúc Oanh sẽ luôn vững bước trên con đường phía trước, giữ mãi nụ cười rạng rỡ và gặt hái thật nhiều thành công mới!
              </p>
            </div>
            
            <div className="relative z-10 mt-8 md:mt-12 flex gap-4 justify-center items-center">
              <span className="text-[#8bbcd1] text-xl md:text-2xl animate-pulse">✨</span>
              <div className="w-12 md:w-20 h-[1px] bg-[#B2D9E8]"></div>
              <span className="text-[#8bbcd1] text-2xl md:text-3xl hover:scale-125 transition-transform cursor-default">🎓</span>
              <div className="w-12 md:w-20 h-[1px] bg-[#B2D9E8]"></div>
              <span className="text-[#8bbcd1] text-xl md:text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</span>
            </div>
          </div>

          {/* Shadow element for deep 3D effect */}
          <motion.div 
            style={{ translateZ: -80 }}
            className="absolute inset-4 md:inset-8 bg-black/10 rounded-[3rem] blur-2xl z-0"
          />
        </motion.div>
        
        {/* Helper instruction when open */}
        <AnimatePresence>
           {isOpen && (
             <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0 }}
               transition={{ delay: 0.5 }}
               className="mt-8 text-slate-400 font-light text-sm italic"
             >
               Nhấp vào thiệp lần nữa để đóng
             </motion.div>
           )}
        </AnimatePresence>
      </div>
    </section>
  );
}
