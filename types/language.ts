export type Language = 'ar' | 'en'

export interface Translations {
  nav: {
    home?: string
    products?: string
    offers?: string
    contact?: string
  }
  hero: {
    title?: string
    subtitle?: string
    cta?: string
  }
  sections: {
    categories?: string
    featured?: string
    whyChooseUs?: string
    reviews?: string
  }
  account: {
    login?: string
    register?: string
    logout?: string
  }
}

