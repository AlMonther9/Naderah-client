import { useState, useRef } from "react";

export function useSlider<T>(items: T[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: direction === "left" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });

    setCurrentIndex((prev) =>
      direction === "left"
        ? Math.min(prev + 1, items.length - 1)
        : Math.max(prev - 1, 0)
    );
  };

  const atStart = currentIndex === 0;
  const atEnd = currentIndex === items.length - 1;

  return { currentIndex, sliderRef, scroll, atStart, atEnd };
}
