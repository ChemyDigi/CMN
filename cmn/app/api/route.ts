// app/api/addProducts/route.ts
import { db } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    {
      id: "dewalt-cordless-drill-20v",
      brand: "DeWalt",
      productName: "DeWalt 20 V Cordless Drill Kit",
      availability: "in-stock",
      description:
        "High-performance 20V brushless drill driver kit with 2 batteries, charger and rugged case.",
      warranty: "3 Years Tool Warranty",
      material: "Aluminum & High-Impact Polymer",
      finish: "Yellow/Black",
      mainImage:
        "https://media.istockphoto.com/id/1300993562/photo/screwdriver-on-white-background-isolated.jpg?s=2048x2048&w=is&k=20&c=XkfjsPTqe1eQi85bmD73eZsESNkB55tiMSBfSNULgMo=",
      subImages: [
        "https://media.istockphoto.com/id/696940658/photo/cordless-screwdriver-isolated-on-white-background-3d-illustration.jpg?s=2048x2048&w=is&k=20&c=PyX3-Ss-V4C7f-XHYApqoVKvNK3dwmNhAWKjdxFW_JQ=",
        "https://media.istockphoto.com/id/485808534/photo/cordless-drill.jpg?s=2048x2048&w=is&k=20&c=TJxGj-s4rMmZLN3b9HYyOvj3WVH8-PpHKz9cq2Jj4p0="
      ],
      reviews: [
        {
          customerName: "Alice Reed",
          email: "alice@example.com",
          reviewDescription: "This drill is super reliable for both DIY and professional work.",
          rating: 5
        },
        {
          customerName: "Michael Torres",
          email: "mike.t@example.com",
          reviewDescription: "Battery life is great. Used it on multiple projects, no issues.",
          rating: 4
        },
        {
          customerName: "Samantha Green",
          email: "samg@example.com",
          reviewDescription: "Lightweight and powerful, worth every penny.",
          rating: 5
        }
      ]
    },
    {
      id: "makita-impact-driver-18v",
      brand: "Makita",
      productName: "Makita 18 V Impact Driver",
      availability: "out-of-stock",
      description:
        "Compact and powerful impact driver offering high torque—ideal for heavy-duty fastening.",
      warranty: "1 Year Standard, 3 Years with Registration",
      material: "Magnesium & Rubberized Grip",
      finish: "Teal",
      mainImage:
        "https://media.istockphoto.com/id/182408624/photo/isolated-power-tool-in-yellow.jpg?s=2048x2048&w=is&k=20&c=HyqIqZQ143vnsMOXGwSSag-5GI3zeTEYixbvPMHlOp4=",
      subImages: [
        "https://media.istockphoto.com/id/1300993562/photo/screwdriver-on-white-background-isolated.jpg?s=2048x2048&w=is&k=20&c=XkfjsPTqe1eQi85bmD73eZsESNkB55tiMSBfSNULgMo=",
        "https://media.istockphoto.com/id/696940658/photo/cordless-screwdriver-isolated-on-white-background-3d-illustration.jpg?s=2048x2048&w=is&k=20&c=PyX3-Ss-V4C7f-XHYApqoVKvNK3dwmNhAWKjdxFW_JQ="
      ],
      reviews: [
        {
          customerName: "Bob Chang",
          email: "bob@example.com",
          reviewDescription: "Great torque in a compact body, saved my workshop hours.",
          rating: 4
        },
        {
          customerName: "Jenny Silva",
          email: "jenny.s@example.com",
          reviewDescription: "Love the ergonomics. Perfect for long working hours.",
          rating: 5
        },
        {
          customerName: "Leo Brown",
          email: "leo.b@example.com",
          reviewDescription: "Could include a second battery, but performance is top-notch.",
          rating: 4
        }
      ]
    },
    {
      id: "bosch-combo-kit-12v",
      brand: "Bosch",
      productName: "Bosch 12 V Combo Kit (Drill + Driver)",
      availability: "in-stock",
      description:
        "Lightweight 12V combo kit with both drill/driver and impact driver—ideal for around-the-house repairs.",
      warranty: "2 Year Tool Warranty",
      material: "Steel & Polymer",
      finish: "Blue",
      mainImage:
        "https://media.istockphoto.com/id/1300993562/photo/screwdriver-on-white-background-isolated.jpg?s=2048x2048&w=is&k=20&c=XkfjsPTqe1eQi85bmD73eZsESNkB55tiMSBfSNULgMo=",
      subImages: [
        "https://media.istockphoto.com/id/182408624/photo/isolated-power-tool-in-yellow.jpg?s=2048x2048&w=is&k=20&c=HyqIqZQ143vnsMOXGwSSag-5GI3zeTEYixbvPMHlOp4=",
        "https://media.istockphoto.com/id/1300993562/photo/screwdriver-on-white-background-isolated.jpg?s=2048x2048&w=is&k=20&c=XkfjsPTqe1eQi85bmD73eZsESNkB55tiMSBfSNULgMo="
      ],
      reviews: [
        {
          customerName: "Tina Lopez",
          email: "tina.l@example.com",
          reviewDescription: "Perfect for small home projects and repairs.",
          rating: 5
        },
        {
          customerName: "Andrew Shaw",
          email: "andrew.s@example.com",
          reviewDescription: "Compact yet surprisingly powerful!",
          rating: 4
        }
      ]
    },
    {
      id: "milwaukee-m18-fuel-drill",
      brand: "Milwaukee",
      productName: "Milwaukee M18 Fuel Hammer Drill",
      availability: "in-stock",
      description:
        "Professional-grade hammer drill with brushless motor and 2-speed gearbox—built for concrete and masonry drilling.",
      warranty: "5 Years Tool + Battery Warranty",
      material: "Metal Gearbox & Plastic Housing",
      finish: "Red/Black",
      mainImage:
        "https://media.istockphoto.com/id/696940658/photo/cordless-screwdriver-isolated-on-white-background-3d-illustration.jpg?s=2048x2048&w=is&k=20&c=PyX3-Ss-V4C7f-XHYApqoVKvNK3dwmNhAWKjdxFW_JQ=",
      subImages: [
        "https://media.istockphoto.com/id/485808534/photo/cordless-drill.jpg?s=2048x2048&w=is&k=20&c=TJxGj-s4rMmZLN3b9HYyOvj3WVH8-PpHKz9cq2Jj4p0=",
        "https://media.istockphoto.com/id/182408624/photo/isolated-power-tool-in-yellow.jpg?s=2048x2048&w=is&k=20&c=HyqIqZQ143vnsMOXGwSSag-5GI3zeTEYixbvPMHlOp4="
      ],
      reviews: [
        {
          customerName: "Carla Gomez",
          email: "carla@example.com",
          reviewDescription: "Handles tough jobs easily—zero complaints on performance.",
          rating: 5
        },
        {
          customerName: "Mark Evans",
          email: "mark.e@example.com",
          reviewDescription: "Slightly heavy but unmatched power.",
          rating: 4
        }
      ]
    },
    {
      id: "craftsman-v20-circular-saw",
      brand: "Craftsman",
      productName: "Craftsman V20 Cordless Circular Saw",
      availability: "in-stock",
      description:
        "7-¼ inch cordless circular saw with tool-free blade changes and electric brake—compact yet powerful.",
      warranty: "3 Years Tool Warranty",
      material: "Magnesium Shoe & Aluminum Base",
      finish: "Red",
      mainImage:
        "https://media.istockphoto.com/id/1300993562/photo/screwdriver-on-white-background-isolated.jpg?s=2048x2048&w=is&k=20&c=XkfjsPTqe1eQi85bmD73eZsESNkB55tiMSBfSNULgMo=",
      subImages: [
        "https://media.istockphoto.com/id/182408624/photo/isolated-power-tool-in-yellow.jpg?s=2048x2048&w=is&k=20&c=HyqIqZQ143vnsMOXGwSSag-5GI3zeTEYixbvPMHlOp4=",
        "https://media.istockphoto.com/id/1300993562/photo/screwdriver-on-white-background-isolated.jpg?s=2048x2048&w=is&k=20&c=XkfjsPTqe1eQi85bmD73eZsESNkB55tiMSBfSNULgMo="
      ],
      reviews: [
        {
          customerName: "James Patel",
          email: "jpatel@example.com",
          reviewDescription: "Smooth cuts every time. Battery lasts longer than expected.",
          rating: 5
        },
        {
          customerName: "Rachel Kim",
          email: "rachel.k@example.com",
          reviewDescription: "Compact design, great for small workshops.",
          rating: 4
        }
      ]
    },
    {
      id: "ridgid-wet-dry-vacuum-12gal",
      brand: "Ridgid",
      productName: "Ridgid 12 Gal Wet/Dry Vacuum",
      availability: "in-stock",
      description:
        "Powerful workshop vacuum with 6.0 Peak HP motor and built-in blower port—ideal for dust and wet cleanup.",
      warranty: "3 Years Tool Warranty",
      material: "Steel Tank & Polymer Housing",
      finish: "Red",
      mainImage:
        "https://media.istockphoto.com/id/182408624/photo/isolated-power-tool-in-yellow.jpg?s=2048x2048&w=is&k=20&c=HyqIqZQ143vnsMOXGwSSag-5GI3zeTEYixbvPMHlOp4=",
      subImages: [
        "https://media.istockphoto.com/id/1300993562/photo/screwdriver-on-white-background-isolated.jpg?s=2048x2048&w=is&k=20&c=XkfjsPTqe1eQi85bmD73eZsESNkB55tiMSBfSNULgMo=",
        "https://media.istockphoto.com/id/696940658/photo/cordless-screwdriver-isolated-on-white-background-3d-illustration.jpg?s=2048x2048&w=is&k=20&c=PyX3-Ss-V4C7f-XHYApqoVKvNK3dwmNhAWKjdxFW_JQ="
      ],
      reviews: [
        {
          customerName: "Tom Rivera",
          email: "tomr@example.com",
          reviewDescription: "Excellent suction power, cleans up big messes easily.",
          rating: 5
        },
        {
          customerName: "Olivia Wells",
          email: "olivia.w@example.com",
          reviewDescription: "A bit noisy but extremely efficient.",
          rating: 4
        }
      ]
    },
    {
      id: "snap-on-diagnostic-scan-tool",
      brand: "Snap-on",
      productName: "Snap-on ProLink Diagnostic Scan Tool",
      availability: "out-of-stock",
      description:
        "Handheld advanced scanner for automotive diagnostics supporting multi-makes with color display and WiFi updates.",
      warranty: "2 Years",
      material: "Aluminum & Plastic Rugged Case",
      finish: "Black/Blue",
      mainImage:
        "https://media.istockphoto.com/id/1300993562/photo/screwdriver-on-white-background-isolated.jpg?s=2048x2048&w=is&k=20&c=XkfjsPTqe1eQi85bmD73eZsESNkB55tiMSBfSNULgMo=",
      subImages: [
        "https://media.istockphoto.com/id/696940658/photo/cordless-screwdriver-isolated-on-white-background-3d-illustration.jpg?s=2048x2048&w=is&k=20&c=PyX3-Ss-V4C7f-XHYApqoVKvNK3dwmNhAWKjdxFW_JQ=",
        "https://media.istockphoto.com/id/485808534/photo/cordless-drill.jpg?s=2048x2048&w=is&k=20&c=TJxGj-s4rMmZLN3b9HYyOvj3WVH8-PpHKz9cq2Jj4p0="
      ],
      reviews: [
        {
          customerName: "Hannah Wright",
          email: "hannah@example.com",
          reviewDescription: "Saved me so much time diagnosing wiring issues.",
          rating: 5
        },
        {
          customerName: "Kevin Lee",
          email: "kevin.l@example.com",
          reviewDescription: "Professional tool, very accurate and fast scanning.",
          rating: 5
        },
        {
          customerName: "Noah Carter",
          email: "noah.c@example.com",
          reviewDescription: "Interface could be more intuitive, but performance is solid.",
          rating: 4
        }
      ]
    }
  ];

  try {
    const productsCollection = collection(db, "products");

    for (const product of products) {
      await setDoc(doc(productsCollection, product.id), product);
    }

    return NextResponse.json({ message: "✅ All products added with custom IDs and multiple reviews!" });
  } catch (error) {
    console.error("Error adding products:", error);
    return NextResponse.json({ error: "❌ Failed to add products" }, { status: 500 });
  }
}
