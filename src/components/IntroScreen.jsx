import { motion } from 'framer-motion';

export default function IntroScreen({ onStart }) {
  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#f8fafc] to-[#e0f0f8] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 1 }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#B2D9E8] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-2000"></div>

      <motion.div 
        className="z-10 glass-card p-10 md:p-16 rounded-3xl flex flex-col items-center text-center max-w-lg w-[90%] border border-white/50"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
      >
        <div className="mb-8 w-full flex flex-col items-center gap-2">
          <p className="text-gray-400 text-sm uppercase tracking-widest">Người gửi</p>
          <p className="text-xl md:text-2xl font-medium text-slate-700">Phan Minh Nhựt</p>
        </div>
        
        <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-[#B2D9E8] to-transparent mb-8"></div>
        
        <div className="mb-12 w-full flex flex-col items-center gap-2">
          <p className="text-gray-400 text-sm uppercase tracking-widest">Người nhận</p>
          <p className="text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#8bbcd1] to-[#b78fd1] pb-1">
            Ngô Phạm Kiều Oanh
          </p>
        </div>

        <motion.button
          onClick={onStart}
          className="relative px-8 py-4 bg-white/80 hover:bg-white text-slate-600 rounded-full font-medium tracking-wide shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 transition-all overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 group-hover:text-[#8bbcd1] transition-colors">Nhấn để bắt đầu</span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-[#B2D9E8]/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
