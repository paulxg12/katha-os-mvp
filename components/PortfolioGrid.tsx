"use client"

import { useState, useCallback } from "react"
import { Volume2, VolumeX } from "lucide-react"

interface Product {
  id: string
  title: string
  imageUrl: string
  price: string
  englishSummary: string
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Kanjeevaram Saree",
    imageUrl: "https://placehold.co/600x800/1a1a1a/f59e0b?text=Silk+Saree",
    price: "₹15,000",
    englishSummary:
      "A pure silk Kanjeevaram saree handwoven by Lakshmi in Kanchipuram. The gold zari border features a mango motif, a symbol of prosperity. Takes 18 days on the loom.",
  },
  {
    id: "2",
    title: "Terracotta Horse",
    imageUrl: "https://placehold.co/600x600/1a1a1a/ef4444?text=Terracotta",
    price: "₹2,400",
    englishSummary:
      "A terracotta horse sculpted by Ramesh in Bankura, West Bengal. This is a traditional Bankura horse, used in village festivals. Each piece is kiln-fired for durability.",
  },
  {
    id: "3",
    title: "Madhubani Painting",
    imageUrl: "https://placehold.co/600x700/1a1a1a/8b5cf6?text=Madhubani",
    price: "₹8,500",
    englishSummary:
      "A Madhubani painting by Sita in Bihar, depicting the Tree of Life. Made with natural pigments on handmade paper. This art form is over 2500 years old.",
  },
]

export function PortfolioGrid() {
  const [playingId, setPlayingId] = useState<string | null>(null)

  const handleListen = useCallback((product: Product) => {
    // Stop any current speech
    window.speechSynthesis.cancel()

    if (playingId === product.id) {
      setPlayingId(null)
      return
    }

    const text = `${product.title}. ${product.price}. ${product.englishSummary}`
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-IN"
    utterance.rate = 0.85
    utterance.pitch = 1

    utterance.onend = () => setPlayingId(null)
    utterance.onerror = () => setPlayingId(null)

    setPlayingId(product.id)
    window.speechSynthesis.speak(utterance)
  }, [playingId])

  return (
    <section>
      <h2 className="text-xl font-bold mb-5">Your Products</h2>

      <div className="grid grid-cols-2 gap-4">
        {MOCK_PRODUCTS.map((product) => {
          const isPlaying = playingId === product.id

          return (
            <article
              key={product.id}
              className={`
                rounded-2xl overflow-hidden border transition-all duration-300
                ${
                  isPlaying
                    ? "border-amber-500/60 shadow-[0_0_24px_rgba(245,158,11,0.15)]"
                    : "border-zinc-800"
                }
              `}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] bg-zinc-900">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-amber-500/10 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center animate-pulse">
                      <Volume2 className="w-6 h-6 text-amber-400" />
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3 bg-zinc-950">
                <h3 className="text-base font-bold text-white leading-tight">
                  {product.title}
                </h3>
                <p className="text-lg font-bold text-amber-400 mt-1">
                  {product.price}
                </p>

                {/* Listen button — huge touch target */}
                <button
                  onClick={() => handleListen(product)}
                  aria-label={isPlaying ? `Stop reading ${product.title}` : `Listen to ${product.title}`}
                  className={`
                    mt-3 w-full flex items-center justify-center gap-2
                    py-3.5 rounded-xl text-base font-semibold
                    transition-all duration-200 active:scale-95
                    ${
                      isPlaying
                        ? "bg-amber-500 text-black"
                        : "bg-zinc-800 text-white hover:bg-zinc-700"
                    }
                  `}
                >
                  {isPlaying ? (
                    <>
                      <VolumeX className="w-5 h-5" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5" />
                      Listen
                    </>
                  )}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
