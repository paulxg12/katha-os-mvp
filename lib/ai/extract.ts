import OpenAI from "openai"
import { ExtractionResultSchema, type ExtractionResult } from "../schemas/extraction"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const EXTRACTION_PROMPT = `You are a structured data extraction engine for artisan products.

Given an artisan's spoken description of their product, extract:

1. **product** - Commerce-ready data:
   - title: Product name
   - category: Product category (textile, pottery, jewelry, woodwork, etc.)
   - materials: List of materials used
   - price: Estimated price in INR
   - summary: Short marketplace description

2. **heritage** - Cultural narrative data:
   - story: The cultural story or tradition behind the product
   - significance: Why this craft matters culturally
   - region: Geographic region of origin

Be faithful to what the artisan said. Do not invent details they did not mention.
If a detail is missing, make a reasonable inference and note it.`

export async function extractFromTranscript(
  transcript: string
): Promise<ExtractionResult> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: EXTRACTION_PROMPT },
      { role: "user", content: `Artisan transcript:\n\n${transcript}` },
    ],
  })

  const content = response.choices[0].message.content
  if (!content) throw new Error("No content in OpenAI response")

  const parsed = JSON.parse(content)
  return ExtractionResultSchema.parse(parsed)
}
