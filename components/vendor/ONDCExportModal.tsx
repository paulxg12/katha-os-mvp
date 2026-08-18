"use client"

import { useState } from "react"
import type { Product, Vendor } from "@/types"

interface ONDCExportModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  vendor: Vendor
}

export function ONDCExportModal({ isOpen, onClose, product, vendor }: ONDCExportModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen || !product) return null

  // Generate standardized ONDC Protocol Catalog Item payload
  const ondcPayload = {
    context: {
      domain: "ONDC:RET10",
      action: "on_search",
      country: "IND",
      city: "std:0542", // Varanasi city code
      core_version: "1.2.0",
      bap_id: "buyer-app-network.ondc.org",
      bpp_id: vendor.ondc_node_id || "ONDC-SELLER-IN-8829",
      transaction_id: `tx-${product.id}`,
      message_id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
    },
    message: {
      catalog: {
        "bpp/descriptor": {
          name: vendor.name,
          symbol: vendor.avatar_url || "",
          short_desc: vendor.craft,
          long_desc: vendor.bio,
        },
        "bpp/providers": [
          {
            id: vendor.id,
            descriptor: {
              name: vendor.name,
              short_desc: `${vendor.craft} Master from ${vendor.region}`,
            },
            locations: [
              {
                id: "loc-varanasi-01",
                gps: "25.3176,82.9739",
                address: {
                  street: vendor.address || "Varanasi Artisan Cluster",
                  city: "Varanasi",
                  state: "Uttar Pradesh",
                  area_code: "221001",
                },
              },
            ],
            items: [
              {
                id: product.id,
                descriptor: {
                  name: product.title,
                  symbol: product.image_url || "",
                  short_desc: product.summary,
                  long_desc: product.heritage_story || product.summary,
                  images: product.image_url ? [product.image_url] : [],
                },
                price: {
                  currency: "INR",
                  value: product.price.toString(),
                  maximum_value: (product.price * 1.15).toFixed(0).toString(),
                },
                category_id: product.category,
                fulfillment_id: "ful-std-courier",
                location_id: "loc-varanasi-01",
                tags: [
                  {
                    code: "heritage_archive",
                    list: [
                      { code: "region", value: vendor.region },
                      { code: "craft_generation", value: vendor.craft_generation || "Handloom" },
                      { code: "materials", value: product.materials.join(", ") },
                      { code: "voice_transcript", value: product.transcript_raw || "Voice extracted catalog item" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  }

  const jsonString = JSON.stringify(ondcPayload, null, 2)

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ondc-catalog-${product.id}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-fade-in-up">
      <div className="bg-parchment-card w-full max-w-xl rounded-3xl border border-parchment-border shadow-organic-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-parchment-border flex items-center justify-between bg-parchment/60">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-serif font-bold text-charcoal">ONDC Protocol Catalog JSON</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold tracking-wider uppercase">
                ONDC Ready
              </span>
            </div>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Standardized Schema v1.2.0 for Open Network Commerce catalog broadcast
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-parchment-border/50 text-charcoal hover:bg-parchment-border flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="bg-charcoal text-emerald-400 font-mono text-xs p-4 rounded-2xl overflow-x-auto border border-charcoal-muted/30 shadow-inner max-h-96">
            <pre>{jsonString}</pre>
          </div>

          <div className="bg-indigo-fixed/30 border border-indigo-brand/20 p-4 rounded-2xl">
            <h4 className="text-xs font-bold text-indigo-dark uppercase tracking-wider mb-1">
              Network Interoperability Status
            </h4>
            <p className="text-xs text-indigo-dark/80 leading-relaxed">
              This catalog item includes both traditional e-commerce parameters and KathaOS heritage tags. Ready to broadcast directly to seller NP node <span className="font-mono font-semibold">{vendor.ondc_node_id}</span>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-parchment-border flex gap-3 bg-parchment/60">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 bg-white border border-parchment-border text-charcoal font-semibold rounded-full hover:bg-parchment-border/40 transition text-sm flex items-center justify-center gap-2"
          >
            {copied ? "✓ Copied Payload!" : "📋 Copy JSON Payload"}
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 py-2.5 px-4 bg-gradient-to-r from-ochre to-ochre-dark text-white font-semibold rounded-full hover:opacity-95 shadow-organic transition text-sm flex items-center justify-center gap-2"
          >
            ⬇ Download .json
          </button>
        </div>
      </div>
    </div>
  )
}
