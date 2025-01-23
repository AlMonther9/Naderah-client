import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star } from 'lucide-react'

const reviews = [
  { name: 'Sarah L.', rating: 5, comment: 'Amazing products! My skin has never looked better.' },
  { name: 'Michael R.', rating: 4, comment: 'Great quality and fast shipping. Will buy again.' },
  { name: 'Emily T.', rating: 5, comment: 'Love the natural ingredients. Highly recommend!' },
]

export function CustomerReviews() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{review.name}</CardTitle>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

