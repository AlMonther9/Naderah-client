import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#FCE8DD] py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-4 text-[#11238C]">
            {t.hero.title}
          </h1>
          <p className="text-xl mb-8 text-[#11238C]">{t.hero.subtitle}</p>
          <Button
            size="lg"
            className="bg-[#11238C] hover:bg-[#B3DAF2] hover:text-[#11238C]"
          >
            {t.hero.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
