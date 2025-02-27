"use client";

import { useSlider } from "@/hooks/useSlider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    text: "استخدمت منتجات العناية بالبشرة من هذا الموقع ووجدت نتائج مذهلة، بشرتي أصبحت أكثر نعومة وتألقاً.",
    author: "مريم أحمد",
    rating: 5,
  },
  {
    text: "تجربتي مع هذا الموقع كانت ممتازة، الخدمة سريعة والمنتجات ذات جودة عالية.",
    author: "فاطمة علي",
    rating: 4,
  },
  {
    text: "منتجات فعالة وخدمة عملاء رائعة، أنصح بها لكل من يبحث عن العناية بالبشرة.",
    author: "سارة محمد",
    rating: 3,
  },
  {
    text: "لاحظت تحسناً ملحوظاً في بشرتي بعد استخدام المنتجات، تجربة مميزة بكل المقاييس.",
    author: "نورة حسن",
    rating: 5,
  },
  {
    text: "تجربة رائعة من البداية حتى النهاية، جودة المنتج مذهلة وسعر مناسب.",
    author: "ليلى حسين",
    rating: 4,
  },
];


export function CustomerReviews() {
  const { sliderRef, scroll } = useSlider(reviews);

  return (
    <div className="container mx-auto px-6 py-8  lg:py-12 text-center">
      {/* Section Title */}
      <h2 className="text-2xl lg:text-3xl font-bold text-[#171721] mb-6">
        آراء عملائنا
      </h2>

      {/* Reviews Slider */}
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto snap-x scroll-smooth pb-6"
        >
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px] bg-[#FCF9F9] snap-center border-[#171721] rounded-lg shadow-sm"
            >
              <CardContent className="p-5 flex flex-col gap-4 text-right">
                {/* Review Text */}
                <p className="text-gray-600">{review.text}</p>

                {/* Separator */}
                <div className="border-t border-gray-300"></div>

                {/* Footer: Stars & Author */}
                <div className="flex justify-between items-center">
                  {/* Author Name */}
                  <span className="font-semibold text-sm">{review.author}</span>
                  {/* Star Ratings */}
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-[#FF7894] fill-current"
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-3 mt-6">
          <Button
            variant="outline"
            className="w-8 h-8 rounded-md shadow-md border
      bg-[#FF7894] hover:bg-[#FF5C78] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => scroll("left")}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            className="w-8 h-8 rounded-md shadow-md border
      bg-[#FF7894] hover:bg-[#FF5C78] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => scroll("right")}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

        </div>
      </div>
    </div>
  );
}
