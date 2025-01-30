import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import Logo from "./Logo";

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

export function Footer() {
  return (
    <footer className="bg-pri-beige">
      {/* Reviews Section */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8 text-pri-blue">
          آراء عملائنا
        </h2>
        <div className="relative">
          <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-6 snap-x">
            {reviews.map((review, index) => (
              <Card
                key={index}
                className="min-w-[280px] sm:min-w-[300px] md:min-w-[350px] snap-center"
              >
                <CardContent className="p-4 lg:p-6">
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
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm lg:text-base">
                        {review.author}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Hide navigation buttons on mobile, show on larger screens */}
          <button className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
            <ChevronLeft className="h-6 w-6 text-pri-blue" />
          </button>
          <button className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
            <ChevronRight className="h-6 w-6 text-pri-blue" />
          </button>
        </div>
      </div>

      {/* Request More Information Section */}
      <div className="bg-pri-beige py-8 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-pri-blue">
            Request More Information
          </h2>
          <p className="text-gray-600 mb-6 lg:mb-8 max-w-2xl mx-auto text-right text-sm lg:text-base">
            منتجاتنا مرخصة من وزارة الصحة ومصنعة في مصانع مرخصة من جمعية
            الإمارات للغوص وحاصلة على شهادة الجودة تحت إشراف كامل من الأطباء
            والصيادلة
          </p>
          <Button className="bg-[#11238C] hover:bg-[#0D1B6D] text-white px-6 lg:px-8 py-2 rounded-full text-sm lg:text-base">
            تواصل معنا
          </Button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-6 lg:py-8">
          {/* Copyright */}
          <div className="text-center mb-6 lg:mb-8 text-gray-500 py-4 lg:py-6 border-b">
            <p className="text-sm lg:text-base">© 2025 Lift Media, LLC</p>
          </div>

          {/* Mobile Layout: Stack all elements */}
          <div className="flex flex-col gap-8 lg:hidden">
            <div className="flex justify-center">
              <Link href="/">
                <Logo />
              </Link>
            </div>

            <div className="flex justify-center gap-4">
              {/* Social Media Icons */}
              <Link href="#" className="text-gray-400 hover:text-pri-blue">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pri-blue">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pri-blue">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pri-blue">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col items-center gap-4 text-sm">
              <Link
                href="/return-policy"
                className="text-gray-600 hover:text-pri-blue"
              >
                سياسة الاسترجاع
              </Link>
              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-pri-blue"
              >
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-pri-blue">
                الشروط والأحكام
              </Link>
            </div>
          </div>

          {/* Desktop Layout: Side by side */}
          <div className="hidden lg:flex justify-between items-center">
            {/* Social Media Icons - Right Side */}
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-pri-blue">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pri-blue">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pri-blue">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pri-blue">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>

            {/* Navigation Links - Center */}
            <div className="flex justify-center gap-6">
              <Link
                href="/return-policy"
                className="text-gray-600 hover:text-pri-blue"
              >
                سياسة الاسترجاع
              </Link>
              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-pri-blue"
              >
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-pri-blue">
                الشروط والأحكام
              </Link>
            </div>

            {/* Logo - Left Side */}
            <div>
              <Link href="/">
                <Logo />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
