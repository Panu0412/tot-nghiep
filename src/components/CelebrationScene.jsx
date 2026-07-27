import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function CelebrationScene() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
      }, 250);
    }
  }, [isInView]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-t from-[#B2D9E8]/30 to-[#f8fafc]">
      
      {/* Floating balloons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`balloon-${i}`}
            className="absolute text-4xl md:text-6xl"
            initial={{ 
              bottom: '-20%', 
              left: `${Math.random() * 100}%`,
              x: 0
            }}
            animate={{ 
              bottom: '120%',
              x: [0, 30, -30, 0]
            }}
            transition={{ 
              duration: 15 + Math.random() * 10, 
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            🎈
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="z-10 text-center glass p-12 md:p-20 rounded-[3rem] shadow-2xl border-2 border-white/80 mx-4 max-w-4xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
      >
        <motion.div 
          className="text-6xl md:text-8xl mb-6"
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 3 }}
        >
          🎓
        </motion.div>
        
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8bbcd1] to-[#a379c0] mb-8 pb-2 leading-relaxed">
          Congratulations!
        </h2>
        
        <h3 className="text-2xl md:text-4xl text-slate-700">
          Ngô Phạm Kiều Oanh
        </h3>
        
        <div className="mt-12 flex justify-center gap-4">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>✨</motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>🌟</motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>✨</motion.div>
        </div>
      </motion.div>

    </section>
  );
}
