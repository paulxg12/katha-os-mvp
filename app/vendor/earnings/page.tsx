"use client"

import { useState } from "react"
import { useVendorStore } from "@/lib/hooks/useVendorStore"
import { PageHeader } from "@/components/ui/PageHeader"
import { StatCard } from "@/components/ui/StatCard"
import { Badge } from "@/components/ui/Badge"
import { BottomNav } from "@/components/layout/BottomNav"

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

export default function VendorEarningsPage() {
  const { vendor, orders, isLoaded } = useVendorStore()
  const [settling, setSettling] = useState(false)
  const [settledMsg, setSettledMsg] = useState(false)

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-ochre border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0)
  const avgOrderValue = Math.round(totalRevenue / (orders.length || 1))
  const pendingPayout = orders
    .filter((o) => o.status === "processing" || o.status === "shipped")
    .reduce((sum, o) => sum + o.amount, 0)

  const handleInstantSettlement = () => {
    setSettling(true)
    setTimeout(() => {
      setSettling(false)
      setSettledMsg(true)
      setTimeout(() => setSettledMsg(false), 4000)
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-parchment pb-28">
      {/* Header */}
      <div className="bg-parchment-card px-5 pt-12 pb-5 border-b border-parchment-border shadow-2xs">
        <PageHeader
          title="Earnings & Settlements"
          subtitle="ONDC Network direct payments to artisan bank account"
        />
      </div>

      {/* Metrics */}
      <div className="px-5 mt-6">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Total Revenue"
            value={`₹${totalRevenue.toLocaleString("en-IN")}`}
            variant="ochre"
          />
          <StatCard
            label="Pending Payout"
            value={`₹${pendingPayout.toLocaleString("en-IN")}`}
            subtext="In Settlement"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <StatCard label="Orders Count" value={orders.length} subtext="ONDC Verified" />
          <StatCard label="Avg Order Value" value={`₹${avgOrderValue.toLocaleString("en-IN")}`} />
        </div>
      </div>

      {/* Instant Bank Payout Box */}
      <div className="px-5 mt-6">
        <div className="bg-parchment-card rounded-3xl p-5 border border-parchment-border shadow-organic space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-ochre">Pari-Passu Settlement</span>
              <h3 className="text-base font-serif font-bold text-charcoal">Bank Payout Account</h3>
            </div>
            <Badge variant="success">UPI Enabled</Badge>
          </div>

          <div className="p-3 bg-parchment rounded-2xl border border-parchment-border text-xs flex justify-between items-center">
            <div>
              <p className="font-bold text-charcoal">{vendor.bank_name}</p>
              <p className="text-charcoal-muted font-mono">{vendor.account_no} · {vendor.upi_id}</p>
            </div>
            <span className="text-emerald-700 font-bold text-xs">Direct Pay</span>
          </div>

          <button
            onClick={handleInstantSettlement}
            disabled={settling || pendingPayout === 0}
            className="w-full py-3 px-4 bg-gradient-to-r from-ochre to-ochre-dark text-white font-bold rounded-full hover:opacity-95 shadow-organic transition text-xs uppercase tracking-wider disabled:opacity-50"
          >
            {settling ? "Processing Bank Settlement..." : `Withdraw ₹${pendingPayout.toLocaleString("en-IN")} to Bank`}
          </button>

          {settledMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-xs text-center font-semibold animate-fade-in-up">
              ✓ ₹{pendingPayout.toLocaleString("en-IN")} successfully transferred via UPI to {vendor.upi_id}!
            </div>
          )}
        </div>
      </div>

      {/* Order Transaction History */}
      <div className="px-5 mt-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-3">
          ONDC Transaction History
        </h3>

        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-parchment-card rounded-3xl p-4 border border-parchment-border shadow-organic space-y-2"
            >
              <div className="flex items-center justify-between text-xs border-b border-parchment-border pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-charcoal">{order.order_number}</span>
                  <span className="text-[10px] font-mono text-charcoal-muted">({order.ondc_tx_id})</span>
                </div>
                <Badge
                  variant={
                    order.status === "delivered"
                      ? "success"
                      : order.status === "shipped"
                      ? "info"
                      : "warning"
                  }
                >
                  {order.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div>
                  <p className="font-serif font-bold text-charcoal text-sm">{order.product_title}</p>
                  <p className="text-charcoal-muted mt-0.5">Buyer: {order.buyer_name} · Date: {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-charcoal">₹{order.amount.toLocaleString("en-IN")}</p>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                    {order.status === "delivered" ? "Settled" : "In Escrow"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav items={navItems} />
    </main>
  )
}
