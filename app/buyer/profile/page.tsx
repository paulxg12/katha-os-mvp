"use client"

import { Avatar } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { BottomNav } from "@/components/layout/BottomNav"
import type { BuyerProfile, Product } from "@/types"

const mockBuyer: BuyerProfile = {
  id: "b1",
  name: "Priya Sharma",
  avatar_url: null,
  interests: ["Textiles", "Pottery", "Heritage Crafts"],
  joined_at: "2025-12-01",
}

const mockSavedProducts: Product[] = [
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
]

const mockPurchases: (Product & { purchased_at: string })[] = [
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
    purchased_at: "2025-12-05",
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

export default function BuyerProfilePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Avatar name={mockBuyer.name} size="lg" />
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">{mockBuyer.name}</h1>
            <p className="text-xs text-gray-400">
              Member since {new Date(mockBuyer.joined_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
            </p>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-50">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Interests */}
      <div className="px-5 py-4">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {mockBuyer.interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 pb-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
            <p className="text-2xl font-bold text-gray-900">{mockSavedProducts.length}</p>
            <p className="text-xs text-gray-500 mt-1">Saved</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
            <p className="text-2xl font-bold text-gray-900">{mockPurchases.length}</p>
            <p className="text-xs text-gray-500 mt-1">Purchased</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-xs text-gray-500 mt-1">Stories Heard</p>
          </div>
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="px-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900">Recent Purchases</h2>
          <a href="/buyer/purchases" className="text-xs text-blue-600 font-medium">View all</a>
        </div>
        {mockPurchases.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
            <p className="text-sm text-gray-400">No purchases yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockPurchases.map((item) => (
              <a
                key={item.id}
                href={`/buyer/${item.id}`}
                className="flex items-center gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
              >
                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    Purchased {new Date(item.purchased_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                  <p className="text-sm font-bold text-gray-900 mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                </div>
                <Badge variant="muted">Delivered</Badge>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Cultural Engagement */}
      <div className="px-5 pb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Your Cultural Journey</h2>
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">3 heritage stories discovered</h3>
              <p className="text-sm text-purple-100 mt-1">
                You&apos;ve explored crafts from Varanasi and Jaipur. Each purchase preserves a cultural tradition.
              </p>
              <button className="inline-flex items-center gap-2 mt-3 bg-white text-violet-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-purple-50 transition">
                Explore more stories
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav items={navItems} />
    </main>
  )
}
