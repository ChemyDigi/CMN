"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProductDisplayProps {
  product: {
    id: string;
    productName: string;
    brand: string;
    description: string;
    warranty: string;
    capacity: string;
    type: string;
    energyRating: string;
    availability: string;
    mainImage: string;
    subImages: string[];
  };
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.mainImage);
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

        {/* LEFT SECTION — IMAGES */}
        <div className="flex flex-col items-center w-full">
          
          {/* Main Image */}
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
                className="object-contain w-full h-auto"
                priority
              />

              {/* Zoom Window */}
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
          {product.subImages?.length > 1 && (
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 px-2">
              {product.subImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`transition-all duration-200 ${
                    mainImage === img ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.productName} ${i + 1}`}
                    width={90}
                    height={90}
                    className="object-contain w-[75px] h-[75px] sm:w-[95px] sm:h-[95px] rounded-md border"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SECTION — DETAILS */}
        <div className="w-full max-w-xl space-y-6">
          <p className="text-sm text-[#F272A8] font-bold">{product.brand}</p>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
            {product.productName}
          </h1>

          {/* All Content Displayed as Continuous List */}
          <div className="space-y-6 mt-6">
            {/* Description */}
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed text-[15px]">
                {product.description}
              </p>
            </div>

            {/* Specifications List */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <p className="text-gray-600 font-medium text-[15px] min-w-[100px]">Brand:</p>
                <p className="text-gray-900 font-semibold text-[15px]">{product.brand}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <p className="text-gray-600 font-medium text-[15px] min-w-[100px]">Warranty:</p>
                <p className="text-gray-900 font-semibold text-[15px]">{product.warranty}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <p className="text-gray-600 font-medium text-[15px] min-w-[100px]">Capacity:</p>
                <p className="text-gray-900 font-semibold text-[15px]">{product.capacity}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <p className="text-gray-600 font-medium text-[15px] min-w-[100px]">Type:</p>
                <p className="text-gray-900 font-semibold text-[15px]">{product.type}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                <p className="text-gray-600 font-medium text-[15px] min-w-[100px]">Energy Rating:</p>
                <p className="text-gray-900 font-semibold text-[15px]">{product.energyRating}</p>
              </div>
            </div>

            {/* Warranty Details */}
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed text-[15px]">
                {product.warranty} — Full terms and conditions apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;