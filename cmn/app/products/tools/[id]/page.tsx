// app/products/tools/[id]/page.tsx
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import ProductDisplay from "@/components/Tools/ProductDisplay";
import SimilarProducts from "@/components/Tools/SimilarProducts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: PageProps) => {
  // ✅ Await params first (since Next.js dynamic routes can pass a Promise)
  const { id } = await params;

  // ✅ Reference product document
  const docRef = doc(db, "tools", id);
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

  const product = {
    id, // Add the product ID here
    productName: data.productName,
    brand: data.brand,
    description: data.description,
    warranty: data.warranty,
    material: data.material,
    mainImage: data.mainImage,
    subImages: data.subImages || [],
    extraFields: data.extraFields || [],
    category: data.category, // Make sure this field exists in your Firestore document
  };

  // ✅ Reviews array (if no reviews, fallback to empty)
  const reviews = Array.isArray(data.reviews) ? data.reviews : [];

  return (
    <div className="w-full bg-white">
      <Navbar />
      <ProductDisplay product={product} />
      {/* ✅ Pass productId for adding new reviews + existing reviews */}
      {/* ✅ Pass current product ID and category to SimilarProducts */}
      <SimilarProducts 
        currentProductId={id} 
        currentProductCategory={data.category} 
      />
      <Footer />
    </div>
  );
};

export default ProductPage;