"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex items-center bg-white">
      {/* Main container */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image Section (Left Side for RTL) */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/body-butter-image.png"
                alt="نضرة زبدة الجسم"
                fill
                className="object-cover"
                priority
              />
              {/* Floating text overlay */}
              <div className="absolute bottom-0 right-0 left-0  pr-12 pl-32 bg-gradient-to-t from-black/60 to-transparent border-spacing-y-">
                <p className="text-lg font-bold text-white text-right leading-relaxed">
                  بداية الموسم البارد وتقلب الجو أمر مزعج للبشرة الرقيقة، لذلك
                  .زبدة "نضرة" برائحة رقة مناسبة تماماً
                </p>
                <button className="mt-4 pb-9 left-0 text-white font-sans flex justify-self-end items-center gap-2 hover:opacity-80 transition-opacity mr-auto">
                  <span className="underline underline-offset-8">استكشفي</span>
                  <ArrowUp className="rotate-45 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Text Section (Right Side for RTL) */}
          <div className="order-2 lg:order-1 text-right">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
              <span className="block">اكتشفي جمالك</span>
              <span className="block">
                الطبيعيّ مع <span className="text-[#11238C]">نضرة</span>
              </span>
            </h1>
            <Button
              size="lg"
              className="bg-[#11238C] hover:bg-[#0D1B6D] text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 text-lg"
            >
              تسوقي الآن
              <ArrowLeft size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Background Element */}
      <div className="absolute top-1/4 right-0 w-1/3 h-2/3 bg-[#F8F3F0] -z-10 opacity-50 rounded-full blur-3xl" />
    </section>
  );
}
