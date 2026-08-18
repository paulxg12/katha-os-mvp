"use client"

import { useState } from "react"
import { useVendorStore } from "@/lib/hooks/useVendorStore"
import { Avatar } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { StatCard } from "@/components/ui/StatCard"
import { BottomNav } from "@/components/layout/BottomNav"
import { EditProfileModal } from "@/components/vendor/EditProfileModal"

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

export default function VendorProfilePage() {
  const { vendor, products, updateVendor, toggleONDCStatus, isLoaded } = useVendorStore()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const activeProducts = products.filter((p) => p.status === "active")
  const soldProducts = products.filter((p) => p.status === "sold")

  const playAudioBio = () => {
    if ("speechSynthesis" in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel()
        setIsPlayingAudio(false)
        return
      }
      setIsPlayingAudio(true)
      const utterance = new SpeechSynthesisUtterance(
        `Namaste. I am ${vendor.name}, a ${vendor.craft_generation || "master weaver"} from ${vendor.region}. ${vendor.bio}`
      )
      utterance.rate = 0.95
      utterance.onend = () => setIsPlayingAudio(false)
      utterance.onerror = () => setIsPlayingAudio(false)
      window.speechSynthesis.speak(utterance)
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-ochre border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-parchment pb-28">
      {/* Top Banner & Header */}
      <div className="relative bg-gradient-to-b from-parchment-dark/40 to-parchment pt-10 pb-6 px-5 border-b border-parchment-border">
        {/* Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <Badge variant="ochre" className="font-mono text-[10px]">
            {vendor.artisan_id}
          </Badge>
          <button
            onClick={() => setIsEditOpen(true)}
            className="py-2 px-4 bg-white border border-parchment-border text-ochre text-xs font-bold rounded-full hover:bg-parchment-border/40 transition shadow-2xs flex items-center gap-1.5"
          >
            ✏ Edit Profile
          </button>
        </div>

        {/* Master Profile Card */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <Avatar src={vendor.avatar_url} name={vendor.name} size="2xl" showBadge />
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-serif font-bold text-charcoal">{vendor.name}</h1>
              <Badge variant="success">Verified Master</Badge>
            </div>
            <p className="text-sm font-semibold text-ochre mt-0.5">{vendor.craft}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-charcoal-muted mt-2">
              <span className="flex items-center gap-1">
                📍 {vendor.region}
              </span>
              <span className="flex items-center gap-1">
                🏛 {vendor.craft_generation || "Master Artisan"}
              </span>
            </div>
          </div>
        </div>

        {/* Heritage Bio */}
        {vendor.bio && (
          <div className="mt-5 p-4 rounded-2xl bg-parchment-card border border-parchment-border text-xs text-charcoal leading-relaxed relative">
            <p className="italic font-serif text-sm text-charcoal-dark mb-1">&ldquo;Our Loom Story&rdquo;</p>
            <p>{vendor.bio}</p>
          </div>
        )}
      </div>

      {/* Audio Heritage Bio Player */}
      <div className="px-5 mt-6">
        <div className="bg-gradient-to-r from-indigo-brand to-indigo-dark text-white rounded-3xl p-5 shadow-organic border border-indigo-brand/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={playAudioBio}
                className="w-12 h-12 rounded-full bg-white text-indigo-dark flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition"
              >
                {isPlayingAudio ? (
                  <span className="text-xl">⏸</span>
                ) : (
                  <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-indigo-light">Artisan Voice Story</p>
                <p className="text-sm font-bold font-serif">Listen to {vendor.name}&apos;s Heritage Narrative</p>
              </div>
            </div>

            {/* Equalizer animation */}
            <div className="flex items-center gap-1 h-6">
              {[12, 20, 16, 24, 14, 22].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 bg-indigo-light rounded-full transition-all duration-300 ${
                    isPlayingAudio ? "animate-pulse" : "opacity-40"
                  }`}
                  style={{ height: isPlayingAudio ? `${h}px` : "8px" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ONDC Node Status Switcher */}
      <div className="px-5 mt-6">
        <div className="bg-parchment-card rounded-3xl p-5 border border-parchment-border shadow-organic">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-muted">
                Open Network Status
              </span>
              <h3 className="text-base font-serif font-bold text-charcoal">ONDC Seller Node</h3>
            </div>
            <button
              onClick={toggleONDCStatus}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition ${
                vendor.ondc_status === "active"
                  ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                  : "bg-gray-200 text-gray-700 border-gray-300"
              }`}
            >
              {vendor.ondc_status === "active" ? "● Node Active" : "○ Node Offline"}
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white p-3 rounded-2xl border border-parchment-border">
              <p className="text-charcoal-muted text-[10px] uppercase font-bold">Node Identifier</p>
              <p className="font-mono text-charcoal font-semibold truncate mt-0.5">{vendor.ondc_node_id}</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-parchment-border">
              <p className="text-charcoal-muted text-[10px] uppercase font-bold">Catalog Broadcast</p>
              <p className="text-emerald-700 font-bold mt-0.5">{activeProducts.length} Items Live</p>
            </div>
          </div>
        </div>
      </div>

      {/* Master Craftsman Portfolio Gallery */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-serif font-bold text-charcoal">Craftsmanship Portfolio</h2>
          <span className="text-xs text-ochre font-semibold">Masterpiece Showcase</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {vendor.portfolio_images.map((img, idx) => (
            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-parchment-border shadow-2xs group">
              <img
                src={img}
                alt={`Craft showcase ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2 flex items-end">
                <span className="text-[10px] text-white font-serif font-bold">Banarasi Handloom #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Workshop Address */}
      <div className="px-5 mt-6">
        <div className="bg-parchment-card rounded-3xl p-5 border border-parchment-border shadow-organic space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-ochre">Loom Workshop & Contact</h3>

          <div className="flex items-start gap-3 text-xs text-charcoal">
            <span className="text-base">📍</span>
            <div>
              <p className="font-bold text-charcoal">Loom Address</p>
              <p className="text-charcoal-muted">{vendor.address}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-parchment-border">
            <div>
              <p className="font-bold text-charcoal">Phone / WhatsApp</p>
              <p className="text-charcoal-muted">{vendor.phone}</p>
            </div>
            <div>
              <p className="font-bold text-charcoal">Artisan Email</p>
              <p className="text-charcoal-muted truncate">{vendor.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bank & Direct Payout Settings */}
      <div className="px-5 mt-6">
        <div className="bg-parchment-card rounded-3xl p-5 border border-parchment-border shadow-organic space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ochre">Direct Payout Account</h3>
            <Badge variant="success">Verified UPI</Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3 rounded-2xl border border-parchment-border">
              <p className="text-[10px] font-bold uppercase text-charcoal-muted">UPI ID</p>
              <p className="font-mono font-bold text-charcoal mt-0.5">{vendor.upi_id}</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-parchment-border">
              <p className="text-[10px] font-bold uppercase text-charcoal-muted">Bank Account</p>
              <p className="font-mono font-bold text-charcoal mt-0.5">{vendor.account_no}</p>
            </div>
          </div>
          <p className="text-[11px] text-charcoal-muted italic">
            * ONDC order payouts are automatically settled to this bank account within 24 hours of delivery.
          </p>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        vendor={vendor}
        onSave={updateVendor}
      />

      <BottomNav items={navItems} />
    </main>
  )
}
