"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/types"

interface EditProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  onSave: (id: string, updated: Partial<Product>) => void
}

export function EditProductModal({ isOpen, onClose, product, onSave }: EditProductModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Textile & Apparel",
    price: 0,
    materialsStr: "",
    summary: "",
    heritage_story: "",
    status: "active" as "active" | "sold" | "draft",
  })

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        category: product.category || "Textile & Apparel",
        price: product.price || 0,
        materialsStr: product.materials ? product.materials.join(", ") : "",
        summary: product.summary || "",
        heritage_story: product.heritage_story || "",
        status: product.status || "active",
      })
    }
  }, [product])

  if (!isOpen || !product) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const materialsArr = formData.materialsStr
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean)

    onSave(product.id, {
      title: formData.title,
      category: formData.category,
      price: Number(formData.price),
      materials: materialsArr,
      summary: formData.summary,
      heritage_story: formData.heritage_story,
      status: formData.status,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-fade-in-up">
      <div className="bg-parchment-card w-full max-w-lg rounded-3xl border border-parchment-border shadow-organic-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-parchment-border flex items-center justify-between bg-parchment/60">
          <div>
            <h2 className="text-xl font-serif font-bold text-charcoal">Edit Product Listing</h2>
            <p className="text-xs text-charcoal-muted">Update listing specs & heritage story</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-parchment-border/50 text-charcoal hover:bg-parchment-border flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              Product Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-parchment-border rounded-2xl text-sm font-medium text-charcoal focus:outline-none focus:border-indigo-brand"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-indigo-brand"
              >
                <option value="Textile & Apparel">Textile & Apparel</option>
                <option value="Home & Heritage Decor">Home & Heritage Decor</option>
                <option value="Pottery & Clay Art">Pottery & Clay Art</option>
                <option value="Jewelry & Metalwork">Jewelry & Metalwork</option>
                <option value="Painting & Folklore Art">Painting & Folklore Art</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Price (INR ₹)
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-white border border-parchment-border rounded-2xl text-sm font-bold text-charcoal focus:outline-none focus:border-indigo-brand"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              Status
            </label>
            <div className="flex gap-2">
              {(["active", "sold", "draft"] as const).map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setFormData({ ...formData, status: st })}
                  className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold uppercase tracking-wider border transition ${
                    formData.status === st
                      ? "bg-ochre text-white border-ochre"
                      : "bg-white text-charcoal-muted border-parchment-border hover:bg-parchment-border/30"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              Materials Used (comma separated)
            </label>
            <input
              type="text"
              value={formData.materialsStr}
              onChange={(e) => setFormData({ ...formData, materialsStr: e.target.value })}
              placeholder="e.g. Mulberry Silk, Gold Zari"
              className="w-full px-4 py-2.5 bg-white border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-indigo-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              Short Commerce Summary
            </label>
            <textarea
              rows={2}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-indigo-brand resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              Heritage Cultural Narrative
            </label>
            <textarea
              rows={3}
              value={formData.heritage_story}
              onChange={(e) => setFormData({ ...formData, heritage_story: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-indigo-brand resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-parchment-border/50 text-charcoal font-semibold rounded-full hover:bg-parchment-border transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-gradient-to-r from-ochre to-ochre-dark text-white font-semibold rounded-full hover:opacity-95 shadow-organic transition text-sm"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
