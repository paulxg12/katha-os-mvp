import type { Product } from "@/types"

interface ONDCProduct {
  descriptor: {
    name: string
    short_desc: string
  }
  price: {
    value: string
    currency: string
  }
  item_category_id: string
  item_quantity: {
    unitized: {
      measure: {
        unit: string
        value: string
      }
    }
  }
}

export function mapToONDC(product: Product): ONDCProduct {
  return {
    descriptor: {
      name: product.title,
      short_desc: product.summary ?? "",
    },
    price: {
      value: String(product.price),
      currency: "INR",
    },
    item_category_id: product.category,
    item_quantity: {
      unitized: {
        measure: {
          unit: "unit",
          value: "1",
        },
      },
    },
  }
}
