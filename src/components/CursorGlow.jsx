import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.innerWidth <= 768) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // If on mobile, don't render custom cursor to save performance
  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <>
      {/* Lớp sương mù lõi (nhỏ, bám sát nhất) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-white/60 rounded-full blur-[8px] pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.2 }}
      />
      
      {/* Lớp sương giữa (màu xanh dương nhạt, trễ một chút) */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 bg-[#B2D9E8]/40 rounded-full blur-[16px] pointer-events-none z-[99]"
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 32,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.5 }}
      />

      {/* Lớp khói ngoài cùng (to, mờ, trễ nhiều nhất tạo vệt đuôi) */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 bg-[#e0f0f8]/50 rounded-full blur-[30px] pointer-events-none z-[98]"
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 15, mass: 1 }}
      />

      {/* Ánh sáng nền tổng thể (rất to và mờ) */}
      <div 
        className="fixed top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-[#B2D9E8]/10 to-[#e0f0f8]/10 rounded-full blur-[100px] pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`
        }}
      />
    </>
  );
}
