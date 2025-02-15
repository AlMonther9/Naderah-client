"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { FeaturedProduct } from "@/app/types/product";

export interface ProductCardProps {
  product: FeaturedProduct;
  isInWishlist: boolean;
  isInCart: boolean;
  toggleWishlist: () => void;
  addToCart: () => void;
}

export function ProductCard({
  product,
  isInWishlist,
  isInCart,
  toggleWishlist,
  addToCart,
}: ProductCardProps) {
  return (
    <Card className="w-64 flex-shrink-0 relative">
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 backdrop-blur-sm p-1 rounded-md shadow"
      >
        <Heart
          className={`w-5 h-5 ${isInWishlist ? "text-pri-900" : "text-pri-50"}`}
        />
      </button>

      {/* Product Image */}
      <CardContent className="p-0">
        <img
          src={product.images || "/placeholder.svg?height=200&width=200"}
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
        {/* Uncomment and adjust these sections if needed
        {product.is_discount_active === "true" && (
          <span className="block text-pri-900">
            {product.discounted_price} LE
          </span>
        )}
        {product.average_rating > 0 && (
          <span className="block text-gray-600">
            Rating: {product.average_rating}
          </span>
        )} */}
      </div>

      {/* Add to Cart Button */}
      <CardFooter>
        <Button
          onClick={addToCart}
          className={`w-full flex items-center gap-2 ${
            isInCart
              ? "bg-[#CECECEC9] text-gray-600 cursor-not-allowed hover:bg-[#CECECEC9]"
              : "bg-pri-900 hover:bg-pri-700 text-white"
          }`}
        >
          {isInCart ? (
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
  );
}
