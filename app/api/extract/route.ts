import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { transcript } = body

  if (!transcript) {
    return NextResponse.json(
      { error: "Transcript is required" },
      { status: 400 }
    )
  }

  // TODO: Call OpenAI structured extraction
  // TODO: Validate with Zod schemas
  // TODO: Return { product, heritage }

  return NextResponse.json({
    product: {
      title: "Extracted product title",
      category: "Extracted category",
      materials: ["material1"],
      price: 0,
      summary: "Extracted summary",
    },
    heritage: {
      story: "Extracted cultural story",
      significance: "Extracted significance",
      region: "Extracted region",
    },
  })
}
