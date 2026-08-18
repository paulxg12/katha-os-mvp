"use client"

import { Avatar } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { StatCard } from "@/components/ui/StatCard"
import { PageHeader } from "@/components/ui/PageHeader"
import { BottomNav } from "@/components/layout/BottomNav"
import type { Vendor, Product } from "@/types"

const mockVendor: Vendor = {
  id: "v1",
  name: "Lakshmi Devi",
  craft: "Banarasi Weaving",
  region: "Varanasi, Uttar Pradesh",
  bio: "Third-generation weaver crafting Banarasi silk sarees. Each piece takes 15-30 days on the handloom.",
  avatar_url: null,
  phone: "+91 98765 43210",
  joined_at: "2025-11-15",
}

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
    summary: "Lightweight silk dupatta with peacock motif in silver zari. Perfect for festive occasions.",
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
    summary: "Contemporary pastel stole with traditional butti work. Blends modern palette with heritage craft.",
    image_url: null,
    transcript_raw: null,
    status: "sold",
    created_at: "2025-11-20",
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

export default function VendorDashboardPage() {
  const activeProducts = mockProducts.filter((p) => p.status === "active")
  const soldProducts = mockProducts.filter((p) => p.status === "sold")
  const totalEarnings = soldProducts.reduce((sum, p) => sum + p.price, 0)

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Avatar name={mockVendor.name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-gray-900 truncate">{mockVendor.name}</h1>
              <Badge variant="success">Verified</Badge>
            </div>
            <p className="text-sm text-gray-500 truncate">{mockVendor.craft}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="text-xs text-gray-400">{mockVendor.region}</span>
            </div>
          </div>
        </div>
        {mockVendor.bio && (
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">{mockVendor.bio}</p>
        )}
      </div>

      {/* Stats */}
      <div className="px-5 py-6">
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Products" value={activeProducts.length} />
          <StatCard label="Sold" value={soldProducts.length} />
          <StatCard
            label="Earned"
            value={`₹${totalEarnings.toLocaleString("en-IN")}`}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 pb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="/vendor/add"
            className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Add Product</p>
              <p className="text-xs text-gray-500">Voice or manual</p>
            </div>
          </a>
          <a
            href="/vendor/products"
            className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">My Products</p>
              <p className="text-xs text-gray-500">{activeProducts.length} active</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Products */}
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Recent Products</h2>
          <a href="/vendor/products" className="text-xs text-blue-600 font-medium">
            View all
          </a>
        </div>
        <div className="space-y-3">
          {mockProducts.slice(0, 3).map((product) => (
            <a
              key={product.id}
              href={`/buyer/${product.id}`}
              className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
            >
              <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">
                  {product.category === "Textile" ? "🧵" : product.category === "Pottery" ? "🏺" : "✨"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{product.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{product.materials.join(" · ")}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-gray-900">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <Badge variant={product.status === "active" ? "success" : "muted"}>
                    {product.status}
                  </Badge>
                </div>
              </div>
              <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Voice CTA */}
      <div className="px-5 pb-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Add a product by voice</h3>
              <p className="text-sm text-blue-100 mt-1">
                Just speak about your craft. KathaOS extracts the details automatically.
              </p>
              <a
                href="/vendor/add"
                className="inline-flex items-center gap-2 mt-3 bg-white text-blue-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-50 transition"
              >
                Start recording
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <BottomNav items={navItems} />
    </main>
  )
}
