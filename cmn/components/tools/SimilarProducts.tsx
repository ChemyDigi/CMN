"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Product {
  id: string;
  brand: string;
  productName: string;
  availability?: string;
  description?: string;
  warranty?: string;
  material?: string;
  finish?: string;
  mainImage: string;
  subImages?: string[];
  reviews?: { rating: number }[];
  category?: string;
  price?: number;
}

export default function SimilarProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const router = useRouter();

  // determine items per view responsively
  useEffect(() => {
    const updateItems = () => {
      const w = window.innerWidth;
      if (w < 640) setItemsPerView(1);
      else if (w < 900) setItemsPerView(2);
      else if (w < 1200) setItemsPerView(3);
      else setItemsPerView(4);
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as Product[];
        setProducts(list);
      } catch (err) {
        console.error("fetch products error", err);
      }
    };
    fetchProducts();
  }, []);

  // regroup pages whenever products or itemsPerView change
  const pages: Product[][] = [];
  for (let i = 0; i < products.length; i += itemsPerView) {
    pages.push(products.slice(i, i + itemsPerView));
  }
  const totalPages = Math.max(1, pages.length);

  // ensure currentPage stays in range when itemsPerView changes
  useEffect(() => {
    if (currentPage >= totalPages) setCurrentPage(totalPages - 1);
  }, [totalPages, currentPage]);

  // touch handlers for swipe by page
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    const diff = touchStartX.current - touchEndX.current;
    const THRESHOLD = 50;
    if (diff > THRESHOLD) handleNext();
    else if (diff < -THRESHOLD) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // mouse drag support (optional)
  const dragStartX = useRef<number | null>(null);
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    (carouselRef.current as HTMLDivElement).style.cursor = "grabbing";
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX.current == null) return;
    // We won't implement drag-as-dragging-UI; just capture end position on mouseup
    // (simple behavior to allow desktop swipe-like action)
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current == null) return;
    const diff = dragStartX.current - e.clientX;
    const THRESHOLD = 50;
    if (diff > THRESHOLD) handleNext();
    else if (diff < -THRESHOLD) handlePrev();
    dragStartX.current = null;
    if (carouselRef.current) (carouselRef.current as HTMLDivElement).style.cursor = "grab";
  };
  const handleMouseLeave = () => {
    dragStartX.current = null;
    if (carouselRef.current) (carouselRef.current as HTMLDivElement).style.cursor = "grab";
  };

  const handlePrev = () => setCurrentPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  const handleNext = () => setCurrentPage((p) => (p === totalPages - 1 ? 0 : p + 1));

  if (products.length === 0) return null;

  return (
    <section className="w-full bg-white py-10 flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6">Explore <span className="ml-2">Similar Products</span></h2>

      <div className="relative w-full max-w-7xl px-4 sm:px-8">
        {/* Carousel viewport */}
        <div
          ref={carouselRef}
          className="overflow-hidden rounded-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: "grab" }}
        >
          {/* Pages row — each page is 100% of viewport width */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${totalPages * 100}%`,
              transform: `translateX(-${currentPage * (100 / totalPages)}%)`,
            }}
          >
            {pages.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="flex gap-4 p-3"
                style={{ width: `${100 / totalPages}%`, justifyContent: "center" }}
              >
                {page.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-transform duration-300 cursor-pointer flex-shrink-0"
                    style={{ width: `${100 / itemsPerView}%`, maxWidth: "320px", display: "flex", flexDirection: "column" }}
                    onClick={() => router.push(`/products/tools/${product.id}`)}
                  >
                    <div className="relative w-full h-44 rounded-t-lg overflow-hidden">
                      <Image
                        src={product.mainImage}
                        alt={product.productName}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="p-3 flex flex-col flex-1 justify-between">
                      <div>
                        <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">{product.brand}</p>
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight mt-1 line-clamp-2">{product.productName}</h3>
                      </div>
                      {product.reviews && product.reviews.length > 0 && (
                        <div className="text-xs text-gray-500 mt-2">{product.reviews.length} review{product.reviews.length !== 1 ? "s" : ""}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        {totalPages > 1 && (
  <>
    <button
      onClick={handlePrev}
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black text-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:scale-105 transition"
      aria-label="Previous page"
      title="Previous"
    >
      <span className="text-white text-xl select-none">‹</span>
    </button>

    <button
      onClick={handleNext}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:scale-105 transition"
      aria-label="Next page"
      title="Next"
    >
      <span className="text-white text-xl select-none">›</span>
    </button>
  </>
)}

        {/* Dots */}
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-2 rounded-full transition-all ${currentPage === i ? "w-6 bg-gray-900" : "w-2 bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
