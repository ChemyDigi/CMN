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
    availability: string; // "in-stock" | "out-of-stock"
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
    <div className="bg-white w-full min-h-screen text-gray-900">
      {/* Back to Catalog */}
      <div className="flex items-center gap-2 pt-6 md:pt-8 px-4 sm:px-6 lg:pl-10">
        <Link
          href="/products/ref-ac"
          className="flex items-center text-gray-700 hover:text-black transition-colors"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-black mr-2">
            <ArrowLeft size={16} className="text-black" />
          </div>
          <span className="text-sm font-medium">Back to catalog</span>
        </Link>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-20 px-4 sm:px-6 lg:px-8 xl:px-20 py-6 sm:py-8 lg:py-12 items-start">
        {/* Left: Product Images */}
        <div className="flex flex-col items-center w-full">
          {/* Main Image with Zoom */}
          <div className="w-full flex justify-center relative">
            <div
              ref={imageRef}
              className="relative w-full max-w-[400px] sm:max-w-[500px] cursor-zoom-in overflow-hidden"
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

              {/* Zoomed overlay */}
              {isZoomed && (
                <div
                  className="absolute inset-0 bg-no-repeat bg-origin-padding"
                  style={{
                    backgroundImage: `url(${mainImage})`,
                    backgroundSize: "200%",
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transform: "scale(1.1)",
                  }}
                />
              )}
            </div>
          </div>

          {/* Sub Images */}
          {product.subImages && product.subImages.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6">
              {product.subImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`transition-all duration-200 ${
                    mainImage === img
                      ? "opacity-100"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.productName} ${i + 1}`}
                    width={100}
                    height={100}
                    className="object-contain w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px]"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="w-full max-w-full lg:max-w-xl px-2 sm:px-0">
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1 leading-snug">
            {product.productName}
          </h1>

          {/* Stock Badge */}
          <p
            className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              product.availability === "in-stock"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {product.availability === "in-stock" ? "In Stock" : "Out of Stock"}
          </p>

          {/* Description */}
          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              {product.description}
            </p>
          </div>

          {/* Specifications */}
          <div className="mt-8 sm:mt-10">
            <h2 className="text-lg font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-2 gap-y-2 text-[15px]">
              <p className="text-gray-600 font-medium">Brand</p>
              <p className="text-gray-900 font-semibold">{product.brand}</p>

              <p className="text-gray-600 font-medium">Warranty</p>
              <p className="text-gray-900 font-semibold">{product.warranty}</p>

              <p className="text-gray-600 font-medium">Capacity</p>
              <p className="text-gray-900 font-semibold">{product.capacity}</p>

              <p className="text-gray-600 font-medium">Type</p>
              <p className="text-gray-900 font-semibold">{product.type}</p>

              <p className="text-gray-600 font-medium">Energy Rating</p>
              <p className="text-gray-900 font-semibold">{product.energyRating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;