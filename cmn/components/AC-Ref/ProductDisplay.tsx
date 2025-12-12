"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ExtraField {
  id: string;
  name: string;
  value: string;
}

interface ProductDisplayProps {
  product: {
    id: string; // Add this
    productName: string;
    brand: string;
    description: string;
    warranty: string;
    material: string;
    serialId: string;
    mainImage: string;
    subImages: string[];
    extraFields?: ExtraField[];
    category?: string; // Add this
  };
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  const images = [product.mainImage, ...(product.subImages || [])];

  const [mainImage, setMainImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="bg-white w-full text-gray-900">
      {/* Back Button */}
      <div className="flex items-center gap-2 pt-28 px-4 sm:px-6 lg:px-10">
        <Link
          href="/products/ref-ac"
          className="flex items-center text-gray-700 hover:text-black transition-colors"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-black mr-2">
            <ArrowLeft size={16} />
          </div>
          <span className="text-sm font-medium">Back to catalog</span>
        </Link>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 px-4 sm:px-6 lg:px-20 pb-16 pt-8 items-start">

        {/* Left Section – Images */}
        <div className="flex flex-col items-center w-full">
          <div className="w-full flex justify-center relative">
            <div
              ref={imageRef}
              className="relative w-full max-w-[450px] sm:max-w-[500px] cursor-zoom-in overflow-hidden rounded-md"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <Image
                src={mainImage}
                alt={product.productName}
                width={600}
                height={600}
                className="object-contain w-full h-auto transition-transform duration-200"
                priority
              />

              {isZoomed && (
                <div
                  className="absolute inset-0 bg-no-repeat"
                  style={{
                    backgroundImage: `url(${mainImage})`,
                    backgroundSize: "200%",
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 px-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`transition-all duration-200 ${mainImage === img
                      ? "opacity-100"
                      : "opacity-70 hover:opacity-100"
                    }`}
                >
                  <Image
                    src={img}
                    alt={`${product.productName} ${i + 1}`}
                    width={85}
                    height={85}
                    className="object-contain w-[75px] h-[75px] sm:w-[95px] sm:h-[95px] rounded-md border"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Section – Details */}
        <div className="w-full max-w-xl space-y-6">
          <p className="text-sm text-[#F272A8] font-bold">{product.category}</p>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
            {product.productName}
          </h1>

          <div className="space-y-6 mt-6">
            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed text-[15px]">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="space-y-3">
              <Spec label="Brand" value={product.brand} />
              <Spec label="Warranty" value={product.warranty} />
              <Spec label="Material" value={product.material} />
              <Spec label="Serial ID" value={product.serialId} />
              {/* {product.category && <Spec label="Category" value={product.category} />} */}

              {/* Dynamic Extra Fields */}
              {product.extraFields?.map((field) => (
                <Spec key={field.id} label={field.name} value={field.value} />
              ))}
            </div>

            {/* Warranty Details */}
            <div>
              <p className="text-gray-700 leading-relaxed text-[15px]">
                {product.warranty} - Full terms and conditions apply. Contact customer service for warranty claims.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Spec = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
    <p className="text-gray-600 font-medium text-[15px] min-w-[100px]">{label}:</p>
    <p className="text-gray-900 font-semibold text-[15px]">{value}</p>
  </div>
);

export default ProductDisplay;