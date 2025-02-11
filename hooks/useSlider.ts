import { useState, useRef } from "react";

export function useSlider<T>(items: T[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.clientWidth,
        behavior: "smooth",
      });
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.clientWidth,
        behavior: "smooth",
      });
      setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));
    }
  };

  return { currentIndex, sliderRef, scrollLeft, scrollRight };
}
