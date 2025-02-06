import React from "react";
import Image from "next/image";

const WhyChooseUs = () => {
  const features = [
    {
      id: "01",
      title: "طبيعية 100%",
      description:
        "جميع منتجاتنا مستخلصة من الطبيعة لضمان أعلى جودة وأمان جميع منتجاتنا مستخلصة من الطبيعة لضمان أعلى جودة وأمان.",
    },
    {
      id: "02",
      title: "شحن سريع",
      description:
        "نقدم شحناً مجانياً وسريعاً لجميع الطلبات داخل الدولة نقدم شحناً مجانياً وسريعاً لجميع الطلبات داخل الدولة.",
    },
    {
      id: "03",
      title: "دعم عملاء مميز",
      description:
        "متواجدون دائماً للإجابة عن استفساراتك بسرعة واحترافية متواجدون دائماً للإجابة عن استفساراتك بسرعة واحترافية.",
    },
  ];

  return (
    <div className="w-full bg-[#FFF7F5] py-16 lg:py-24">
      <h2 className="text-3xl font-bold text-gray-900 pr-64 pb-12">
        لماذا تختار نَضِرَةْ؟
      </h2>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row-reverse gap-12 items-center">
        {/* Features List */}
        <div className="lg:w-1/2 space-y-8">
          {features.map((feature) => (
            <div key={feature.id} className="space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-xl font-semibold text-gray-900">
                  {feature.id}
                </span>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <li className="text-lg text-gray-700 w-4/5">{feature.description}</li>
            </div>
          ))}
        </div>

        {/* Image Container */}
        <div className="lg:w-1/2 flex justify-center relative">
          {/* Background Image */}
          <div className="relative w-[450px] h-[450px] lg:w-[600px] lg:h-[600px]">
            <Image
              src="/bg-WhyChooseUs.png"
              alt="Background"
              layout="fill"
              className="object-contain opacity-20"
            />
          </div>

          {/* Foreground Image */}
          <div className="absolute w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] mt-28">
            <Image
              src="/WhyChooseUs.jpg"
              alt="Nadra Candle"
              layout="fill"
              className="object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
