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
      {/* Heading: centered on mobile, right-aligned on large screens */}
      <h2 className="text-3xl font-bold text-gray-900 pb-12 text-center lg:text-right lg:pr-64">
        لماذا تختار نَضِرَةْ؟
      </h2>

      {/* Container:
            - On mobile: content stacks in DOM order.
            - On large screens: lg:flex-row-reverse switches the order.
      */}
      <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row-reverse gap-12 items-center">
        {/* Image Container – placed first in the DOM for mobile */}
        <div className="lg:w-1/2 flex justify-center relative">
          {/* Background Image */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-[600px] lg:h-[600px]">
            <Image
              src="/bg-why-choose-us.png"
              alt="Background"
              layout="fill"
              className="object-contain opacity-20"
            />
          </div>

          {/* Foreground Image */}
          <div className="absolute w-40 h-40 sm:w-48 sm:h-48 lg:w-[300px] lg:h-[300px] mt-12 sm:mt-16">
            <Image
              src="/why-choose-us.jpg"
              alt="Nadra Candle"
              layout="fill"
              className="object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Features List */}
        <div className="lg:w-1/2 text-center lg:text-right">
          <div className="space-y-8">
            {features.map((feature) => (
              <div key={feature.id} className="space-y-3">
                {/* Title row:
                    Using flex-row-reverse so that in RTL the ID appears on the right */}
                <div className="flex items-center gap-3 justify-end flex-row-reverse">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <span className="text-xl font-semibold text-gray-900 pr-6">
                    {feature.id}
                  </span>
                </div>
                {/* Description with bullet:
                    Using pr-6 so that the bullet is indented properly in RTL */}
                <ul className="list-disc pr-6">
                  <li className="text-lg text-gray-700">
                    {feature.description}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
