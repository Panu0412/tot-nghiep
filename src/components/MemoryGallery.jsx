import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';

export default function MemoryGallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    // Vite's import.meta.glob to load all images in assets/picture
    const loadImages = async () => {
      const modules = import.meta.glob('../assets/picture/*.{png,jpg,jpeg,webp}');
      const imagePromises = Object.keys(modules).map(async (path) => {
        const mod = await modules[path]();
        return mod.default;
      });
      const resolvedImages = await Promise.all(imagePromises);
      setImages(resolvedImages);
    };
    loadImages();
  }, []);

  const handleCapture = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
  };

  return (
    <section className="relative min-h-screen py-20 px-4 bg-gradient-to-b from-[#f8fafc] to-[#e0f0f8] overflow-hidden">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif text-slate-700 mb-4">Góc Kỷ Niệm</h2>
        <p className="text-slate-500 font-light">Những khoảnh khắc đáng nhớ</p>
        
        <button 
          onClick={handleCapture}
          className="mt-6 mx-auto flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all text-[#B2D9E8] hover:text-[#8bbcd1]"
        >
          <Camera size={20} />
        </button>
      </div>

      <div className="relative max-w-5xl mx-auto min-h-[60vh] flex flex-wrap justify-center items-center gap-8">
        {images.length > 0 ? (
          images.map((src, index) => {
            const randomRotate = (Math.random() - 0.5) * 30; // -15 to 15 deg
            const randomY = (Math.random() - 0.5) * 40;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0, rotate: randomRotate * 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: randomRotate, y: randomY }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                onClick={() => setSelectedImage(src)}
                className="relative p-3 pb-10 bg-white rounded-sm shadow-xl cursor-pointer w-48 md:w-56"
              >
                <div className="w-full aspect-[3/4] bg-gray-100 overflow-hidden">
                  <img src={src} alt="Memory" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            )
          })
        ) : (
          <p className="text-slate-400 font-light italic">Chưa có ảnh nào trong thư mục src/assets/picture</p>
        )}
      </div>

      {/* Camera Flash Effect */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-[60] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md cursor-zoom-out"
          >
            <motion.img
              src={selectedImage}
              alt="Zoomed Memory"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
