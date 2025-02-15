"use client";

import React, { useState, useEffect } from "react";
import { useSlider } from "@/hooks/useSlider";
import { ProductCard } from "@/components/products/ProductCard";
import { FeaturedProduct } from "@/app/types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/store/featured-products/");
        if (!response.ok) {
          throw new Error("Failed to fetch featured products");
        }
        const data: FeaturedProduct[] = await response.json();

        // If data is empty, use a fallback array of 7 unique placeholder items.
        setProducts(
          data.length > 0
            ? data
            : Array.from({ length: 7 }, (_, i) => ({
                id: i + 1,
                name: `بديل الليزر ${i + 1}`,
                price: 100,
                images: "/assets/images/hero/hero-1.png?height=200&width=200",
                desc: "",
                discounted_price: "",
                is_discount_active: "false",
                category_name: "",
                average_rating: 0,
              }))
        );
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Custom hook for slider logic
  const { currentIndex, sliderRef, scrollLeft, scrollRight } = useSlider(products);

  const toggleWishlist = (productName: string) => {
    setWishlist((prev) =>
      prev.includes(productName)
        ? prev.filter((name) => name !== productName)
        : [...prev, productName]
    );
  };

  const addToCart = (productName: string) => {
    setCart((prev) =>
      prev.includes(productName) ? prev : [...prev, productName]
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-right">أفضل المبيعات</h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            onClick={scrollLeft}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            onClick={scrollRight}
            disabled={currentIndex === products.length - 1}
          >
            <ChevronRight size={24} />
          </button>

          {/* Products Slider */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-8"
          >
            {loading ? (
              <div className="flex items-center justify-center w-full">
                <p>Loading featured products...</p>
              </div>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInWishlist={wishlist.includes(product.name)}
                  isInCart={cart.includes(product.name)}
                  toggleWishlist={() => toggleWishlist(product.name)}
                  addToCart={() => addToCart(product.name)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
