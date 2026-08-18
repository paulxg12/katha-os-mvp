"use client"

import { useState } from "react"
import Link from "next/link"
import { useVendorStore } from "@/lib/hooks/useVendorStore"
import { PageHeader } from "@/components/ui/PageHeader"
import { Badge } from "@/components/ui/Badge"
import { BottomNav } from "@/components/layout/BottomNav"
import { EditProductModal } from "@/components/vendor/EditProductModal"
import { ONDCExportModal } from "@/components/vendor/ONDCExportModal"
import type { Product } from "@/types"

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
    icon: null,
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
  const { vendor, products, updateProduct, deleteProduct, isLoaded } = useVendorStore()
  const [filter, setFilter] = useState<FilterType>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [exportingProduct, setExportingProduct] = useState<Product | null>(null)

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-ochre border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const filteredProducts = products.filter((p) => {
    const matchesFilter = filter === "all" ? true : p.status === filter
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  return (
    <main className="min-h-screen bg-parchment pb-28">
      {/* Header */}
      <div className="bg-parchment-card px-5 pt-12 pb-5 border-b border-parchment-border shadow-2xs">
        <PageHeader
          title="My Craft Catalog"
          subtitle={`${products.length} total listings · Broadcasted to ONDC Network`}
          action={
            <Link
              href="/vendor/add"
              className="py-2 px-4 bg-gradient-to-r from-ochre to-ochre-dark text-white font-bold text-xs rounded-full hover:opacity-95 shadow-organic transition flex items-center gap-1.5"
            >
              🎙 Voice Add
            </Link>
          }
        />

        {/* Search Bar */}
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search by title, material, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-parchment border border-parchment-border rounded-full text-xs font-medium text-charcoal focus:outline-none focus:border-ochre shadow-inner"
          />
          <svg className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-5 py-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {(["all", "active", "sold", "draft"] as FilterType[]).map((f) => {
            const count = f === "all" ? products.length : products.filter((p) => p.status === f).length
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap border transition ${
                  filter === f
                    ? "bg-ochre text-white border-ochre shadow-sm"
                    : "bg-parchment-card text-charcoal-muted border-parchment-border hover:bg-parchment-border/40"
                }`}
              >
                {f} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Product List */}
      <div className="px-5 space-y-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-parchment-card rounded-3xl border border-parchment-border p-8">
            <div className="w-16 h-16 rounded-full bg-parchment flex items-center justify-center mx-auto mb-3 text-3xl">
              📦
            </div>
            <p className="text-sm font-serif font-bold text-charcoal">No products found</p>
            <p className="text-xs text-charcoal-muted mt-1">
              {searchQuery ? "Try clearing your search term" : "Click 'Voice Add' to record your first craft item!"}
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-parchment-card rounded-3xl border border-parchment-border shadow-organic overflow-hidden transition-all hover:border-ochre/40"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image / Thumbnail */}
                <div className="sm:w-36 h-48 sm:h-auto bg-parchment relative flex-shrink-0 border-b sm:border-b-0 sm:border-r border-parchment-border overflow-hidden">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-ochre-fixed/30">
                      🧵
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge variant={product.status === "active" ? "success" : product.status === "sold" ? "muted" : "warning"}>
                      {product.status}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ochre">
                          {product.category}
                        </span>
                        <h3 className="text-base font-serif font-bold text-charcoal mt-0.5 line-clamp-1">
                          {product.title}
                        </h3>
                      </div>
                      <span className="text-base font-serif font-bold text-charcoal shrink-0">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <p className="text-xs text-charcoal-muted mt-2 line-clamp-2 leading-relaxed">
                      {product.summary || product.heritage_story}
                    </p>

                    {/* Materials Chips */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {product.materials.map((mat, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 bg-parchment border border-parchment-border rounded-full text-[10px] font-semibold text-charcoal"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-parchment-border">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="py-1.5 px-3 bg-parchment border border-parchment-border text-charcoal text-xs font-semibold rounded-full hover:bg-parchment-border/40 transition"
                      >
                        ✏ Edit
                      </button>
                      <button
                        onClick={() => setExportingProduct(product)}
                        className="py-1.5 px-3 bg-indigo-fixed/50 text-indigo-dark text-xs font-semibold rounded-full hover:bg-indigo-fixed transition"
                      >
                        ⚡ ONDC JSON
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateProduct(product.id, {
                            status: product.status === "active" ? "sold" : "active",
                          })
                        }
                        className="text-xs font-semibold text-ochre hover:underline"
                      >
                        Mark as {product.status === "active" ? "Sold" : "Active"}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${product.title}"?`)) {
                            deleteProduct(product.id)
                          }
                        }}
                        className="text-xs font-semibold text-rose-600 hover:underline ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <EditProductModal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        product={editingProduct}
        onSave={(id, updated) => updateProduct(id, updated)}
      />

      <ONDCExportModal
        isOpen={!!exportingProduct}
        onClose={() => setExportingProduct(null)}
        product={exportingProduct}
        vendor={vendor}
      />

      <BottomNav items={navItems} />
    </main>
  )
}
