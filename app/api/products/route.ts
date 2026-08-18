import { NextResponse } from "next/server"

export async function GET() {
  // TODO: Fetch products from Supabase
  return NextResponse.json({ products: [] })
}

export async function POST(request: Request) {
  const body = await request.json()
  // TODO: Insert product into Supabase
  // TODO: Also insert heritage_archives entry
  return NextResponse.json({ product: body }, { status: 201 })
}
