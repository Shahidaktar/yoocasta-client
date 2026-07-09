import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down past 400px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { type: 'spring', damping: 15, stiffness: 200 }
          }}
          exit={{ opacity: 0, scale: 0.5, y: 20, transition: { duration: 0.2 } }}
          whileHover={{ 
            scale: 1.12,
            y: -4,
            transition: { y: { repeat: Infinity, duration: 0.6, repeatType: 'reverse', ease: 'easeInOut' } }
          }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          type="button"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#ec4a9e] text-white shadow-lg shadow-[#ec4a9e]/40 outline-none cursor-pointer group border border-white/15"
        >
          {/* Internal Arrow Transition Hover Layout */}
          <motion.div
            variants={{
              initial: { y: 0 },
              hover: { y: -2 }
            }}
            initial="initial"
            whileHover="hover"
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            <ArrowUp className="h-5 w-5 stroke-[2.5]" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}