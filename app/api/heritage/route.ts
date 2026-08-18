import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get("product_id")

  // TODO: Fetch heritage archive from Supabase by product_id
  return NextResponse.json({ heritage: null })
}
