import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import Logo from "./Logo";
import { FaTelegram, FaTiktok } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-pri-50 pb-4">
      {/* Request More Information Section */}
      <div className="bg-pri-beige flex py-8 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          {/* <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-pri-blue">
            Request More Information
          </h2> */}
          <p className="text-gray-600 text-center mb-6 lg:mb-8 max-w-2xl mx-auto text-sm lg:text-base">
            منتجاتنا مرخصة من وزارة الصحة ومصنعة في مصانع مرخصة من جمعية
            الإمارات للغوص وحاصلة على شهادة الجودة تحت إشراف كامل من الأطباء
            والصيادلة
          </p>
          <Button className="bg-[#1F3A9E] hover:bg-sec-900 text-white font-bold px-6 lg:px-8 py-2 rounded-full text-sm lg:text-base">
            تواصل معنا
          </Button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="">
        <div className="container mx-auto">
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
              <Link href="#" className="text-gray-400 hover:text-sec-300">
                <FaTiktok className="h-5 w-5" />
              </Link>
              <Link href="https://www.facebook.com/NaderaSkinCare" className="text-gray-400 hover:text-sec-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/nadera_egypt?fbclid=IwY2xjawItk6RleHRuA2FlbQIxMAABHXEgzrtH0l3HvButXMdyqGvMSEZooo9Qvq8JmtoFH_qbLbjLaiGwlHhJaA_aem_aIBP6P0HCHGoYjuzC8p40Q" className="text-gray-400 hover:text-sec-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-sec-300">
                <FaTelegram className="h-5 w-5" />
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
              <Link href="#" className="text-gray-400 hover:text-sec-300">
                <FaTiktok className="h-5 w-5" />
              </Link>
              <Link href="https://www.facebook.com/NaderaSkinCare" className="text-gray-400 hover:text-sec-300">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/nadera_egypt?fbclid=IwY2xjawItk6RleHRuA2FlbQIxMAABHXEgzrtH0l3HvButXMdyqGvMSEZooo9Qvq8JmtoFH_qbLbjLaiGwlHhJaA_aem_aIBP6P0HCHGoYjuzC8p40Q" className="text-gray-400 hover:text-sec-300">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-sec-300">
                <FaTelegram className="h-5 w-5" />
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
