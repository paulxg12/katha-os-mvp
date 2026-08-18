"use client"

import { useState, useEffect } from "react"
import type { Vendor, Product, VendorOrder } from "@/types"

const INITIAL_VENDOR: Vendor = {
  id: "v1",
  name: "Lakshmi Devi",
  craft: "Master Banarasi Silk Weaver",
  region: "Varanasi, Uttar Pradesh",
  bio: "Third-generation master weaver preserving the royal Banarasi silk heritage. Operating 4 traditional handlooms, specializing in pure silk, Kadhwa technique, and hand-embroidered gold zari borders.",
  avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
  phone: "+91 98765 43210",
  email: "lakshmi.banaras@kathaos.org",
  address: "B-14/92 Weaver Colony, Loom Street, Varanasi, UP - 221001",
  craft_generation: "3rd Generation Weaver",
  artisan_id: "KATHA-ART- Varanasi-8829",
  ondc_node_id: "ONDC-SELLER-IN-VAR-9941",
  ondc_status: "active",
  upi_id: "lakshmidevi@upi",
  bank_name: "State Bank of India (Varanasi Branch)",
  account_no: "•••• •••• 4892",
  audio_bio_url: null,
  portfolio_images: [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600",
  ],
  joined_at: "2025-11-15",
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    vendor_id: "v1",
    title: "Royal Crimson Banarasi Silk Saree",
    category: "Textile & Apparel",
    materials: ["Pure Mulberry Silk", "Real Gold Zari"],
    price: 18500,
    summary: "Handwoven pure silk saree with intricate gold Kadhwa zari border. Takes 25 days of intensive handloom work.",
    image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
    transcript_raw: "Humne yeh saree Varanasi ke traditional loom par lagbhag 25 din mein tayyar ki hai. Ismein pure Mulberry silk aur sacha gold zari ka istemal hua hai.",
    status: "active",
    ondc_ready: true,
    heritage_story: "Inspired by Mughal-era royal court motifs, this piece uses the authentic Kadhwa technique where each motif is individually hand-woven without floating threads at the back.",
    created_at: "2025-12-01",
  },
  {
    id: "p2",
    vendor_id: "v1",
    title: "Silver Zari Peacock Banarasi Dupatta",
    category: "Textile & Apparel",
    materials: ["Katan Silk", "Silver Zari"],
    price: 6800,
    summary: "Featherlight silk dupatta adorned with dancing peacock motifs in silver zari.",
    image_url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
    transcript_raw: "Yeh dupatta halka Katan silk hai jismein mor ka design silver zari se banaya gaya hai.",
    status: "active",
    ondc_ready: true,
    heritage_story: "Peacock motifs symbolize rain, grace, and renewal in eastern UP folklore. Crafted by master weavers over 12 days.",
    created_at: "2025-12-10",
  },
  {
    id: "p3",
    vendor_id: "v1",
    title: "Pastel Blue Heritage Brocade Stole",
    category: "Textile & Apparel",
    materials: ["Organza Silk", "Gold Zari"],
    price: 4500,
    summary: "Contemporary pastel stole featuring traditional floral Butti work.",
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600",
    transcript_raw: "Contemporary pastel blue shade jismein traditional Ganga-Jamuni butti ka kaam hai.",
    status: "sold",
    ondc_ready: true,
    heritage_story: "Combines 400-year-old Banarasi weaving traditions with modern pastel hues for modern celebratory wear.",
    created_at: "2025-11-20",
  },
  {
    id: "p4",
    vendor_id: "v1",
    title: "Maroon Handloom Banarasi Table Runner",
    category: "Home & Heritage Decor",
    materials: ["Raw Silk", "Zari"],
    price: 3200,
    summary: "Rich maroon silk table runner with traditional geometric Mughal borders.",
    image_url: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&q=80&w=600",
    transcript_raw: "Ghar ko sajaane ke liye maroon raw silk runner zari border ke sath.",
    status: "active",
    ondc_ready: true,
    heritage_story: "Woven using leftover warp ends from saree weaving to promote zero-waste sustainable artisan practices.",
    created_at: "2025-12-15",
  },
]

const INITIAL_ORDERS: VendorOrder[] = [
  {
    id: "ord-101",
    order_number: "ONDC-2026-9812",
    buyer_name: "Ananya Sharma",
    product_title: "Pastel Blue Heritage Brocade Stole",
    amount: 4500,
    status: "delivered",
    date: "2026-02-10",
    ondc_tx_id: "TXN-ONDC-881920",
  },
  {
    id: "ord-102",
    order_number: "ONDC-2026-9941",
    buyer_name: "Vikram Sengupta",
    product_title: "Silver Zari Peacock Banarasi Dupatta",
    amount: 6800,
    status: "shipped",
    date: "2026-02-16",
    ondc_tx_id: "TXN-ONDC-992144",
  },
  {
    id: "ord-103",
    order_number: "ONDC-2026-9988",
    buyer_name: "Priya Nair",
    product_title: "Royal Crimson Banarasi Silk Saree",
    amount: 18500,
    status: "processing",
    date: "2026-02-18",
    ondc_tx_id: "TXN-ONDC-100293",
  },
]

export function useVendorStore() {
  const [vendor, setVendor] = useState<Vendor>(INITIAL_VENDOR)
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [orders, setOrders] = useState<VendorOrder[]>(INITIAL_ORDERS)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedVendor = localStorage.getItem("kathaos_vendor")
      const savedProducts = localStorage.getItem("kathaos_products")
      const savedOrders = localStorage.getItem("kathaos_orders")

      if (savedVendor) setVendor(JSON.parse(savedVendor))
      if (savedProducts) setProducts(JSON.parse(savedProducts))
      if (savedOrders) setOrders(JSON.parse(savedOrders))
    } catch (e) {
      console.error("Error reading vendor store from localStorage", e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save changes to localStorage
  const updateVendor = (updated: Partial<Vendor>) => {
    setVendor((prev) => {
      const next = { ...prev, ...updated }
      try {
        localStorage.setItem("kathaos_vendor", JSON.stringify(next))
      } catch (e) {
        console.error("Error saving vendor to localStorage", e)
      }
      return next
    })
  }

  const addProduct = (newProduct: Omit<Product, "id" | "created_at" | "vendor_id">) => {
    const created: Product = {
      ...newProduct,
      id: `p-${Date.now()}`,
      vendor_id: vendor.id,
      created_at: new Date().toISOString().split("T")[0],
      ondc_ready: true,
    }
    setProducts((prev) => {
      const next = [created, ...prev]
      try {
        localStorage.setItem("kathaos_products", JSON.stringify(next))
      } catch (e) {
        console.error("Error saving products to localStorage", e)
      }
      return next
    })
    return created
  }

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
      try {
        localStorage.setItem("kathaos_products", JSON.stringify(next))
      } catch (e) {
        console.error("Error updating products in localStorage", e)
      }
      return next
    })
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id)
      try {
        localStorage.setItem("kathaos_products", JSON.stringify(next))
      } catch (e) {
        console.error("Error deleting product from localStorage", e)
      }
      return next
    })
  }

  const toggleONDCStatus = () => {
    const nextStatus = vendor.ondc_status === "active" ? "offline" : "active"
    updateVendor({ ondc_status: nextStatus })
  }

  return {
    vendor,
    products,
    orders,
    isLoaded,
    updateVendor,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleONDCStatus,
  }
}
