"use client";

import React, { useState, useEffect } from "react";
import { useSlider } from "@/hooks/useSlider";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Check,
} from "lucide-react";
import { FeaturedProduct } from "@/app/types/product";

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [error, setError] = useState<string>("");
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
            : Array.from({ length: 7}, (_, i) => ({
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
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const { currentIndex, sliderRef, scrollLeft, scrollRight } =
    useSlider(products);

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
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            onClick={scrollRight}
            disabled={currentIndex === products.length - 1}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Products Slider */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-8"
          >
            {loading ? (
              // Show a simple loading message or skeleton if desired
              <div className="flex items-center justify-center w-full">
                <p>Loading featured products...</p>
              </div>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              products.map((product) => (
                <Card key={product.id} className="w-64 flex-shrink-0 relative">
                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.name)}
                    className="absolute top-3 right-3 backdrop-blur-sm p-1 rounded-md shadow"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.includes(product.name)
                          ? "text-pri-900"
                          : "text-pri-50"
                      }`}
                    />
                  </button>

                  {/* Product Image */}
                  <CardContent className="p-0">
                    <img
                      src={
                        product.images ||
                        "/placeholder.svg?height=200&width=200"
                      }
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </CardContent>

                  {/* Product Info */}
                  <div className="text-center mt-2">
                    <h3 className="text-lg font-medium">{product.name}</h3>
                    <span className="text-sec-700 font-bold text-lg">
                      {product.price} LE
                    </span>
                    {product.is_discount_active === "true" && (
                      <span className="block text-pri-900">
                        {product.discounted_price} LE
                      </span>
                    )}
                    {product.average_rating > 0 && (
                      <span className="block text-gray-600">
                        Rating: {product.average_rating}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <CardFooter>
                    <Button
                      onClick={() => addToCart(product.name)}
                      className={`w-full flex items-center gap-2 ${
                        cart.includes(product.name)
                          ? "bg-[#CECECEC9] text-gray-600 cursor-not-allowed hover:bg-[#CECECEC9]"
                          : "bg-pri-900 hover:bg-pri-700 text-white"
                      }`}
                    >
                      {cart.includes(product.name) ? (
                        <>
                          <Check className="w-4 h-4" /> تمت الإضافة
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" /> أضف إلى السلة
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
