// app/api/addProducts/route.ts
import { db } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    // Existing 4 products
    {
      id: "samsung-inverter-split-ac-18000btu",
      brand: "Samsung",
      productName: "Samsung 18,000 BTU Inverter Split AC",
      availability: "in-stock",
      description:
        "Energy-efficient inverter split air conditioner with fast cooling, quiet operation, and smart Wi-Fi control.",
      warranty: "10-Year Compressor Warranty + 1-Year Parts",
      capacity: "18,000 BTU",
      type: "Wall-Mounted Split",
      energyRating: "5 Star",
      mainImage:
        "https://media.istockphoto.com/id/1308375457/photo/cleaning-air-conditioner.jpg?s=612x612&w=0&k=20&c=OQD4wICPb1il7sqz6Vx5kDHbeXhTMT4IJCcez7bp1EA=",
      subImages: [
        "https://media.istockphoto.com/id/1308375457/photo/cleaning-air-conditioner.jpg?s=612x612&w=0&k=20&c=OQD4wICPb1il7sqz6Vx5kDHbeXhTMT4IJCcez7bp1EA=",
        "https://media.istockphoto.com/id/2162681544/photo/modern-kitchen-with-front-view-of-refrigerator-and-white-cabinets.jpg?s=2048x2048&w=is&k=20&c=rTOpxdfnXSV7Gl_fE3yIxNBIxbzA82m2NzTCuqhMBxY="
      ],
      reviews: [
        {
          customerName: "Amara Silva",
          email: "amara.s@example.com",
          reviewDescription:
            "Cools quickly and runs almost silently. Very happy with the energy savings!",
          rating: 5
        },
        {
          customerName: "Dilan Perera",
          email: "dilan.p@example.com",
          reviewDescription: "Great AC, but the Wi-Fi app setup took a bit of time.",
          rating: 4
        }
      ]
    },
    {
      id: "lg-dual-inverter-ac-12000btu",
      brand: "LG",
      productName: "LG Dual Inverter 12,000 BTU Split AC",
      availability: "in-stock",
      description:
        "Dual inverter compressor ensures faster cooling, longer lifespan, and reduced energy consumption.",
      warranty: "10-Year Compressor Warranty",
      capacity: "12,000 BTU",
      type: "Split Type",
      energyRating: "5 Star",
      mainImage:
        "https://media.istockphoto.com/id/1308375457/photo/cleaning-air-conditioner.jpg?s=612x612&w=0&k=20&c=OQD4wICPb1il7sqz6Vx5kDHbeXhTMT4IJCcez7bp1EA=",
      subImages: [
        "https://media.istockphoto.com/id/2162681544/photo/modern-kitchen-with-front-view-of-refrigerator-and-white-cabinets.jpg?s=2048x2048&w=is&k=20&c=rTOpxdfnXSV7Gl_fE3yIxNBIxbzA82m2NzTCuqhMBxY=",
        "https://media.istockphoto.com/id/1308375457/photo/cleaning-air-conditioner.jpg?s=612x612&w=0&k=20&c=OQD4wICPb1il7sqz6Vx5kDHbeXhTMT4IJCcez7bp1EA="
      ],
      reviews: [
        {
          customerName: "Nuwan Jayasena",
          email: "nuwan.j@example.com",
          reviewDescription:
            "Energy efficient and elegant design. Excellent cooling even on hot days.",
          rating: 5
        },
        {
          customerName: "Ishani Fernando",
          email: "ishani.f@example.com",
          reviewDescription: "Compressor is very quiet. Installation was smooth.",
          rating: 5
        }
      ]
    },
    {
      id: "whirlpool-double-door-fridge-400l",
      brand: "Whirlpool",
      productName: "Whirlpool 400L Double Door Refrigerator",
      availability: "in-stock",
      description:
        "Spacious refrigerator with frost-free cooling, large freezer section, and inverter compressor for durability.",
      warranty: "1-Year Product Warranty + 10-Year Compressor Warranty",
      capacity: "400 Litres",
      type: "Double Door",
      energyRating: "4 Star",
      mainImage:
        "https://media.istockphoto.com/id/2162681544/photo/modern-kitchen-with-front-view-of-refrigerator-and-white-cabinets.jpg?s=2048x2048&w=is&k=20&c=rTOpxdfnXSV7Gl_fE3yIxNBIxbzA82m2NzTCuqhMBxY=",
      subImages: [
        "https://media.istockphoto.com/id/2162681544/photo/modern-kitchen-with-front-view-of-refrigerator-and-white-cabinets.jpg?s=2048x2048&w=is&k=20&c=rTOpxdfnXSV7Gl_fE3yIxNBIxbzA82m2NzTCuqhMBxY=",
        "https://media.istockphoto.com/id/1308375457/photo/cleaning-air-conditioner.jpg?s=612x612&w=0&k=20&c=OQD4wICPb1il7sqz6Vx5kDHbeXhTMT4IJCcez7bp1EA="
      ],
      reviews: [
        {
          customerName: "Sajith Ranasinghe",
          email: "sajith.r@example.com",
          reviewDescription: "Keeps fruits and vegetables fresh for days. Very quiet operation.",
          rating: 5
        },
        {
          customerName: "Malsha Abeywardena",
          email: "malsha.a@example.com",
          reviewDescription: "Spacious and stylish. Ideal for large families.",
          rating: 4
        }
      ]
    },
    {
      id: "panasonic-side-by-side-fridge-550l",
      brand: "Panasonic",
      productName: "Panasonic 550L Side-by-Side Refrigerator",
      availability: "out-of-stock",
      description:
        "Premium inverter side-by-side refrigerator with fast cooling, deodorizer, and smart display panel.",
      warranty: "1-Year Comprehensive + 10-Year Compressor Warranty",
      capacity: "550 Litres",
      type: "Side-by-Side",
      energyRating: "5 Star",
      mainImage:
        "https://media.istockphoto.com/id/2162681544/photo/modern-kitchen-with-front-view-of-refrigerator-and-white-cabinets.jpg?s=2048x2048&w=is&k=20&c=rTOpxdfnXSV7Gl_fE3yIxNBIxbzA82m2NzTCuqhMBxY=",
      subImages: [
        "https://media.istockphoto.com/id/1308375457/photo/cleaning-air-conditioner.jpg?s=612x612&w=0&k=20&c=OQD4wICPb1il7sqz6Vx5kDHbeXhTMT4IJCcez7bp1EA=",
        "https://media.istockphoto.com/id/2162681544/photo/modern-kitchen-with-front-view-of-refrigerator-and-white-cabinets.jpg?s=2048x2048&w=is&k=20&c=rTOpxdfnXSV7Gl_fE3yIxNBIxbzA82m2NzTCuqhMBxY="
      ],
      reviews: [
        {
          customerName: "Kasun Wijeratne",
          email: "kasun.w@example.com",
          reviewDescription: "Excellent cooling performance and premium look.",
          rating: 5
        },
        {
          customerName: "Ruwani Perera",
          email: "ruwani.p@example.com",
          reviewDescription: "A bit pricey but worth it for the features.",
          rating: 4
        }
      ]
    },

    // New 4 products
    {
      id: "samsung-9000btu-ac",
      brand: "Samsung",
      productName: "Samsung 9,000 BTU AC",
      availability: "in-stock",
      description: "Compact inverter AC with fast cooling and smart features.",
      warranty: "5-Year Compressor Warranty",
      capacity: "9,000 BTU",
      type: "Window AC",
      energyRating: "4 Star",
      mainImage:
        "https://media.istockphoto.com/id/1308375457/photo/cleaning-air-conditioner.jpg?s=612x612&w=0&k=20&c=OQD4wICPb1il7sqz6Vx5kDHbeXhTMT4IJCcez7bp1EA=",
      subImages: [
        "https://media.istockphoto.com/id/1308375457/photo/cleaning-air-conditioner.jpg?s=612x612&w=0&k=20&c=OQD4wICPb1il7sqz6Vx5kDHbeXhTMT4IJCcez7bp1EA=",
        "https://media.istockphoto.com/id/2162681544/photo/modern-kitchen-with-front-view-of-refrigerator-and-white-cabinets.jpg?s=2048x2048&w=is&k=20&c=rTOpxdfnXSV7Gl_fE3yIxNBIxbzA82m2NzTCuqhMBxY="
      ],
      reviews: []
    },
    {
      id: "lg-15000btu-ac",
      brand: "LG",
      productName: "LG 15,000 BTU Split AC",
      availability: "out-of-stock",
      description: "Powerful split AC with dual inverter for fast cooling.",
      warranty: "10-Year Compressor Warranty",
      capacity: "15,000 BTU",
      type: "Split AC",
      energyRating: "5 Star",
      mainImage:
        "https://media.istockphoto.com/id/1308375457/photo/cleaning-air-conditioner.jpg?s=612x612&w=0&k=20&c=OQD4wICPb1il7sqz6Vx5kDHbeXhTMT4IJCcez7bp1EA=",
      subImages: [
        "https://media.istockphoto.com/id/2162681544/photo/modern-kitchen-with-front-view-of-refrigerator-and-white-cabinets.jpg?s=2048x2048&w=is&k=20&c=rTOpxdfnXSV7Gl_fE3yIxNBIxbzA82m2NzTCuqhMBxY=",
        "https://media.istockphoto.com/id/1308375457/photo/cleaning-air-conditioner.jpg?s=612x612&w=0&k=20&c=OQD4wICPb1il7sqz6Vx5kDHbeXhTMT4IJCcez7bp1EA="
      ],
      reviews: []
    },
    {
      id: "whirlpool-300l-fridge",
      brand: "Whirlpool",
      productName: "Whirlpool 300L Single Door Refrigerator",
      availability: "in-stock",
      description: "Efficient single-door fridge with inverter technology.",
      warranty: "1-Year Product Warranty + 10-Year Compressor Warranty",
      capacity: "300 Litres",
      type: "Single Door",
      energyRating: "4 Star",
      mainImage:
        "https://media.istockphoto.com/id/2162681544/photo/modern-kitchen-with-front-view-of-refrigerator-and-white-cabinets.jpg?s=2048x2048&w=is&k=20&c=rTOpxdfnXSV7Gl_fE3yIxNBIxbzA82m2NzTCuqhMBxY=",
      subImages: [
        "https://media.istockphoto.com/id/2162681544/photo/modern-kitchen-with-front-view-of-refrigerator-and-white-cabinets.jpg?s=2048x2048&w=is&k=20&c=rTOpxdfnXSV7Gl_fE3yIxNBIxbzA82m2NzTCuqhMBxY=",
        "https://media.istockphoto.com/id/1308375457/photo/cleaning-air-conditioner.jpg?s=612x612&w=0&k=20&c=OQD4wICPb1il7sqz6Vx5kDHbeXhTMT4IJCcez7bp1EA="
      ],
      reviews: []
    },
    {
      id: "panasonic-600l-fridge",
      brand: "Panasonic",
      productName: "Panasonic 600L Side-by-Side Refrigerator",
      availability: "in-stock",
      description: "Large capacity fridge with inverter compressor and smart display.",
      warranty: "1-Year Comprehensive + 10-Year Compressor Warranty",
      capacity: "600 Litres",
      type: "Side-by-Side",
      energyRating: "5 Star",
      mainImage:
        "https://media.istockphoto.com/id/2162681544/photo/modern-kitchen-with-front-view-of-refrigerator-and-white-cabinets.jpg?s=2048x2048&w=is&k=20&c=rTOpxdfnXSV7Gl_fE3yIxNBIxbzA82m2NzTCuqhMBxY=",
      subImages: [
        "https://media.istockphoto.com/id/1308375457/photo/cleaning-air-conditioner.jpg?s=612x612&w=0&k=20&c=OQD4wICPb1il7sqz6Vx5kDHbeXhTMT4IJCcez7bp1EA=",
        "https://media.istockphoto.com/id/2162681544/photo/modern-kitchen-with-front-view-of-refrigerator-and-white-cabinets.jpg?s=2048x2048&w=is&k=20&c=rTOpxdfnXSV7Gl_fE3yIxNBIxbzA82m2NzTCuqhMBxY="
      ],
      reviews: []
    }
  ];

  try {
    const productsCollection = collection(db, "AC&Ref");

    for (const product of products) {
      await setDoc(doc(productsCollection, product.id), product);
    }

    return NextResponse.json({
      message: "✅ All AC & Refrigerator products added successfully!"
    });
  } catch (error) {
    console.error("Error adding products:", error);
    return NextResponse.json({ error: "❌ Failed to add products" }, { status: 500 });
  }
}
