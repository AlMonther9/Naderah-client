const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const apiEndpoints = {
  featuredProducts: `${BASE_URL}/store/featured-products/`,
  products: (
    max_price?: number,
    min_price?: number,
    ordering?: string,
    page?: number,
    price?: number,
    search?: string
  ) => {
    const params = new URLSearchParams();
    if (max_price) params.append("max_price", max_price.toString());
    if (min_price) params.append("min_price", min_price.toString());
    if (ordering) params.append("ordering", ordering);
    if (page) params.append("page", page.toString());
    if (price) params.append("price", price.toString());
    if (search) params.append("search", search);
    return `${BASE_URL}/store/products/?${params.toString()}`;
  },
  productById: (id: number) => `${BASE_URL}/store/products/${id}/`,
  wishlist: (page?: number) => {
    return page
      ? `${BASE_URL}/store/wishlist/?page=${page}`
      : `${BASE_URL}/store/wishlist/`;
  },
  addToWishlist: `${BASE_URL}/store/wishlist/`,
  removeFromWishlist: (id: string) => `${BASE_URL}/store/wishlist/${id}/`,
};

export type Product = {
  id: number;
  name: string;
  desc: string;
  price: number;
  discounted_price: string;
  is_discount_active: string;
  images: string;
  category_name: string;
  average_rating: number;
  discount_percentage?: number;
  discount_expire_date?: string;
};

export type WishlistItem = {
  added_at: string;
  product: number;
};

export type ProductResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
};

export type WishlistResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: WishlistItem[];
};
