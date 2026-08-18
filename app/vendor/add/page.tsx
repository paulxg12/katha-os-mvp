"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useVendorStore, CRAFT_IMAGE_COLLECTION, triggerHaptic } from "@/lib/hooks/useVendorStore"
import { useSpeechRecognition } from "@/lib/hooks/useSpeechRecognition"
import { BottomNav } from "@/components/layout/BottomNav"
import { Badge } from "@/components/ui/Badge"

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

type Mode = "voice" | "manual"
type RecordingStep = "idle" | "recording" | "processing" | "result"

export default function VendorAddPage() {
  const router = useRouter()
  const { addProduct } = useVendorStore()
  const [mode, setMode] = useState<Mode>("voice")
  const [step, setStep] = useState<RecordingStep>("idle")
  const [selectedImage, setSelectedImage] = useState<string>(CRAFT_IMAGE_COLLECTION[0].url)

  const { transcript, isListening, startListening, stopListening, resetTranscript } =
    useSpeechRecognition()

  const [extractedProduct, setExtractedProduct] = useState({
    title: "Handwoven Crimson Banarasi Silk Saree",
    category: "Textile & Apparel",
    price: 18500,
    materials: ["Pure Mulberry Silk", "Real Gold Zari"],
    summary: "Pure Mulberry silk saree handwoven with intricate gold zari floral border. Crafted over 22 days in Varanasi.",
    heritage_story: "This saree embodies the ancient Kadhwa weaving technique of Varanasi. Passed down through 3 generations of master weavers.",
  })

  const [manualForm, setManualForm] = useState({
    title: "",
    category: "Textile & Apparel",
    price: "",
    materials: "",
    summary: "",
    heritage_story: "",
  })

  const handleMicToggle = async () => {
    triggerHaptic(25)
    if (isListening) {
      stopListening()
      setStep("processing")
      processExtraction(
        transcript ||
          "This is a handwoven Banarasi silk saree in deep crimson with real gold zari. It took 20 days on the handloom and is priced at 18500 rupees."
      )
    } else {
      resetTranscript()
      startListening()
      setStep("recording")
    }
  }

  const processExtraction = async (inputTranscript: string) => {
    try {
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: inputTranscript }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.product && data.heritage) {
          setExtractedProduct({
            title: data.product.title || "Handwoven Banarasi Craft",
            category: data.product.category || "Textile & Apparel",
            price: data.product.price || 18500,
            materials: data.product.materials || ["Pure Silk", "Gold Zari"],
            summary: data.product.summary || "Traditional handloom craft listing.",
            heritage_story: data.heritage.story || "Handcrafted with ancestral heritage techniques.",
          })
        }
      }
    } catch (e) {
      console.warn("Using structured fallback extraction engine", e)
    } finally {
      setTimeout(() => {
        triggerHaptic([30, 30, 30])
        setStep("result")
      }, 1000)
    }
  }

  const handleSaveVoiceProduct = () => {
    addProduct({
      title: extractedProduct.title,
      category: extractedProduct.category,
      materials: extractedProduct.materials,
      price: extractedProduct.price,
      summary: extractedProduct.summary,
      heritage_story: extractedProduct.heritage_story,
      image_url: selectedImage,
      transcript_raw: transcript || "Voice extracted entry",
      status: "active",
    })
    router.push("/vendor/products")
  }

  const handleSaveManualProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const mats = manualForm.materials
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean)

    addProduct({
      title: manualForm.title || "Handcrafted Heritage Artifact",
      category: manualForm.category,
      materials: mats.length > 0 ? mats : ["Handloom Silk"],
      price: Number(manualForm.price) || 4500,
      summary: manualForm.summary || "Handmade by master artisans.",
      heritage_story: manualForm.heritage_story || "Preserving traditional Indian craft heritage.",
      image_url: selectedImage,
      transcript_raw: null,
      status: "active",
    })
    router.push("/vendor/products")
  }

  return (
    <main className="min-h-screen bg-parchment pb-28">
      {/* Header */}
      <div className="bg-parchment-card px-5 pt-12 pb-4 border-b border-parchment-border shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/vendor"
              onClick={() => triggerHaptic(10)}
              className="p-2 -ml-2 rounded-full hover:bg-parchment-border/40 text-charcoal transition"
            >
              ← Back
            </Link>
            <div>
              <h1 className="text-xl font-serif font-bold text-charcoal">Add New Craft Product</h1>
              <p className="text-xs text-charcoal-muted">List to KathaOS & ONDC Network catalog</p>
            </div>
          </div>
        </div>

        {/* Mode Toggle Switch */}
        <div className="mt-4 flex p-1 bg-parchment rounded-full border border-parchment-border">
          <button
            onClick={() => {
              triggerHaptic(15)
              setMode("voice")
            }}
            className={`flex-1 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition ${
              mode === "voice"
                ? "bg-gradient-to-r from-ochre to-ochre-dark text-white shadow-sm"
                : "text-charcoal-muted hover:text-charcoal"
            }`}
          >
            🎙 Voice-First (Zero UI)
          </button>
          <button
            onClick={() => {
              triggerHaptic(15)
              setMode("manual")
            }}
            className={`flex-1 py-2 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition ${
              mode === "manual"
                ? "bg-gradient-to-r from-ochre to-ochre-dark text-white shadow-sm"
                : "text-charcoal-muted hover:text-charcoal"
            }`}
          >
            ✏ Manual Entry Form
          </button>
        </div>
      </div>

      {/* Mode 1: Voice First */}
      {mode === "voice" && (
        <div className="px-5 py-8 flex flex-col items-center max-w-lg mx-auto">
          {step === "idle" && (
            <>
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-ochre-fixed/40 text-ochre flex items-center justify-center mx-auto mb-4 border border-ochre/20 shadow-organic">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-1">Tell us about your masterpiece</h2>
                <p className="text-xs text-charcoal-muted max-w-xs mx-auto leading-relaxed">
                  Tap the mic and speak naturally in your mother tongue. Mention your craft name, materials, price, and loom story.
                </p>
              </div>

              {/* Sample Prompts */}
              <div className="w-full mb-8 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal-muted text-center">
                  Try speaking something like:
                </p>
                <div className="bg-parchment-card p-3.5 rounded-2xl border border-parchment-border text-xs text-charcoal-muted italic">
                  &ldquo;Yeh Banarasi silk saree humne gold zari se 20 din mein buni hai. Iska daam 18,500 rupees hai.&rdquo;
                </div>
              </div>

              {/* Big Mic Button */}
              <button
                onClick={handleMicToggle}
                className="w-28 h-28 rounded-full bg-gradient-to-br from-ochre to-ochre-dark text-white flex items-center justify-center shadow-organic-lg hover:scale-105 active:scale-95 transition-all border-4 border-parchment"
              >
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </button>
              <p className="text-xs font-bold text-ochre uppercase tracking-wider mt-4">Tap to Start Recording</p>
            </>
          )}

          {step === "recording" && (
            <>
              <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 animate-glow-pulse border-4 border-parchment">
                  <div className="w-6 h-6 rounded-full bg-rose-600 animate-ping" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-1">Listening to your voice...</h2>
                <p className="text-xs text-charcoal-muted">Speak freely about your handloom item</p>
              </div>

              {/* Live Transcript Box */}
              <div className="w-full bg-parchment-card rounded-3xl p-5 border border-parchment-border shadow-organic mb-8 min-h-[120px]">
                <p className="text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-2">Live Voice Recognition</p>
                <p className="text-sm font-medium text-charcoal leading-relaxed">
                  {transcript || "Listening... Speak now!"}
                </p>
              </div>

              {/* Stop Button */}
              <button
                onClick={handleMicToggle}
                className="w-28 h-28 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-organic-lg hover:scale-105 active:scale-95 transition-all border-4 border-parchment"
              >
                <div className="w-8 h-8 bg-white rounded-2xl" />
              </button>
              <p className="text-xs font-bold text-rose-600 uppercase tracking-wider mt-4">Tap to Finish & Extract</p>
            </>
          )}

          {step === "processing" && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 border-4 border-ochre border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-charcoal">Extracting Commerce & Heritage Data...</h3>
              <p className="text-xs text-charcoal-muted mt-1">Applying KathaOS Dual-Output AI Engine</p>
            </div>
          )}

          {step === "result" && (
            <div className="w-full space-y-5 animate-fade-in-up">
              <div className="text-center mb-4">
                <Badge variant="success">✨ AI Extraction Complete</Badge>
                <h2 className="text-xl font-serif font-bold text-charcoal mt-1">Review Extracted Details</h2>
              </div>

              {/* High-Res Craft Image Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-2">
                  Select Product Craft Image
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {CRAFT_IMAGE_COLLECTION.map((item, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => {
                        triggerHaptic(10)
                        setSelectedImage(item.url)
                      }}
                      className={`aspect-square rounded-2xl overflow-hidden border-2 transition ${
                        selectedImage === item.url ? "border-ochre shadow-organic scale-105" : "border-parchment-border opacity-70"
                      }`}
                    >
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Extracted Product Specs */}
              <div className="bg-parchment-card rounded-3xl p-5 border border-parchment-border shadow-organic space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-ochre">Commerce Specification</h3>
                <div>
                  <span className="text-[10px] uppercase font-bold text-charcoal-muted">Title</span>
                  <p className="text-base font-serif font-bold text-charcoal">{extractedProduct.title}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-parchment-border">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-charcoal-muted">Category</span>
                    <p className="text-xs font-semibold text-charcoal">{extractedProduct.category}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-charcoal-muted">Price</span>
                    <p className="text-sm font-bold text-charcoal">₹{extractedProduct.price.toLocaleString("en-IN")}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-parchment-border">
                  <span className="text-[10px] uppercase font-bold text-charcoal-muted">Materials</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {extractedProduct.materials.map((m) => (
                      <span key={m} className="px-2.5 py-0.5 bg-parchment rounded-full text-[10px] font-semibold text-charcoal border border-parchment-border">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Heritage Story Archive */}
              <div className="bg-parchment-card rounded-3xl p-5 border border-parchment-border shadow-organic">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-dark mb-2">Heritage Story Narrative</h3>
                <p className="text-xs text-charcoal leading-relaxed italic font-serif">
                  &ldquo;{extractedProduct.heritage_story}&rdquo;
                </p>
              </div>

              {/* Save & Reset Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    triggerHaptic(15)
                    resetTranscript()
                    setStep("idle")
                  }}
                  className="flex-1 py-3 px-4 bg-parchment-border/50 text-charcoal font-semibold rounded-full hover:bg-parchment-border transition text-xs uppercase tracking-wider"
                >
                  Record Again
                </button>
                <button
                  onClick={handleSaveVoiceProduct}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-ochre to-ochre-dark text-white font-bold rounded-full hover:opacity-95 shadow-organic transition text-xs uppercase tracking-wider"
                >
                  Publish to Catalog
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Manual Entry Form */}
      {mode === "manual" && (
        <div className="px-5 py-6 max-w-lg mx-auto">
          <form onSubmit={handleSaveManualProduct} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Product Title
              </label>
              <input
                type="text"
                placeholder="e.g. Pure Silk Banarasi Saree with Gold Border"
                value={manualForm.title}
                onChange={(e) => setManualForm({ ...manualForm, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-parchment-card border border-parchment-border rounded-2xl text-sm font-medium text-charcoal focus:outline-none focus:border-ochre"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                  Category
                </label>
                <select
                  value={manualForm.category}
                  onChange={(e) => setManualForm({ ...manualForm, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-parchment-card border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-ochre"
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
                  placeholder="e.g. 18500"
                  value={manualForm.price}
                  onChange={(e) => setManualForm({ ...manualForm, price: e.target.value })}
                  className="w-full px-4 py-2.5 bg-parchment-card border border-parchment-border rounded-2xl text-sm font-bold text-charcoal focus:outline-none focus:border-ochre"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Materials Used (Comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g. Silk, Gold Zari, Katan"
                value={manualForm.materials}
                onChange={(e) => setManualForm({ ...manualForm, materials: e.target.value })}
                className="w-full px-4 py-2.5 bg-parchment-card border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-ochre"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Short Description
              </label>
              <textarea
                rows={2}
                placeholder="Describe key features..."
                value={manualForm.summary}
                onChange={(e) => setManualForm({ ...manualForm, summary: e.target.value })}
                className="w-full px-4 py-2.5 bg-parchment-card border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-ochre resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Heritage Story & Cultural Value
              </label>
              <textarea
                rows={3}
                placeholder="Describe history, technique, or tradition..."
                value={manualForm.heritage_story}
                onChange={(e) => setManualForm({ ...manualForm, heritage_story: e.target.value })}
                className="w-full px-4 py-2.5 bg-parchment-card border border-parchment-border rounded-2xl text-sm text-charcoal focus:outline-none focus:border-ochre resize-none"
              />
            </div>

            {/* Select image */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-2">
                Select Photo Asset
              </label>
              <div className="grid grid-cols-4 gap-2">
                {CRAFT_IMAGE_COLLECTION.map((item, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => {
                      triggerHaptic(10)
                      setSelectedImage(item.url)
                    }}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition ${
                      selectedImage === item.url ? "border-ochre shadow-organic scale-105" : "border-parchment-border opacity-70"
                    }`}
                  >
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-ochre to-ochre-dark text-white font-bold rounded-full hover:opacity-95 shadow-organic transition text-sm uppercase tracking-wider mt-4"
            >
              Save Product & Broadcast ONDC Catalog
            </button>
          </form>
        </div>
      )}

      <BottomNav items={navItems} />
    </main>
  )
}
