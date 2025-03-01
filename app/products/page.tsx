"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { CategoryHero } from "@/components/products/CategoryHero";
import { CategoriesNav } from "@/components/products/CategoriesNav";
import { ProductsGrid } from "@/components/products/ProductsGrid";

// Define categories for the tabs
const categories = [
  { id: "all", label: "الكل" },
  { id: "hair", label: "الشعر" },
  { id: "skin", label: "البشرة" },
  { id: "body", label: "الجسم" },
  { id: "tea", label: "ركن الطيب" },
  { id: "packages", label: "باقات جمالية" },
];

// Example filters (for now, UI only)
const filters = [
  {
    id: "type",
    label: "تصنيف",
    options: ["عضوي", "طبيعي", "مستخلص نباتي"],
  },
  {
    id: "concern",
    label: "تصنيف",
    options: ["تساقط الشعر", "الشعر الجاف", "فروة الرأس"],
  },
  {
    id: "price",
    label: "تصنيف",
    options: ["أقل من 100", "100 - 200", "أكثر من 200"],
  },
];

// Mock products with a category field for filtering
const mockProducts = [
  {
    id: 1,
    name: "زيت الشعر الطبيعي",
    price: 149.99,
    category_name: "hair",
    desc: "وصف المنتج",
    discounted_price: "129.99",
    is_discount_active: "true",
    images: "/placeholder.svg?height=300&width=300",
    average_rating: 4.5,
  },
  {
    id: 2,
    name: "شامبو عشبي",
    price: 89.99,
    category_name: "hair",
    desc: "وصف المنتج",
    discounted_price: "79.99",
    is_discount_active: "false",
    images: "/placeholder.svg?height=300&width=300",
    average_rating: 3.5,
  },
  {
    id: 3,
    name: "بلسم مغذي",
    price: 99.99,
    category_name: "skin",
    desc: "وصف المنتج",
    discounted_price: "89.99",
    is_discount_active: "true",
    images: "/placeholder.svg?height=300&width=300",
    average_rating: 4.0,
  },
];

// Mapping for hero data by category
const heroMapping: Record<
  string,
  { title: string; description: string; image: string }
> = {
  all: {
    title: "جميع المنتجات",
    description: "كل منتجاتنا بجودة عالية للعناية بكل تفاصيل جمالك.",
    image: "/all.jpg",
  },
  hair: {
    title: "منتجات الشعر",
    description:
      "اكتشفي أفضل المنتجات للعناية بشعرك، مع تركيبات طبيعية تدعم صحة فروة الرأس.",
    image: "/hair.png",
  },
  body: {
    title: "منتجات الجسم",
    description:
      "احصلي على بشرة ناعمة ومشرقة مع منتجات الجسم المتميزة التي تجمع بين الطبيعة والتكنولوجيا.",
    image: "/body.png",
  },
  skin: {
    title: "منتجات البشرة",
    description:
      "مُنتجات بجودة عالية للعناية الكاملة بالبشرة. ابدئي رحلة العناية ببشرتك اليوم!",
    image: "/skin.png",
  },
  tea: {
    title: "ركن الطيب",
    description:
      "تشكيلة رائعة من العطور والمستحضرات الطبيعية التي تبهج حواسك وتضفي لمسة فاخرة.",
    image: "/scent.png",
  },
  packages: {
    title: "باقات جمالية",
    description:
      "باقة متكاملة من المنتجات لتجربة جمالية فريدة، مصممة خصيصاً لكِ.",
    image: "/packages.png",
  },
};

export default function ProductsPage() {
  // Track the active category (default to 'all')
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter products based on active category
  const filteredProducts =
    activeCategory === "all"
      ? mockProducts
      : mockProducts.filter((p) => p.category_name === activeCategory);

  // Get hero data for the current category
  const currentHero = heroMapping[activeCategory] || heroMapping["all"];

  return (
    // Set RTL direction for the entire page
    <div className="w-full" dir="rtl">
      {/* Top Hero Section */}
      <CategoryHero
        title={currentHero.title}
        description={currentHero.description}
        image={currentHero.image}
      />

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <main className="flex-1 space-y-8 order-2 md:order-1">
            {/* Mobile Filter Button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="ml-2 h-4 w-4" />
                    تصفية المنتجات
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>التصفية</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    {filters.map((filter) => (
                      <Accordion key={filter.id} type="single" collapsible>
                        <AccordionItem value={filter.id}>
                          <AccordionTrigger>{filter.label}</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-2">
                              {filter.options.map((option) => (
                                <div key={option} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`mobile-${option}`}
                                    className="rounded border-gray-300 text-primary focus:ring-primary"
                                  />
                                  <label
                                    htmlFor={`mobile-${option}`}
                                    className="mr-2 text-sm"
                                  >
                                    {option}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            {/* Categories Navigation */}
            <CategoriesNav
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {/* Products Grid */}
            <ProductsGrid products={filteredProducts} />
          </main>
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-32 space-y-6 order-1 md:order-2 mt-28">
            {filters.map((filter) => (
              <Accordion key={filter.id} type="single" collapsible>
                <AccordionItem value={filter.id}>
                  <AccordionTrigger>{filter.label}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <div key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            id={option}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <label htmlFor={option} className="mr-2 text-sm">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
}
