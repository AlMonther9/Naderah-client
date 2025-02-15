"use client";

import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import { FeaturedProduct } from "@/app/types/product";

interface ProductsGridProps {
  products: FeaturedProduct[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  // State for wishlist and cart, managed at the grid level
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const addToCart = (productName: string) => {
    setCart((prev) =>
      prev.includes(productName) ? prev : [...prev, productName]
    );
  };

  const toggleWishlist = (productName: string) => {
    setWishlist((prev) =>
      prev.includes(productName)
        ? prev.filter((name) => name !== productName)
        : [...prev, productName]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInWishlist={wishlist.includes(product.name)}
            isInCart={cart.includes(product.name)}
            toggleWishlist={() => toggleWishlist(product.name)}
            addToCart={() => addToCart(product.name)}
          />
        ))}
      </div>
    </div>
  );
}
