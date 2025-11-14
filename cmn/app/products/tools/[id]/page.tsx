// app/products/tools/[id]/page.tsx
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import ProductDisplay from "@/components/tools/ProductDisplay";
import ProductReviews from "@/components/tools/ReviewSection";
import SimilarProducts from "@/components/tools/SimilarProducts";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: PageProps) => {
  // ✅ Await params first (since Next.js dynamic routes can pass a Promise)
  const { id } = await params;

  // ✅ Reference product document
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-gray-600 text-lg font-medium">Product not found</p>
        <Link href="/products/tools" className="text-blue-600 hover:underline">
          ← Back to products
        </Link>
      </div>
    );
  }

  const data = docSnap.data();

  // ✅ Define the product object used in ProductDisplay
  const product = {
    name: data.productName || "No Name",
    brand: data.brand || "No Brand",
    description: data.description || "No description available",
    warranty: data.warranty || "Not specified",
    material: data.material || "Not specified",
    finish: data.finish || "Not specified",
    availability: data.availability || "Unknown",
    images: data.subImages?.length
      ? [data.mainImage, ...data.subImages]
      : [data.mainImage],
  };

  // ✅ Reviews array (if no reviews, fallback to empty)
  const reviews = Array.isArray(data.reviews) ? data.reviews : [];

  return (
    <div className="w-full bg-white">
      <ProductDisplay product={product} />
      {/* ✅ Pass productId for adding new reviews + existing reviews */}
      <ProductReviews productId={id} reviews={reviews} />
      <SimilarProducts />
    </div>
  );
};

export default ProductPage;
