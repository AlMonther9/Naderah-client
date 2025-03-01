"use client";

import React, { useRef, useEffect } from "react";

interface CategoriesNavProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoriesNav({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoriesNavProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to active tab when it changes
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const activeTab = scrollContainerRef.current.querySelector(
      `[data-value="${activeCategory}"]`
    );

    if (activeTab) {
      const container = scrollContainerRef.current;
      const tabRect = activeTab.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Center the active tab if possible
      const targetScrollLeft =
        (activeTab as HTMLElement).offsetLeft -
        container.offsetLeft -
        containerRect.width / 2 +
        tabRect.width / 2;

      container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
    }
  }, [activeCategory]);

  return (
    <div className="relative mb-4 sm:mb-6">
      <div
        className="overflow-x-auto pb-2 border-b border-gray-300"
        ref={scrollContainerRef}
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
        }}
      >
        {/* Hide scrollbar for Chrome, Safari and Opera */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Mobile: scroll view, Desktop: centered with equal spacing */}
        <div className="w-full flex justify-start md:justify-center">
          <div className="bg-transparent flex whitespace-nowrap pr-4 pl-8 md:px-0 md:w-full md:justify-between">
            {categories.map((category) => (
              <button
                key={category.id}
                data-value={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`
                  bg-transparent border-0 px-3 py-2 text-sm sm:text-base font-medium flex-shrink-0
                  md:flex-1 md:flex md:justify-center
                  ${
                    activeCategory === category.id
                      ? "border-b-2 border-primary text-primary"
                      : "border-b-2 border-transparent"
                  }
                `}
                role="tab"
                aria-selected={activeCategory === category.id}
              >
                {category.label}
              </button>
            ))}
            {/* Invisible spacer for mobile view only */}
            <div
              className="w-8 flex-shrink-0 md:hidden"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>

      {/* Subtle gradient indicators - only visible on mobile */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent opacity-70 md:hidden" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent opacity-70 md:hidden" />
    </div>
  );
}
