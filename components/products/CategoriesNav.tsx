"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  return (
    <div className="mb-8 border-b border-gray-300 overflow-ellipsis">
      <Tabs value={activeCategory}>
        <TabsList className="bg-transparent flex space-x-4 whitespace-nowrap">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              onClick={() => onCategoryChange(category.id)}
              className="bg-transparent border-0 px-0 py-2 text-base font-medium flex-shrink-0 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
