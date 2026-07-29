import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalEasterEgg() {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <>
      {/* EASTER EGG: Nằm lấp ló góc trái trên, phát sáng nhẹ (giống voucher TikTok) */}
      <div 
        className="fixed top-28 sm:top-32 -left-6 sm:-left-8 z-50 cursor-pointer group"
        onClick={() => setShowSecret(true)}
      >
        <motion.div
          animate={{ 
            x: [0, 15, 0],
            boxShadow: ['0px 0px 10px rgba(235,189,112,0.4)', '0px 0px 20px rgba(235,189,112,0.8)', '0px 0px 10px rgba(235,189,112,0.4)']
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white/90 backdrop-blur-sm py-3 pr-4 pl-8 rounded-r-full border-[2px] border-[#ebbd70]/60 border-l-0 flex items-center justify-center hover:pr-6 transition-all"
        >
          <span className="text-2xl md:text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform group-hover:rotate-12">🎁</span>
        </motion.div>
      </div>

      {/* Secret Modal */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl max-w-sm w-full text-center relative border-[3px] border-[#ebbd70]/30"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-6xl drop-shadow-lg">
                🎁
              </div>
              
              <div className="bg-[#f0f8fb] p-6 rounded-2xl mb-6 mt-6">
                <p className="text-slate-700 font-medium leading-relaxed">
                  "hẹn bạn 1 ngày rảnh =))) có thể đi lại cái trip vũng tàu hoặc lại đi chơi típ"
                </p>
              </div>

              <button 
                onClick={() => setShowSecret(false)}
                className="bg-gradient-to-r from-[#8bbcd1] to-[#a379c0] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Chốt đơn luôn!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
