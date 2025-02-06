import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { name: "الشعر", image: "/assets/images/hero/hero-1.png" },
  { name: "الجسم", image: "/placeholder.svg?height=200&width=200" },
  { name: "ركن الطيب", image: "/placeholder.svg?height=200&width=200" },
  { name: "حزم الجمال", image: "/placeholder.svg?height=200&width=200" },
  { name: "البشرة", image: "/placeholder.svg?height=200&width=200" },
];

export function CategoriesSection() {
  return (
    <section className="py-16 bg-pri-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 ">تسوقي اقسام نضرة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              href={`/products/${category.name.toLowerCase()}`}
              key={category.name}
            >
              <Card className="hover:shadow-lg transition-shadow relative overflow-hidden group aspect-square max-w-[360px] mx-auto">
                {/* Category Name Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white px-4 py-2 text-3xl font-bold rounded-lg">
                  {category.name}
                </div>
                {/* Category Image */}
                <CardContent className="p-0">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-lg aspect-square"
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
