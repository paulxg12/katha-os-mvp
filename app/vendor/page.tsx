"use client"

import { useState } from "react"
import Link from "next/link"
import { useVendorStore } from "@/lib/hooks/useVendorStore"
import { Avatar } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { StatCard } from "@/components/ui/StatCard"
import { BottomNav } from "@/components/layout/BottomNav"
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

export default function VendorDashboardPage() {
  const { vendor, products, orders, isLoaded, toggleONDCStatus } = useVendorStore()
  const [selectedONDCProduct, setSelectedONDCProduct] = useState<Product | null>(null)

  const activeProducts = products.filter((p) => p.status === "active")
  const soldProducts = products.filter((p) => p.status === "sold")
  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0)

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-ochre border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-parchment pb-28">
      {/* Artisan Profile Header */}
      <div className="bg-parchment-card px-5 pt-12 pb-6 border-b border-parchment-border shadow-2xs">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <Avatar src={vendor.avatar_url} name={vendor.name} size="lg" showBadge />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-serif font-bold text-charcoal truncate">{vendor.name}</h1>
                <Badge variant="ochre" className="text-[10px]">Verified Master</Badge>
              </div>
              <p className="text-xs font-semibold text-ochre truncate">{vendor.craft}</p>
              <div className="flex items-center gap-2 text-xs text-charcoal-muted mt-0.5">
                <span>📍 {vendor.region}</span>
              </div>
            </div>
          </div>
          <Link
            href="/vendor/profile"
            className="py-2 px-3 bg-parchment border border-parchment-border text-charcoal text-xs font-semibold rounded-full hover:bg-parchment-border/40 transition shrink-0"
          >
            My Profile
          </Link>
        </div>

        {/* ONDC Node Status Strip */}
        <div className="mt-4 p-3 rounded-2xl bg-parchment/80 border border-parchment-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                vendor.ondc_status === "active" ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
              }`}
            />
            <span className="text-xs font-medium text-charcoal">
              ONDC Node: <strong className="font-semibold">{vendor.ondc_status === "active" ? "Live Broadcast" : "Offline"}</strong>
            </span>
          </div>
          <button
            onClick={toggleONDCStatus}
            className="text-[11px] font-bold text-ochre hover:underline uppercase tracking-wider"
          >
            Switch {vendor.ondc_status === "active" ? "Offline" : "Live"}
          </button>
        </div>
      </div>

      {/* Hero Voice Creation CTA */}
      <div className="px-5 mt-6">
        <div className="bg-gradient-to-br from-ochre to-ochre-dark text-white rounded-3xl p-6 shadow-organic border border-ochre-container relative overflow-hidden">
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-ochre-light">Zero-UI Voice Engine</span>
              <h2 className="text-lg font-serif font-bold text-white mt-0.5">Speak & List New Craft</h2>
              <p className="text-xs text-white/80 mt-1 leading-relaxed">
                Describe your handloom or handicraft item in your mother tongue. KathaOS automatically extracts price, materials, and cultural story.
              </p>
              <Link
                href="/vendor/add"
                className="inline-flex items-center gap-2 mt-4 bg-parchment text-ochre font-bold text-xs px-5 py-2.5 rounded-full hover:bg-white transition shadow-sm"
              >
                🎙 Start Voice Recording
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="px-5 mt-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-3">Store Metrics</h3>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Active Items" value={activeProducts.length} subtext="ONDC Synced" />
          <StatCard label="Items Sold" value={soldProducts.length} subtext="Fulfilled" />
          <StatCard
            label="Revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN")}`}
            variant="ochre"
          />
        </div>
      </div>

      {/* Quick Access Menu */}
      <div className="px-5 mt-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-3">Quick Navigation</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/vendor/add"
            className="flex items-center gap-3.5 bg-parchment-card rounded-3xl p-4 border border-parchment-border shadow-organic hover:border-ochre/40 transition"
          >
            <div className="w-10 h-10 rounded-2xl bg-ochre-fixed text-ochre-dark flex items-center justify-center font-bold">
              🎙
            </div>
            <div>
              <p className="text-sm font-serif font-bold text-charcoal">Add Product</p>
              <p className="text-[11px] text-charcoal-muted">Voice & Manual</p>
            </div>
          </Link>

          <Link
            href="/vendor/products"
            className="flex items-center gap-3.5 bg-parchment-card rounded-3xl p-4 border border-parchment-border shadow-organic hover:border-ochre/40 transition"
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-fixed text-indigo-dark flex items-center justify-center font-bold">
              📦
            </div>
            <div>
              <p className="text-sm font-serif font-bold text-charcoal">My Catalog</p>
              <p className="text-[11px] text-charcoal-muted">{products.length} Products</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Catalog Items */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Recent Catalog Listings</h3>
          <Link href="/vendor/products" className="text-xs text-ochre font-bold hover:underline">
            View All ({products.length})
          </Link>
        </div>
        <div className="space-y-3">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="bg-parchment-card rounded-3xl p-4 border border-parchment-border shadow-organic flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-14 h-14 rounded-2xl bg-parchment overflow-hidden border border-parchment-border flex items-center justify-center shrink-0">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">🧵</span>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-serif font-bold text-charcoal truncate">{product.title}</h4>
                  <p className="text-xs text-charcoal-muted truncate mt-0.5">
                    {product.materials.join(" · ")}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-charcoal">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <Badge variant={product.status === "active" ? "success" : "muted"}>
                      {product.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedONDCProduct(product)}
                className="py-1.5 px-3 bg-parchment border border-parchment-border text-[11px] font-bold text-indigo-dark rounded-full hover:bg-indigo-fixed/40 transition shrink-0"
              >
                ONDC JSON
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent ONDC Network Orders */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">Recent ONDC Orders</h3>
          <Link href="/vendor/earnings" className="text-xs text-ochre font-bold hover:underline">
            Earnings Details
          </Link>
        </div>
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-parchment-card rounded-3xl p-4 border border-parchment-border shadow-organic flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-mono text-[10px] text-charcoal-muted font-bold">{order.order_number}</span>
                <p className="font-serif font-bold text-charcoal text-sm mt-0.5">{order.product_title}</p>
                <p className="text-charcoal-muted mt-0.5">Buyer: {order.buyer_name} · {order.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-charcoal">₹{order.amount.toLocaleString("en-IN")}</p>
                <Badge
                  variant={
                    order.status === "delivered"
                      ? "success"
                      : order.status === "shipped"
                      ? "info"
                      : "warning"
                  }
                  className="mt-1"
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ONDCExportModal
        isOpen={!!selectedONDCProduct}
        onClose={() => setSelectedONDCProduct(null)}
        product={selectedONDCProduct}
        vendor={vendor}
      />

      <BottomNav items={navItems} />
    </main>
  )
}
