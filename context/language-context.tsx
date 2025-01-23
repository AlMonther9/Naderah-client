"use client";

import { createContext, useContext, useState } from "react";
import type { Language, Translations } from "@/types/language";

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      products: "Products",
      offers: "Special Offers",
      contact: "Contact",
    },
    hero: {
      title: "Discover Your Natural Beauty",
      /*       subtitle: "High-quality products with complete care in Arabic style",
       */ cta: "Shop Now",
    },
    sections: {
      categories: "Our Categories",
      featured: "Featured Products",
      whyChooseUs: "Why Choose Us",
      reviews: "Customer Reviews",
    },
    account: {
      login: "Login",
      register: "Register",
      logout: "Logout",
      profile: "Profile",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      createAccount: "Create an account",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      products: "منتجاتنا",
      offers: "العروض",
      contact: "تواصل معنا",
    },
    hero: {
      title: "اكتشفي جمالَكِ الطبيعيَّ معَ نضرة",
      /*       subtitle: "منتجات بجودة عالية للعناية الكاملة بالأثر العربية",
       */ cta: "تسوق الآن",
    },
    sections: {
      categories: "التصنيفات",
      featured: "المنتجات المميزة",
      whyChooseUs: "لماذا تختارين نديرة",
      reviews: "آراء العملاء",
    },
    account: {
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      logout: "تسجيل الخروج",
      profile: "الملف الشخصي",
      noAccount: "ليس لديك حساب؟",
      haveAccount: "لديك حساب بالفعل؟",
      createAccount: "إنشاء حساب جديد",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      <div dir={language === "ar" ? "rtl" : "ltr"} className="min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
