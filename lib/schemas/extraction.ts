import { z } from "zod"

export const ProductSchema = z.object({
  title: z.string().describe("Name of the product"),
  category: z.string().describe("Product category (e.g., textile, pottery, jewelry)"),
  materials: z.array(z.string()).describe("List of materials used"),
  price: z.number().describe("Price in INR"),
  summary: z.string().describe("Short commerce description for marketplace listing"),
})

export const HeritageSchema = z.object({
  story: z.string().describe("Cultural narrative behind the product"),
  significance: z.string().describe("Why this craft or product matters culturally"),
  region: z.string().describe("Geographic region of origin"),
})

export const ExtractionResultSchema = z.object({
  product: ProductSchema,
  heritage: HeritageSchema,
})

export type Product = z.infer<typeof ProductSchema>
export type Heritage = z.infer<typeof HeritageSchema>
export type ExtractionResult = z.infer<typeof ExtractionResultSchema>
