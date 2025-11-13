// app/api/addProducts/route.ts
import { db } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    {
      id: "toshiba-split-12000-btu",
      brand: "Toshiba",
      productName: "Toshiba Split Type Air Conditioner 12000 BTU",
      availability: "In Stock",
      description:
        "Energy-efficient wall-mounted split system ideal for residential use with rapid cooling and low noise operation.",
      warranty: "3 Years Full Warranty",
      material: "Copper & ABS Plastic",
      finish: "Matte White",
      mainImage: "https://media.istockphoto.com/id/184294297/photo/cordless-yellow-power-drill-isolated-on-a-white-background.jpg?s=2048x2048&w=is&k=20&c=5CO5U6OYb1FoqJ-TtGzaa1iJpTOlQhmOFwQzSHlesD8=",
      subImages: [
        "https://media.istockphoto.com/id/184294297/photo/cordless-yellow-power-drill-isolated-on-a-white-background.jpg?s=2048x2048&w=is&k=20&c=5CO5U6OYb1FoqJ-TtGzaa1iJpTOlQhmOFwQzSHlesD8=",
        "https://media.istockphoto.com/id/184294297/photo/cordless-yellow-power-drill-isolated-on-a-white-background.jpg?s=2048x2048&w=is&k=20&c=5CO5U6OYb1FoqJ-TtGzaa1iJpTOlQhmOFwQzSHlesD8=",
      ],
      reviews: [
        {
          customerName: "John Doe",
          email: "john@example.com",
          reviewDescription: "Excellent cooling performance and very quiet!",
          rating: 5,
        },
        {
          customerName: "Jane Smith",
          email: "jane@example.com",
          reviewDescription: "Energy efficient and stylish. Highly recommend.",
          rating: 4,
        },
      ],
    },
    {
      id: "panasonic-cassette-24000-btu",
      brand: "Panasonic",
      productName: "Panasonic Ceiling Cassette AC 24000 BTU",
      availability: "Out of Stock",
      description:
        "Perfect for offices and large spaces, offering 4-way air distribution and automatic swing for balanced airflow.",
      warranty: "2 Years Full Warranty",
      material: "Aluminum Alloy",
      finish: "Gloss White",
      mainImage: "https://media.istockphoto.com/id/184294297/photo/cordless-yellow-power-drill-isolated-on-a-white-background.jpg?s=2048x2048&w=is&k=20&c=5CO5U6OYb1FoqJ-TtGzaa1iJpTOlQhmOFwQzSHlesD8=",
      subImages: [
        "https://media.istockphoto.com/id/184294297/photo/cordless-yellow-power-drill-isolated-on-a-white-background.jpg?s=2048x2048&w=is&k=20&c=5CO5U6OYb1FoqJ-TtGzaa1iJpTOlQhmOFwQzSHlesD8=",
        "https://media.istockphoto.com/id/184294297/photo/cordless-yellow-power-drill-isolated-on-a-white-background.jpg?s=2048x2048&w=is&k=20&c=5CO5U6OYb1FoqJ-TtGzaa1iJpTOlQhmOFwQzSHlesD8=",
      ],
      reviews: [
        {
          customerName: "Mark Taylor",
          email: "mark@example.com",
          reviewDescription: "Ideal for our office — very even air flow and energy savings.",
          rating: 5,
        },
      ],
    },
    {
      id: "lg-ducted-36000-btu",
      brand: "LG",
      productName: "LG Ducted AC System 36000 BTU",
      availability: "In Stock",
      description:
        "Commercial-grade ducted system designed for silent operation and long-term reliability.",
      warranty: "5 Years Compressor Warranty",
      material: "Galvanized Steel",
      finish: "Silver Metallic",
      mainImage: "https://media.istockphoto.com/id/184294297/photo/cordless-yellow-power-drill-isolated-on-a-white-background.jpg?s=2048x2048&w=is&k=20&c=5CO5U6OYb1FoqJ-TtGzaa1iJpTOlQhmOFwQzSHlesD8=",
      subImages: [
        "https://media.istockphoto.com/id/184294297/photo/cordless-yellow-power-drill-isolated-on-a-white-background.jpg?s=2048x2048&w=is&k=20&c=5CO5U6OYb1FoqJ-TtGzaa1iJpTOlQhmOFwQzSHlesD8=",
        "https://media.istockphoto.com/id/184294297/photo/cordless-yellow-power-drill-isolated-on-a-white-background.jpg?s=2048x2048&w=is&k=20&c=5CO5U6OYb1FoqJ-TtGzaa1iJpTOlQhmOFwQzSHlesD8=",
      ],
      reviews: [
        {
          customerName: "Emily Carter",
          email: "emily@example.com",
          reviewDescription: "Powerful cooling system, perfect for our restaurant!",
          rating: 5,
        },
      ],
    },
  ];

  try {
    const productsCollection = collection(db, "products");

    for (const product of products) {
      // Use custom ID as document ID
      await setDoc(doc(productsCollection, product.id), product);
    }

    return NextResponse.json({ message: "✅ All products added with custom IDs!" });
  } catch (error) {
    console.error("Error adding products:", error);
    return NextResponse.json({ error: "❌ Failed to add products" }, { status: 500 });
  }
}
