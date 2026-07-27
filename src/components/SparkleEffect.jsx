import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SparkleEffect() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newSparkles = Array.from({ length: 5 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        angle: (Math.PI * 2 * i) / 5 + Math.random() * 0.5,
      }));

      setSparkles((prev) => [...prev, ...newSparkles]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !newSparkles.find(ns => ns.id === s.id)));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            initial={{ 
              x: sparkle.x, 
              y: sparkle.y, 
              scale: 0,
              opacity: 1 
            }}
            animate={{ 
              x: sparkle.x + Math.cos(sparkle.angle) * 60, 
              y: sparkle.y + Math.sin(sparkle.angle) * 60, 
              scale: [0, 1, 0],
              opacity: [1, 0.8, 0],
              rotate: 180
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-3 h-3 text-yellow-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
