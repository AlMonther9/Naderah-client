import React from "react";

interface CategoryHeroProps {
  title: string;
  description: string;
  image: string;
}

export function CategoryHero({ title, description, image }: CategoryHeroProps) {
  return (
    <section className="bg-[#FFF7F5] flex flex-col-reverse pt-7 items-center gap-6 w-full md:flex-row md:justify-between md:items-center">
      {/* Image Section */}
      <div className="md:w-1/2">
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-contain max-h-80"
        />
      </div>
      {/* Text Section */}
      <div className="md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h1>
        <p className="text-gray-700">{description}</p>
      </div>
    </section>
  );
}
