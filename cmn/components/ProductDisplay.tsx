"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductDisplayProps {
  product: {
    name: string;
    brand: string;
    description: string;
    warranty: string;
    material: string;
    finish: string;
    inStock: boolean;
    images: string[];
  };
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Images */}
        <div className="w-full flex flex-col items-center">
          {/* Main Image */}
          <div className="w-full max-w-[500px]">
            <Image
              src={mainImage}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg object-contain w-full h-auto"
            />
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex justify-center flex-wrap gap-3 mt-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`border rounded-md overflow-hidden hover:ring-2 ${
                    mainImage === img ? "ring-gray-400" : "ring-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    width={90}
                    height={90}
                    className="object-cover w-[90px] h-[90px]"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="text-gray-900 w-full">
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-1 leading-tight">
            {product.name}
          </h1>
          <p
            className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-medium ${
              product.inStock
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-gray-700 mt-2 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          {/* Specifications */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Specifications</h2>
            <ul className="text-gray-700 space-y-1 text-sm sm:text-base">
              <li>
                <strong>Brand:</strong> {product.brand}
              </li>
              <li>
                <strong>Warranty:</strong> {product.warranty}
              </li>
              <li>
                <strong>Material:</strong> {product.material}
              </li>
              <li>
                <strong>Finish:</strong> {product.finish}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
