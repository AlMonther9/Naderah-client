import React, { useMemo, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Separate interface for better type management
interface ImagesSliderProps {
  images: string[];
  children: React.ReactNode;
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: 'up' | 'down';
  interval?: number;
}

// Separate variants to reduce component complexity
const getSlideVariants = () => ({
  initial: {
    scale: 0,
    opacity: 0,
    rotateX: 45
  },
  visible: {
    scale: 1,
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.645, 0.045, 0.355, 1.0]
    }
  },
  upExit: {
    opacity: 1,
    y: '-150%',
    transition: {
      duration: 1
    }
  },
  downExit: {
    opacity: 1,
    y: '150%',
    transition: {
      duration: 1
    }
  }
});

// Custom hook to manage slider state and logic
const useImagesSlider = (images: string[], autoplay = true, interval = 5000) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 === images.length ? 0 : prevIndex + 1));
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]);

  // autoplay logic
  React.useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (autoplay) {
      intervalId = setInterval(handleNext, interval);
    }

    // Cleanup function
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [handleNext, handlePrevious, autoplay, interval]);

  return {
    currentIndex,
    handleNext,
    handlePrevious
  };
};

export const ImagesSlider: React.FC<ImagesSliderProps> = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = 'up',
  interval = 5000
}) => {
  // Memoize variants to prevent unnecessary re-renders
  const slideVariants = useMemo(() => getSlideVariants(), []);

  // Use the custom hook for slider management
  const { currentIndex } = useImagesSlider(images, autoplay, interval);

  const renderOverlay = () => overlay && <div className={cn('absolute inset-0 bg-black/60 z-40', overlayClassName)} />;

  const renderChildren = () => <div className='z-50 relative'>{children}</div>;

  const renderImage = () => (
    <motion.div
      key={currentIndex}
      initial='initial'
      animate='visible'
      exit={direction === 'up' ? 'upExit' : 'downExit'}
      variants={slideVariants}
      className='absolute inset-0'
    >
      <Image
        src={images[currentIndex]}
        alt={`Slider image ${currentIndex + 1}`}
        fill
        priority={false}
        loading='lazy'
        quality={75}
        className='object-cover object-center'
      />
    </motion.div>
  );

  return (
    <div
      className={cn('overflow-hidden h-full w-full relative flex items-center justify-center', className)}
      style={{
        perspective: '1000px'
      }}
    >
      {renderOverlay()}
      {renderChildren()}
      <AnimatePresence>{renderImage()}</AnimatePresence>
    </div>
  );
};

export default ImagesSlider;
