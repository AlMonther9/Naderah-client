import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const categories = [
  { name: 'Skin', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Hair', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Body', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Tea Corner', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Beauty Packages', image: '/placeholder.svg?height=200&width=200' },
]

export function CategoriesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link href={`/products/${category.name.toLowerCase()}`} key={category.name}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img src={category.image || "/placeholder.svg"} alt={category.name} className="w-full h-48 object-cover rounded-md" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

