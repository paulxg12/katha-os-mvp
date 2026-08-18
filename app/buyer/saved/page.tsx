"use client"

import { Badge } from "@/components/ui/Badge"
import { BottomNav } from "@/components/layout/BottomNav"
import type { Product } from "@/types"

const mockSaved: Product[] = [
  {
    id: "p1",
    vendor_id: "v1",
    title: "Banarasi Silk Saree — Red & Gold",
    category: "Textile",
    materials: ["Silk", "Gold Zari"],
    price: 12500,
    summary: "Handwoven pure silk saree with intricate gold zari border.",
    image_url: null,
    transcript_raw: null,
    status: "active",
    created_at: "2025-12-01",
  },
  {
    id: "p5",
    vendor_id: "v2",
    title: "Blue Pottery Vase — Jaipur",
    category: "Pottery",
    materials: ["Quartz", "Glass", "Multani Mitti"],
    price: 1800,
    summary: "Traditional Jaipur blue pottery with floral patterns.",
    image_url: null,
    transcript_raw: null,
    status: "active",
    created_at: "2025-12-12",
  },
  {
    id: "p6",
    vendor_id: "v3",
    title: "Dokra Bronze Horse",
    category: "Metalwork",
    materials: ["Bronze", "Brass"],
    price: 3200,
    summary: "Tribal dokra art piece. Lost-wax casting technique from Chhattisgarh.",
    image_url: null,
    transcript_raw: null,
    status: "active",
    created_at: "2025-12-08",
  },
]

function BuyerNavIcon({ d }: { d: string }) {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  )
}

const navItems = [
  {
    label: "Explore",
    href: "/buyer",
    icon: <BuyerNavIcon d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />,
  },
  {
    label: "Saved",
    href: "/buyer/saved",
    icon: <BuyerNavIcon d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />,
  },
  {
    label: "Purchases",
    href: "/buyer/purchases",
    icon: <BuyerNavIcon d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
  },
  {
    label: "Stories",
    href: "/buyer/stories",
    icon: <BuyerNavIcon d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />,
  },
  {
    label: "Profile",
    href: "/buyer/profile",
    icon: <BuyerNavIcon d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
  },
]

export default function BuyerSavedPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-5 pt-14 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Saved Items</h1>
        <p className="text-sm text-gray-500 mt-1">{mockSaved.length} products saved</p>
      </div>

      <div className="px-5 py-4 space-y-3">
        {mockSaved.map((product) => (
          <a
            key={product.id}
            href={`/buyer/${product.id}`}
            className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
          >
            <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">
                {product.category === "Textile"
                  ? "🧵"
                  : product.category === "Pottery"
                  ? "🏺"
                  : "✨"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{product.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{product.category} · {product.materials.join(", ")}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-base font-bold text-gray-900">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <Badge variant="success">Available</Badge>
              </div>
            </div>
            <button className="self-start p-2" onClick={(e) => e.preventDefault()}>
              <svg className="w-5 h-5 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </button>
          </a>
        ))}
      </div>

      <BottomNav items={navItems} />
    </main>
  )
}
