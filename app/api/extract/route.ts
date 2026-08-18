import { NextResponse } from "next/server"

export const dynamic = "force-static"

export async function POST() {
  return NextResponse.json({
    product: {
      title: "Extracted product title",
      category: "Textile & Apparel",
      materials: ["Pure Silk", "Gold Zari"],
      price: 14500,
      summary: "Traditional handloom craft listing.",
    },
    heritage: {
      story: "Extracted cultural story",
      significance: "Handcrafted heritage",
      region: "Varanasi, UP",
    },
  })
}
