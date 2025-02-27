"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ImagesSlider from "./ImagesSlider";
import Link from "next/link";

// Separate interface for better type management
interface HeroContentProps {
  isShoppingHovered: boolean;
  setIsShoppingHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ButtonProps {
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeroSection = () => {
  const [isShoppingHovered, setIsShoppingHovered] = useState(false);

  const images = [
    process.env.NEXT_PUBLIC_HERO_IMAGE_1 || "",
    process.env.NEXT_PUBLIC_HERO_IMAGE_2 || "",
    process.env.NEXT_PUBLIC_HERO_IMAGE_3 || "",
    process.env.NEXT_PUBLIC_HERO_IMAGE_4 || "",
    process.env.NEXT_PUBLIC_HERO_IMAGE_5 || "",
    process.env.NEXT_PUBLIC_HERO_IMAGE_6 || ""
  ].filter(Boolean);

  return (
    <div className="w-full flex justify-center py-3 md:py-6 lg:py-6 px-4 md:px-8 lg:px-16">
      <ImagesSlider
        className="h-[80vh] w-full max-w-screen-xl" // Control max width
        images={images}
      >
        <HeroContent
          isShoppingHovered={isShoppingHovered}
          setIsShoppingHovered={setIsShoppingHovered}
        />
      </ImagesSlider>
    </div>
  );
};

const HeroContent = ({
  isShoppingHovered,
  setIsShoppingHovered,
}: HeroContentProps) => (
  <motion.div
    initial={{
      opacity: 0,
      y: -80,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      duration: 0.6,
    }}
    className="z-50 flex flex-col items-center justify-center"
  >
    <motion.p className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text py-4 text-center font-bold text-transparent text-6xl">
      مساحة اعلانية
    </motion.p>

    <motion.p className="mt-4 mb-4 text-center text-xl font-sans max-w-3xl px-3 text-white">
      جميع منتجاتنا مستخلصة من الطبيعة لضمان أعلى جودة وأمان.جميع منتجاتنا
      مستخلصة من الطبيعة لضمان أعلى جودة وأمان.
    </motion.p>

    <ShoppingButton
      isHovered={isShoppingHovered}
      setIsHovered={setIsShoppingHovered}
    />
  </motion.div>
);

const ShoppingButton = ({ isHovered, setIsHovered }: ButtonProps) => (
  <Link
    href="/products"
    className="group"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <button className="relative mx-auto mt-9 flex items-center gap-2 rounded-xl bg-zinc-800/30 px-6 py-2 text-center text-white opacity-90 outline outline-2 brightness-125 backdrop-blur-sm transition-all duration-200">
      <span>تسوقي الآن</span>
      <ArrowLeft
        className={`h-4 w-4 transition-transform duration-200 ${isHovered ? "-translate-x-3" : ""}`}
      />
      <div className="absolute inset-x-0 -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent to-transparent dark:via-caribbean-green-700" />
    </button>
  </Link>
);

export default HeroSection;
