'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter, ShoppingCart } from 'lucide-react'

const categories = [
  { id: 'all', label: 'الكل' },
  { id: 'hair', label: 'الشعر' },
  { id: 'body', label: 'الجسم' },
  { id: 'skin', label: 'البشرة' },
  { id: 'tea', label: 'ركن الطيب' },
  { id: 'packages', label: 'باقات جمالية' },
]

const filters = [
  {
    id: 'type',
    label: 'تصنيف',
    options: ['عضوي', 'طبيعي', 'مستخلص نباتي']
  },
  {
    id: 'concern',
    label: 'تصنيف',
    options: ['تساقط الشعر', 'الشعر الجاف', 'فروة الرأس']
  },
  {
    id: 'price',
    label: 'تصنيف',
    options: ['أقل من 100', '100 - 200', 'أكثر من 200']
  },
]

const products = [
  {
    id: 1,
    name: 'زيت الشعر الطبيعي',
    price: 149.99,
    image: '/placeholder.svg?height=300&width=300'
  },
  {
    id: 2,
    name: 'شامبو عشبي',
    price: 89.99,
    image: '/placeholder.svg?height=300&width=300'
  },
  {
    id: 3,
    name: 'بلسم مغذي',
    price: 99.99,
    image: '/placeholder.svg?height=300&width=300'
  },
  // Add more products as needed
]

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('hair')

  return (
    <div className="container px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Mobile Filter Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="ml-2 h-4 w-4" />
                تصفية المنتجات
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>التصفية</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                {filters.map((filter) => (
                  <Accordion key={filter.id} type="single" collapsible>
                    <AccordionItem value={filter.id}>
                      <AccordionTrigger>{filter.label}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {filter.options.map((option) => (
                            <div key={option} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`mobile-${option}`}
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label htmlFor={`mobile-${option}`} className="mr-2 text-sm">
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-64 space-y-6">
            {filters.map((filter) => (
              <Accordion key={filter.id} type="single" collapsible>
                <AccordionItem value={filter.id}>
                  <AccordionTrigger>{filter.label}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <div key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            id={option}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <label htmlFor={option} className="mr-2 text-sm">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Category Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">منتجات الشعر</h1>
              <p className="text-gray-600 text-sm md:text-base">
                منتجات بجودة عالية للعناية الكاملة بالأثر العربية. ابدأي رحلة العناية بشعرك اليوم!
              </p>
            </div>

            {/* Category Tabs - Scrollable on mobile */}
            <div className="mb-8 overflow-x-auto">
              <Tabs defaultValue={activeCategory}>
                <TabsList className="w-full inline-flex min-w-max">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full aspect-square object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-base md:text-lg mb-2">{product.name}</CardTitle>
                    <p className="text-primary font-bold">{product.price} ر.س</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">
                      <ShoppingCart className="ml-2 h-4 w-4" />
                      أضف إلى السلة
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

