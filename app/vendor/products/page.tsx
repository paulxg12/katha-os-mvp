"use client"

import { useState } from "react"
import { Avatar } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { PageHeader } from "@/components/ui/PageHeader"
import { BottomNav } from "@/components/layout/BottomNav"
import type { Product } from "@/types"

const mockProducts: Product[] = [
  {
    id: "p1",
    vendor_id: "v1",
    title: "Banarasi Silk Saree — Red & Gold",
    category: "Textile",
    materials: ["Silk", "Gold Zari"],
    price: 12500,
    summary: "Handwoven pure silk saree with intricate gold zari border. Takes 20 days on the loom.",
    image_url: null,
    transcript_raw: null,
    status: "active",
    created_at: "2025-12-01",
  },
  {
    id: "p2",
    vendor_id: "v1",
    title: "Banarasi Dupatta — Peacock Motif",
    category: "Textile",
    materials: ["Silk", "Silver Zari"],
    price: 4200,
    summary: "Lightweight silk dupatta with peacock motif in silver zari.",
    image_url: null,
    transcript_raw: null,
    status: "active",
    created_at: "2025-12-10",
  },
  {
    id: "p3",
    vendor_id: "v1",
    title: "Banarasi Stole — Pastel Blue",
    category: "Textile",
    materials: ["Silk", "Gold Zari"],
    price: 3800,
    summary: "Contemporary pastel stole with traditional butti work.",
    image_url: null,
    transcript_raw: null,
    status: "sold",
    created_at: "2025-11-20",
  },
  {
    id: "p4",
    vendor_id: "v1",
    title: "Banarasi Table Runner — Maroon",
    category: "Home Decor",
    materials: ["Silk", "Gold Zari"],
    price: 2800,
    summary: "Elegant table runner with floral motifs. Perfect for festive dining.",
    image_url: null,
    transcript_raw: null,
    status: "active",
    created_at: "2025-12-15",
  },
]

function VendorNavIcon({ d }: { d: string }) {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  )
}

const navItems = [
  {
    label: "Home",
    href: "/vendor",
    icon: <VendorNavIcon d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />,
  },
  {
    label: "Products",
    href: "/vendor/products",
    icon: <VendorNavIcon d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />,
  },
  {
    label: "Add",
    href: "/vendor/add",
    icon: (
      <div className="w-10 h-10 -mt-5 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
    ),
  },
  {
    label: "Earnings",
    href: "/vendor/earnings",
    icon: <VendorNavIcon d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  },
  {
    label: "Profile",
    href: "/vendor/profile",
    icon: <VendorNavIcon d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
  },
]

type FilterType = "all" | "active" | "sold" | "draft"

export default function VendorProductsPage() {
  const [filter, setFilter] = useState<FilterType>("all")

  const filtered = filter === "all" ? mockProducts : mockProducts.filter((p) => p.status === filter)

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-5 pt-14 pb-4 border-b border-gray-100">
        <PageHeader title="My Products" subtitle={`${mockProducts.length} total listings`} />
      </div>

      {/* Filters */}
      <div className="px-5 py-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {(["all", "active", "sold", "draft"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
                filter === f
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "all" && ` (${mockProducts.length})`}
              {f === "active" && ` (${mockProducts.filter((p) => p.status === "active").length})`}
              {f === "sold" && ` (${mockProducts.filter((p) => p.status === "sold").length})`}
              {f === "draft" && " (0)"}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="px-5">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">No products in this category</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                <div className="flex">
                  <div className="w-24 h-24 bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">
                      {product.category === "Textile"
                        ? "🧵"
                        : product.category === "Home Decor"
                        ? "🏠"
                        : "✨"}
                    </span>
                  </div>
                  <div className="flex-1 p-4 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {product.title}
                      </h3>
                      <Badge variant={product.status === "active" ? "success" : product.status === "sold" ? "muted" : "warning"}>
                        {product.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{product.summary}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-base font-bold text-gray-900">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <div className="flex gap-1">
                        <button className="p-2 rounded-lg hover:bg-gray-50 transition">
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-50 transition">
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav items={navItems} />
    </main>
  )
}
