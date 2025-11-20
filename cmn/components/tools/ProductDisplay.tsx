"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProductDisplayProps {
  product: {
    name: string;
    brand: string;
    description: string;
    warranty: string;
    material: string;
    finish: string;
    availability: string;
    images: string[];
  };
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('description');
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  // Tab content configuration
  const tabContent = {
    description: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed text-[15px]">
          {product.description}
        </p>
      </div>
    ),
    specifications: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-y-3 text-[15px]">
          <p className="text-gray-600 font-medium">Brand</p>
          <p className="text-gray-900 font-semibold">{product.brand}</p>

          <p className="text-gray-600 font-medium">Warranty</p>
          <p className="text-gray-900 font-semibold">{product.warranty}</p>

          <p className="text-gray-600 font-medium">Material</p>
          <p className="text-gray-900 font-semibold">{product.material}</p>

          <p className="text-gray-600 font-medium">Finish</p>
          <p className="text-gray-900 font-semibold">{product.finish}</p>
        </div>
      </div>
    ),
    warranty: (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed text-[15px]">
          {product.warranty} - Full terms and conditions apply. Please contact customer service for warranty claims.
        </p>
      </div>
    )
  };

  return (
    <div className="bg-white w-full text-gray-900">
      {/* Back Button - Increased top padding */}
      <div className="flex items-center gap-2 pt-28 px-4 sm:px-6 lg:px-10"> {/* Changed pt-6 to pt-28 */}
        <Link
          href="/products/tools"
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
                alt={product.name}
                width={600}
                height={600}
                className="object-contain w-full h-auto transition-transform duration-200"
                priority
              />

              {/* Zoom */}
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
          {product.images.length > 1 && (
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 px-2">
              {product.images.map((img, i) => (
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
                    alt={`${product.name} ${i + 1}`}
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
          <p className="text-sm text-[#F272A8] font-bold">{product.brand}</p>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
            {product.name}
          </h1>

          {/* Stock Badge */}
          {/* <p
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              product.availability === "in-stock"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {product.availability === "in-stock" ? "In Stock" : "Out of Stock"}
          </p> */}

          {/* Tabs Section */}
          <div className="mt-6">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {[
                { id: 'description', label: 'Description' },
                { id: 'specifications', label: 'Specifications' },
                { id: 'warranty', label: 'Warranty' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-4 py-3 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="py-4 min-h-[200px]">
              {tabContent[activeTab as keyof typeof tabContent]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;