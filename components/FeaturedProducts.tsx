import React, { useRef, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Check,
} from "lucide-react";

const featuredProducts = [
  {
    name: "بديل الليزر",
    price: 100,
    image: "/assets/images/hero/hero-1.png?height=200&width=200",
  },
  {
    name: "التراب السحري",
    price: 310,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "زخرفة ( 400 جرام )",
    price: 430,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "1اسم المنتج",
    price: 110,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "2اسم المنتج",
    price: 110,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "3اسم المنتج",
    price: 110,
    image: "/placeholder.svg?height=200&width=200",
  },
];

export function FeaturedProducts() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const toggleWishlist = (productName: string) => {
    // TODO: Implement API call for wishlist management
    setWishlist((prev) =>
      prev.includes(productName)
        ? prev.filter((name) => name !== productName)
        : [...prev, productName]
    );
  };

  const addToCart = (productName: string) => {
    // TODO: Implement API call for cart management
    setCart((prev) =>
      prev.includes(productName) ? prev : [...prev, productName]
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-right">أفضل المبيعات</h2>
        <div className="relative">
          {/* Slider Buttons */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            onClick={scrollLeft}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
            onClick={scrollRight}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
          {/* Product Cards Slider */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-8"
          >
            {featuredProducts.map((product) => (
              <Card key={product.name} className="w-64 flex-shrink-0 relative">
                {/* Wishlist Heart Icon */}
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
                    src={product.image}
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
                </div>
                {/* Add to Cart Button */}
                <CardFooter>
                  <Button
                    onClick={() => addToCart(product.name)}
                    className={`w-full flex items-center gap-2 ${
                      cart.includes(product.name)
                        ? "bg-[#CECECEC9] text-gray-600  cursor-not-allowed hover:bg-[#CECECEC9]"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
