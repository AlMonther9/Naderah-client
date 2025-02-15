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
    <div className="mb-8 border-b border-gray-300">
      <Tabs className="bg-transparent" value={activeCategory}>
        <TabsList className="bg-transparent flex">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              onClick={() => onCategoryChange(category.id)}
              className="border-0 text-base font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
