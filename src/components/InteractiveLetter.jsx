import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 bg-[#e0f0f8] overflow-hidden">
      <div className="relative w-full max-w-2xl flex flex-col items-center">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-700 mb-4">Gửi bạn</h2>
          <p className="text-slate-500 font-light">Một bức thư nhỏ...</p>
        </div>

        <div className="relative w-full max-w-xl aspect-[3/2] cursor-pointer" onClick={() => setIsOpen(true)}>
          
          {/* Envelope Back */}
          <div className="absolute inset-0 bg-[#e5e7eb] rounded-md shadow-lg border border-gray-200"></div>
          
          {/* Letter Content (Slides up when open) */}
          <motion.div 
            className="absolute left-4 right-4 bg-white p-6 md:p-10 rounded-md shadow-sm border border-gray-100 flex flex-col z-10"
            initial={{ bottom: '10px', top: '10px', y: 0, scale: 1 }}
            animate={{ 
              y: isOpen ? '-60%' : '0%',
              scale: isOpen ? 1.02 : 1,
              zIndex: isOpen ? 40 : 10,
              opacity: isOpen ? 1 : 0.8
            }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.2 }}
          >
            <h3 className="text-xl text-[#8bbcd1] font-medium mb-4">Chào bạn,</h3>
            <div className="space-y-3 md:space-y-4 text-slate-600 text-sm md:text-base leading-relaxed overflow-y-auto" style={{ maxHeight: isOpen ? '50vh' : 'auto' }}>
              <p>Chúc mừng bạn đã chính thức tốt nghiệp! Bốn năm thanh xuân tại Đại học Khoa học Xã hội và Nhân văn chắc chắn đã để lại trong bạn rất nhiều kỷ niệm đẹp.</p>
              <p>Ngày hôm nay đánh dấu một cột mốc quan trọng, một cánh cửa mới mở ra với vô vàn cơ hội và cả những thử thách. Dù phía trước có khó khăn thế nào, hãy luôn giữ vững niềm tin, sự tự tin và nụ cười rạng rỡ như ngày hôm nay nhé.</p>
              <p>Chúc bạn sẽ luôn vững bước trên con đường đã chọn, gặt hái được nhiều thành công và luôn hạnh phúc.</p>
              <p className="pt-4 text-right italic font-medium text-slate-700">Người bạn của bạn,</p>
              <p className="text-right text-[#8bbcd1]">Phan Minh Nhựt</p>
            </div>
          </motion.div>

          {/* Envelope Front Left/Right flaps (Static) */}
          <div className="absolute inset-0 z-20 pointer-events-none" style={{
            clipPath: 'polygon(0 0, 0 100%, 50% 50%)',
            background: '#f3f4f6'
          }}></div>
          <div className="absolute inset-0 z-20 pointer-events-none" style={{
            clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)',
            background: '#f3f4f6'
          }}></div>
          <div className="absolute inset-0 z-20 pointer-events-none border-b border-gray-200" style={{
            clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)',
            background: '#f9fafb'
          }}></div>

          {/* Envelope Top Flap */}
          <motion.div 
            className="absolute inset-0 z-30 origin-top pointer-events-none"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 50%)',
              background: '#ffffff',
              borderBottom: '1px solid #e5e7eb'
            }}
          ></motion.div>

          {/* Ribbon */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div 
                className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-[#B2D9E8] shadow-md flex items-center justify-center border-4 border-white">
                  <span className="text-white text-2xl">🎀</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              onClick={() => setIsOpen(false)}
              className="mt-40 px-6 py-2 rounded-full border border-[#B2D9E8] text-[#B2D9E8] hover:bg-[#B2D9E8] hover:text-white transition-colors"
            >
              Đóng thư
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
