export type FeaturedProduct = {
  id: number;
  name: string;
  desc: string;
  price: number;
  discounted_price?: string;
  is_discount_active: string;
  images: string;
  category_name: string;
  average_rating: number;
};
