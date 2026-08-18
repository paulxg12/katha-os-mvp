"use client"

import { useState, useEffect } from "react"
import type { Vendor, Product, VendorOrder } from "@/types"

export const CRAFT_IMAGE_COLLECTION = [
  {
    category: "Textile & Apparel",
    title: "Banarasi Silk Saree",
    url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
  },
  {
    category: "Textile & Apparel",
    title: "Kutch Embroidered Dupatta",
    url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800",
  },
  {
    category: "Textile & Apparel",
    title: "Kashmir Pashmina Shawl",
    url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
  },
  {
    category: "Pottery & Clay Art",
    title: "Jaipur Blue Pottery Vase",
    url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800",
  },
  {
    category: "Painting & Folklore Art",
    title: "Madhubani Tree of Life Painting",
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&q=80&w=800",
  },
  {
    category: "Home & Heritage Decor",
    title: "Tanjore Gold Leaf Panel",
    url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&q=80&w=800",
  },
  {
    category: "Jewelry & Metalwork",
    title: "Dhokra Brass Metal Art",
    url: "https://images.unsplash.com/photo-1567016526105-22da7c13161a?auto=format&fit=crop&q=80&w=800",
  },
  {
    category: "Home & Heritage Decor",
    title: "Banarasi Raw Silk Runner",
    url: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&q=80&w=800",
  },
]

const INITIAL_VENDOR: Vendor = {
  id: "v1",
  name: "Lakshmi Devi",
  craft: "Master Banarasi Silk Weaver",
  region: "Varanasi, Uttar Pradesh",
  bio: "Third-generation master weaver preserving the royal Banarasi silk heritage. Operating 4 traditional handlooms, specializing in pure silk, Kadhwa technique, and hand-embroidered gold zari borders.",
  avatar_url: null,
  phone: "+91 98765 43210",
  email: "lakshmi.banaras@kathaos.org",
  address: "B-14/92 Weaver Colony, Loom Street, Varanasi, UP - 221001",
  craft_generation: "3rd Generation Weaver",
  artisan_id: "KATHA-ART-VARANASI-8829",
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
    image_url: CRAFT_IMAGE_COLLECTION[0].url,
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
    image_url: CRAFT_IMAGE_COLLECTION[1].url,
    transcript_raw: "Yeh dupatta halka Katan silk hai jismein mor ka design silver zari se banaya gaya hai.",
    status: "active",
    ondc_ready: true,
    heritage_story: "Peacock motifs symbolize rain, grace, and renewal in eastern UP folklore. Crafted by master weavers over 12 days.",
    created_at: "2025-12-10",
  },
  {
    id: "p3",
    vendor_id: "v1",
    title: "Kashmir Hand-Woven Sozni Pashmina Shawl",
    category: "Textile & Apparel",
    materials: ["100% Pashmina Wool", "Silk Thread Embroidery"],
    price: 24000,
    summary: "Luxurious hand-spun Pashmina shawl with fine needlework Sozni embroidery around the borders.",
    image_url: CRAFT_IMAGE_COLLECTION[2].url,
    transcript_raw: "Kashmir se pure Pashmina wool jismein haath ki Sozni needlework hai.",
    status: "active",
    ondc_ready: true,
    heritage_story: "Spun from the undercoat of Changthangi goats in Ladakh, embroidered by Kashmiri craftsmen over 3 months.",
    created_at: "2025-12-18",
  },
  {
    id: "p4",
    vendor_id: "v1",
    title: "Jaipur Royal Cobalt Blue Pottery Vase",
    category: "Pottery & Clay Art",
    materials: ["Quartz Powder", "Natural Cobalt Oxide Glaze"],
    price: 4200,
    summary: "Hand-painted blue pottery vase with floral Arabesque motifs, low-fired using traditional Egyptian paste techniques.",
    image_url: CRAFT_IMAGE_COLLECTION[3].url,
    transcript_raw: "Jaipur ki prasiddh blue pottery vase jismein cobalt blue aur phoolon ka kaam hai.",
    status: "active",
    ondc_ready: true,
    heritage_story: "Jaipur Blue Pottery is unique because it uses ground quartz stone instead of clay, making it water-resistant and non-porous.",
    created_at: "2025-12-22",
  },
  {
    id: "p5",
    vendor_id: "v1",
    title: "Madhubani Tree of Life Folk Canvas",
    category: "Painting & Folklore Art",
    materials: ["Handmade Paper", "Natural Botanical Pigments"],
    price: 8500,
    summary: "Intricate Mithila folk painting depicting the sacred Tree of Life and mating peacocks.",
    image_url: CRAFT_IMAGE_COLLECTION[4].url,
    transcript_raw: "Mithila Madhubani art jismein natural rang aur neem ki kalam ka istemal hua hai.",
    status: "active",
    ondc_ready: true,
    heritage_story: "Drawn using twigs and nib-pens, Madhubani art dates back to the Ramayana era, traditionally painted by women on mud walls.",
    created_at: "2026-01-05",
  },
  {
    id: "p6",
    vendor_id: "v1",
    title: "Tanjore 22K Gold Leaf Ganesha Panel",
    category: "Home & Heritage Decor",
    materials: ["Teak Wood", "22K Gold Foil", "Jaipur Stones"],
    price: 32000,
    summary: "Classical Tanjore relief painting embellished with 22-karat gold leaf foil and semi-precious Jaipur gemstones.",
    image_url: CRAFT_IMAGE_COLLECTION[5].url,
    transcript_raw: "South Indian Tanjore art jismein asli 22K sone ki patti aur teak wood ka istemal hai.",
    status: "sold",
    ondc_ready: true,
    heritage_story: "Originating in 16th century Thanjavur, Tanjore paintings retain their brilliant gold shine for over 100 years.",
    created_at: "2025-11-20",
  },
  {
    id: "p7",
    vendor_id: "v1",
    title: "Dhokra Lost-Wax Cast Brass Tribal Figurine",
    category: "Jewelry & Metalwork",
    materials: ["Brass", "Beeswax", "River Clay"],
    price: 5400,
    summary: "Ancient lost-wax bell metal casting of a tribal musician, hand-crafted by Chhattisgarh artisans.",
    image_url: CRAFT_IMAGE_COLLECTION[6].url,
    transcript_raw: "4000 saal purani Dhokra lost-wax casting technique se bana tribal idol.",
    status: "active",
    ondc_ready: true,
    heritage_story: "Dhokra is the oldest known non-ferrous metal casting technique in human history, dating back to the Mohenjo-daro Dancing Girl.",
    created_at: "2026-01-12",
  },
  {
    id: "p8",
    vendor_id: "v1",
    title: "Maroon Handloom Banarasi Table Runner",
    category: "Home & Heritage Decor",
    materials: ["Raw Silk", "Gold Zari"],
    price: 3200,
    summary: "Rich maroon silk table runner with traditional geometric Mughal borders.",
    image_url: CRAFT_IMAGE_COLLECTION[7].url,
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
    product_title: "Tanjore 22K Gold Leaf Ganesha Panel",
    amount: 32000,
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

export function triggerHaptic(pattern: number | number[] = 15) {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern)
    } catch {
      // Haptics fallback on unsupported browsers
    }
  }
}

export function useVendorStore() {
  const [vendor, setVendor] = useState<Vendor>(INITIAL_VENDOR)
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [orders, setOrders] = useState<VendorOrder[]>(INITIAL_ORDERS)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedVendor = localStorage.getItem("kathaos_vendor_v3")
      const savedProducts = localStorage.getItem("kathaos_products_v3")
      const savedOrders = localStorage.getItem("kathaos_orders_v3")

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
    triggerHaptic(20)
    setVendor((prev) => {
      const next = { ...prev, ...updated }
      try {
        localStorage.setItem("kathaos_vendor_v3", JSON.stringify(next))
      } catch (e) {
        console.error("Error saving vendor to localStorage", e)
      }
      return next
    })
  }

  const addProduct = (newProduct: Omit<Product, "id" | "created_at" | "vendor_id">) => {
    triggerHaptic([30, 50, 30])
    // Pick an authentic fallback image if none provided
    const randomImage = CRAFT_IMAGE_COLLECTION[Math.floor(Math.random() * CRAFT_IMAGE_COLLECTION.length)].url
    const created: Product = {
      ...newProduct,
      image_url: newProduct.image_url || randomImage,
      id: `p-${Date.now()}`,
      vendor_id: vendor.id,
      created_at: new Date().toISOString().split("T")[0],
      ondc_ready: true,
    }
    setProducts((prev) => {
      const next = [created, ...prev]
      try {
        localStorage.setItem("kathaos_products_v2", JSON.stringify(next))
      } catch (e) {
        console.error("Error saving products to localStorage", e)
      }
      return next
    })
    return created
  }

  const updateProduct = (id: string, updated: Partial<Product>) => {
    triggerHaptic(20)
    setProducts((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
      try {
        localStorage.setItem("kathaos_products_v2", JSON.stringify(next))
      } catch (e) {
        console.error("Error updating products in localStorage", e)
      }
      return next
    })
  }

  const deleteProduct = (id: string) => {
    triggerHaptic([40, 20])
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id)
      try {
        localStorage.setItem("kathaos_products_v2", JSON.stringify(next))
      } catch (e) {
        console.error("Error deleting product from localStorage", e)
      }
      return next
    })
  }

  const toggleONDCStatus = () => {
    triggerHaptic([15, 30, 15])
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
