
import { LanguageProvider } from '@/context/language-context'
import HeroSection from '@/components/home/heroSection/HeroSection'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import WhyChooseUs from '@/components/home/WhyChooseUs'
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
      </div>
    </LanguageProvider>
  )
}

