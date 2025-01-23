import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

const reasons = [
  'Natural Ingredients',
  'Cruelty-Free',
  'Eco-Friendly Packaging',
  'Scientifically Proven Results',
]

export function WhyChooseUs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason) => (
            <Card key={reason}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  {reason}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

