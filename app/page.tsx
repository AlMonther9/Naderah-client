'use client'

import { LanguageProvider } from '@/context/language-context'
import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { CategoriesSection } from '@/components/CategoriesSection'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { CustomerReviews } from '@/components/CustomerReviews'

export default function Home() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <HeroSection />
          <CategoriesSection />
          <FeaturedProducts />
          <WhyChooseUs />
          <CustomerReviews />
        </main>
        <footer className="bg-[#11238C] text-white py-8">
          <div className="container px-4 mx-auto text-center">
            <p>&copy; 2024 نَضِرَة. جميع الحقوق محفوظة.</p>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  )
}

