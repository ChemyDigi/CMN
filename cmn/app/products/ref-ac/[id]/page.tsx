import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import ProductDisplay from "@/components/ACandRef/ProductDisplay";
import ProductReviews from "@/components/ACandRef/ReviewSection";
import SimilarProducts from "@/components/ACandRef/SimilarProducts";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ACRefProductPage = async ({ params }: PageProps) => {
  const { id } = await params; // ✅ unwrap the promise

  if (!id) {
    return <p>Invalid product ID</p>;
  }

  // Fetch from Firestore
  const docRef = doc(db, "AC&Ref", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="w-full text-center py-10">
        <p className="text-gray-600 text-lg font-medium">Product not found</p>
      </div>
    );
  }

  const data = docSnap.data();

  const product = {
    id: docSnap.id,
    productName: data.productName,
    brand: data.brand,
    description: data.description,
    warranty: data.warranty,
    capacity: data.capacity,
    type: data.type,
    energyRating: data.energyRating,
    availability: data.availability,
    mainImage: data.mainImage,
    subImages: Array.isArray(data.subImages) ? data.subImages : [],
  };

  const reviews = Array.isArray(data.reviews) ? data.reviews : [];

  return (
    <div className="w-full bg-white">
      <ProductDisplay product={product} />
      <ProductReviews productId={id} reviews={reviews} />
      <SimilarProducts />
    </div>
  );
};

export default ACRefProductPage;

