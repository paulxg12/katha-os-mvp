export interface Product {
  id: string
  title: string
  category: string
  materials: string[]
  price: number
  summary: string | null
  image_url: string | null
  transcript_raw: string | null
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

export interface ExtractionPayload {
  transcript: string
  audio_url?: string
}
