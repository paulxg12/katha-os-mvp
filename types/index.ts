export interface Vendor {
  id: string
  name: string
  craft: string
  region: string
  bio: string | null
  avatar_url: string | null
  phone: string | null
  joined_at: string
}

export interface Product {
  id: string
  vendor_id: string
  title: string
  category: string
  materials: string[]
  price: number
  summary: string | null
  image_url: string | null
  transcript_raw: string | null
  status: "active" | "sold" | "draft"
  created_at: string
}

export interface HeritageArchive {
  id: string
  product_id: string
  story: string | null
  significance: string | null
  region: string | null
  language: string | null
  audio_url: string | null
  created_at: string
}

export interface BuyerProfile {
  id: string
  name: string
  avatar_url: string | null
  interests: string[]
  joined_at: string
}

export interface SavedItem {
  id: string
  buyer_id: string
  product_id: string
  saved_at: string
}

export interface ExtractionPayload {
  transcript: string
  audio_url?: string
}
