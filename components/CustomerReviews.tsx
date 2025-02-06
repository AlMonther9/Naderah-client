/* import React, { useState, useRef, memo } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
  {
    text: "استخدمت منتجات العناية بالبشرة من هذا الموقع واندهشت من كم كانت مؤثرة في بشرتي. كل شيء أصلي وسهل الاستخدام. شكراً لكم!",
    author: "مريم احمد",
    rating: 5,
  },
  {
    text: "استخدمت منتجات العناية بالبشرة من هذا الموقع واندهشت من كم كانت مؤثرة في بشرتي. كل شيء أصلي وسهل الاستخدام. شكراً لكم!",
    author: "مريم احمد",
    rating: 5,
  },
  {
    text: "استخدمت منتجات العناية بالبشرة من هذا الموقع واندهشت من كم كانت مؤثرة في بشرتي. كل شيء أصلي وسهل الاستخدام. شكراً لكم!",
    author: "مريم احمد",
    rating: 5,
  },
];

interface ReviewCardProps {
  review: {
    text: string;
    author: string;
    rating: number;
  };
  isActive: boolean;
}

const ReviewCard = memo(({ review, isActive }: ReviewCardProps) => (
  <Card
    className={`min-w-[280px] sm:min-w-[300px] md:min-w-[350px] snap-center ${isActive ? "scale-105" : ""}`}
  >
    <CardContent className="p-4 lg:p-6 h-full flex flex-col justify-between">
      <p className="text-gray-600 mb-4 text-right text-sm lg:text-base">
        {review.text}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {[...Array(review.rating)].map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400 fill-current"
            />
          ))}
        </div>
        <span className="font-semibold text-sm lg:text-base">
          {review.author}
        </span>
      </div>
    </CardContent>
  </Card>
));

interface CustomerReviewsProps {
  reviews: {
    text: string;
    author: string;
    rating: number;
  }[];
}

export const CustomerReviews = memo(({ reviews }: CustomerReviewsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.clientWidth,
        behavior: "smooth",
      });
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.clientWidth,
        behavior: "smooth",
      });
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8 text-pri-blue">
        آراء عملائنا
      </h2>
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-4 lg:gap-6 overflow-x-auto pb-6 snap-x scroll-smooth"
        >
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              review={review}
              isActive={index === currentIndex}
            />
          ))}
        </div>
        {currentIndex > 0 && (
          <button
            className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-6 w-6 text-pri-blue" />
          </button>
        )}
        {currentIndex < reviews.length - 1 && (
          <button
            className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
            onClick={scrollRight}
          >
            <ChevronRight className="h-6 w-6 text-pri-blue" />
          </button>
        )}
      </div>
    </div>
  );
});
 */