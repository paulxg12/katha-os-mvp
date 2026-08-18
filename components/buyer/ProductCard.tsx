import type { Product } from "@/types"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/buyer/${product.id}`}>
      <div className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.summary}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">₹{product.price}</span>
          <span className="text-xs text-gray-400">
            {product.materials.join(", ")}
          </span>
        </div>
      </div>
    </Link>
  )
}
