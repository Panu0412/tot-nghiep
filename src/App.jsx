import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence } from 'framer-motion';

import LoadingScreen from './components/LoadingScreen';
import IntroScreen from './components/IntroScreen';
import WelcomeSection from './components/WelcomeSection';
import InteractiveCard from './components/InteractiveCard';
import MemoryGallery from './components/MemoryGallery';
import InteractiveLetter from './components/InteractiveLetter';
import CelebrationScene from './components/CelebrationScene';
import CursorGlow from './components/CursorGlow';
import SparkleEffect from './components/SparkleEffect';

function App() {
  const [loading, setLoading] = useState(true);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#f8fafc] text-slate-800 selection:bg-[#B2D9E8] selection:text-white">
      {/* Global Interactive Effects */}
      <CursorGlow />
      <SparkleEffect />

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        ) : !introFinished ? (
          <IntroScreen key="intro" onStart={() => setIntroFinished(true)} />
        ) : (
          <main key="main-content" className="w-full">
            <WelcomeSection />
            
            <div className="h-24 bg-gradient-to-b from-[#f8fafc] to-[#f8fafc]"></div>
            
            <InteractiveCard />
            
            <div className="h-32 bg-gradient-to-b from-[#f8fafc] to-[#f8fafc]"></div>
            
            <MemoryGallery />
            
            <InteractiveLetter />
            
            <CelebrationScene />
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
