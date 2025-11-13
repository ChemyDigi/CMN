// app/products/tools/[id]/page.tsx
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import ProductDisplay from "@/components/ProductDisplay";
import ProductReviews from "@/components/ReviewSection";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: PageProps) => {
  // ✅ Await the params promise first
  const { id } = await params;

  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="w-full text-center py-10">
        <p>Product not found</p>
        <Link href="/products/tools">← Back to products</Link>
      </div>
    );
  }

  const data = docSnap.data();

  const product = {
    name: data.productName || "No Name",
    brand: data.brand || "No Brand",
    description: data.description || "No description available",
    warranty: data.warranty || "Not specified",
    material: data.material || "Not specified",
    finish: data.finish || "Not specified",
    inStock: data.availability === "In Stock",
    images: data.subImages?.length
      ? [data.mainImage, ...data.subImages]
      : [data.mainImage],
  };

  return (
    <div className="w-full bg-white">
      <div className="mb-4">
        <Link href="/products/tools">← Back to catalog</Link>
      </div>

      <ProductDisplay product={product} />

      <div className="h-[1px] bg-gray-200 my-6"></div>

      <ProductReviews productId={id} reviews={data.reviews || []} />
    </div>
  );
};

export default ProductPage;