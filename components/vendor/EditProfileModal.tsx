"use client"

import { useState } from "react"
import type { Vendor } from "@/types"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  vendor: Vendor
  onSave: (updated: Partial<Vendor>) => void
}

export function EditProfileModal({ isOpen, onClose, vendor, onSave }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: vendor.name || "",
    craft: vendor.craft || "",
    region: vendor.region || "",
    bio: vendor.bio || "",
    phone: vendor.phone || "",
    email: vendor.email || "",
    address: vendor.address || "",
    craft_generation: vendor.craft_generation || "",
    upi_id: vendor.upi_id || "",
    bank_name: vendor.bank_name || "",
    account_no: vendor.account_no || "",
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-fade-in-up">
      <div className="bg-parchment-card w-full max-w-lg rounded-3xl border border-parchment-border shadow-organic-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-parchment-border flex items-center justify-between bg-parchment/60">
          <div>
            <h2 className="text-xl font-serif font-bold text-charcoal">Edit Artisan Profile</h2>
            <p className="text-xs text-charcoal-muted">Update your heritage shop & payout credentials</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-parchment-border/50 text-charcoal hover:bg-parchment-border flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-parchment-border rounded-2xl text-sm font-medium text-charcoal focus:outline-none focus:border-indigo-brand"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Craft Specialty
              </label>
              <input
                type="text"
                required
                value={formData.craft}
                onChange={(e) => setFormData({ ...formData, craft: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-indigo-brand"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Craft Generation
              </label>
              <input
                type="text"
                placeholder="e.g. 3rd Generation Weaver"
                value={formData.craft_generation}
                onChange={(e) => setFormData({ ...formData, craft_generation: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-indigo-brand"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              Region & Village
            </label>
            <input
              type="text"
              required
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-indigo-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              Artisan Story / Heritage Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-indigo-brand resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-indigo-brand"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-indigo-brand"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              Loom / Workshop Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-indigo-brand"
            />
          </div>

          <div className="pt-2 border-t border-parchment-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ochre mb-3">
              Bank & Payout Setup (ONDC Integrated)
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-charcoal-muted mb-1">UPI ID for Direct Payout</label>
                <input
                  type="text"
                  placeholder="name@upi"
                  value={formData.upi_id}
                  onChange={(e) => setFormData({ ...formData, upi_id: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-charcoal-muted mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={formData.bank_name}
                    onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal-muted mb-1">Account No.</label>
                  <input
                    type="text"
                    value={formData.account_no}
                    onChange={(e) => setFormData({ ...formData, account_no: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
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
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
