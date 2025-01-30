import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const featuredProducts = [
  { name: 'Natural Face Cream', price: 29.99, image: '/placeholder.svg?height=200&width=200' },
  { name: 'Organic Shampoo', price: 19.99, image: '/placeholder.svg?height=200&width=200' },
  { name: 'Herbal Body Lotion', price: 24.99, image: '/placeholder.svg?height=200&width=200' },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.name}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <span className="text-lg font-bold">${product.price}</span>
                <Button>Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

