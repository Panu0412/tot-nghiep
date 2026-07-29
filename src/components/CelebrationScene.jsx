import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function CelebrationScene() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const duration = 5000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ['#ebbd70', '#8bbcd1', '#a379c0', '#ffffff', '#B2D9E8']
        });
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ['#ebbd70', '#8bbcd1', '#a379c0', '#ffffff', '#B2D9E8']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ebbd70', '#8bbcd1', '#a379c0', '#ffffff', '#B2D9E8'],
        disableForReducedMotion: true
      });

      frame();
    }
  }, [isInView]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#e0f0f8] to-[#f0f8fb] perspective-[1000px]">
      
      {/* Immersive glowing background (Light theme) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8)_0%,_transparent_70%)] z-0"></div>
      
      {/* Soft light ray effect from center */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white opacity-40 rounded-full blur-[100px] z-0 pointer-events-none"
        animate={isInView ? { scale: [1, 1.2, 1], opacity: [0, 0.4, 0.2] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating stars (Soft colors) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute text-2xl md:text-4xl filter drop-shadow-sm"
            style={{ color: i % 2 === 0 ? '#ebbd70' : '#8bbcd1' }}
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              scale: 0,
              opacity: 0
            }}
            animate={isInView ? { 
              scale: [0, 1, 0.5, 1],
              opacity: [0, 0.8, 0.4, 0.8],
              y: [0, -30, 0]
            } : {}}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Main Content (Explosive pop-out) */}
      <div className="z-10 flex flex-col items-center text-center w-full max-w-[90vw] md:max-w-5xl px-4 pointer-events-none">
        
        {/* Massive 3D Graduation Cap */}
        <motion.div 
          className="text-8xl md:text-[150px] mb-4 filter drop-shadow-[0_20px_30px_rgba(178,217,232,0.6)]"
          initial={{ scale: 0, y: 150, rotateX: 60 }}
          animate={isInView ? { scale: 1, y: 0, rotateX: 0 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.2 }}
        >
          <motion.div
            animate={{ y: [-10, 10], rotate: [-3, 3] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            🎓
          </motion.div>
        </motion.div>
        
        {/* Giant Text (Light Theme) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="relative w-full flex justify-center"
        >
          {/* Text shadow layer for immense glow (soft light version) */}
          <h2 className="absolute text-[10vw] sm:text-6xl md:text-7xl lg:text-[100px] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#8bbcd1] via-[#ffffff] to-[#a379c0] blur-[15px] opacity-80 select-none text-center inline-block w-max max-w-[95vw]">
            CONGRATULATIONS
          </h2>
          
          <h2 className="relative text-[10vw] sm:text-6xl md:text-7xl lg:text-[100px] font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#7bb4cc] via-[#a379c0] to-[#ebbd70] drop-shadow-[0_5px_15px_rgba(139,188,209,0.4)] tracking-tighter leading-tight mb-4 text-center inline-block w-max max-w-[95vw]"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>
            CONGRATULATIONS
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2, type: "spring", bounce: 0.5 }}
          className="relative inline-block mt-4 md:mt-8 bg-white/60 backdrop-blur-sm py-4 px-8 rounded-full border border-white shadow-[0_10px_30px_rgba(178,217,232,0.3)]"
        >
          <h3 className="relative text-2xl sm:text-4xl md:text-5xl font-sans font-bold text-[#5b8a9f] tracking-widest uppercase">
            NGÔ PHẠM KIỀU OANH
          </h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="mt-12 text-[#8bbcd1] font-medium text-lg sm:text-2xl tracking-[0.2em] uppercase bg-white/80 px-6 py-2 rounded-full shadow-sm"
        >
          Hành trình mới bắt đầu!
        </motion.p>
        
      </div>
    </section>
  );
}
