"use client"

import { useState } from "react"
import { useSpeechRecognition } from "@/lib/hooks/useSpeechRecognition"
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
    icon: (
      <div className="w-10 h-10 -mt-5 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
    ),
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

type RecordingStep = "idle" | "recording" | "processing" | "result"

export default function VendorAddPage() {
  const [step, setStep] = useState<RecordingStep>("idle")
  const { transcript, isListening, startListening, stopListening, resetTranscript } =
    useSpeechRecognition()

  const handleMicToggle = () => {
    if (isListening) {
      stopListening()
      setStep("processing")
      // Simulate AI processing
      setTimeout(() => setStep("result"), 2000)
    } else {
      resetTranscript()
      startListening()
      setStep("recording")
    }
  }

  const handleReset = () => {
    resetTranscript()
    setStep("idle")
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <a href="/vendor" className="p-2 -ml-2 rounded-lg hover:bg-gray-50">
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </a>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Add Product</h1>
            <p className="text-xs text-gray-500">Speak about your craft</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-12">
        {step === "idle" && (
          <>
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Tell us about your product</h2>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">
                Press the button and speak naturally. Mention the name, materials, price, and the story behind it.
              </p>
            </div>

            {/* Example prompts */}
            <div className="w-full max-w-sm mb-12">
              <p className="text-xs text-gray-400 text-center mb-3">Try saying something like:</p>
              <div className="space-y-2">
                {[
                  "This is a Banarasi silk saree I wove with gold zari. It takes about 20 days. I sell it for 12,500 rupees.",
                  "Handmade terracotta pot from Bengal. My grandfather taught me this art. Price is 800 rupees.",
                ].map((example, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 text-xs text-gray-500 italic">
                    &ldquo;{example}&rdquo;
                  </div>
                ))}
              </div>
            </div>

            {/* Mic Button */}
            <button
              onClick={handleMicToggle}
              className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center shadow-xl hover:bg-blue-700 active:scale-95 transition-all"
            >
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </button>
            <p className="text-sm text-gray-400 mt-4">Tap to start recording</p>
          </>
        )}

        {step === "recording" && (
          <>
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6 animate-pulse">
                <div className="w-4 h-4 rounded-full bg-red-500 animate-ping" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Listening...</h2>
              <p className="text-sm text-gray-500">Speak naturally about your product</p>
            </div>

            {/* Live transcript */}
            <div className="w-full max-w-sm bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-12 min-h-[120px]">
              {transcript ? (
                <p className="text-sm text-gray-700 leading-relaxed">{transcript}</p>
              ) : (
                <p className="text-sm text-gray-300 italic">Waiting for speech...</p>
              )}
            </div>

            {/* Stop Button */}
            <button
              onClick={handleMicToggle}
              className="w-28 h-28 rounded-full bg-red-500 flex items-center justify-center shadow-xl animate-pulse active:scale-95 transition-all"
            >
              <div className="w-8 h-8 bg-white rounded-lg" />
            </button>
            <p className="text-sm text-gray-400 mt-4">Tap to stop</p>
          </>
        )}

        {step === "processing" && (
          <>
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Processing your words...</h2>
              <p className="text-sm text-gray-500">KathaOS is extracting product details</p>
            </div>
          </>
        )}

        {step === "result" && (
          <>
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Product extracted!</h2>
              <p className="text-sm text-gray-500">Review the details below</p>
            </div>

            {/* Extracted Result Card */}
            <div className="w-full max-w-sm space-y-4 mb-8">
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Product Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Title</p>
                    <p className="text-sm font-semibold text-gray-900">Banarasi Silk Saree — Red & Gold</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="text-sm font-medium text-gray-900">Textile</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-sm font-bold text-gray-900">₹12,500</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Materials</p>
                    <div className="flex gap-1.5 mt-1">
                      {["Silk", "Gold Zari"].map((m) => (
                        <span key={m} className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Heritage Story</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  This saree is woven on a traditional handloom in Varanasi. The gold zari border features intricate motifs passed down through three generations. Each piece takes 15-30 days to complete.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-0.5 bg-violet-50 rounded-full text-xs text-violet-600">Varanasi</span>
                  <span className="px-2 py-0.5 bg-violet-50 rounded-full text-xs text-violet-600">3rd Generation</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full max-w-sm flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-200 transition"
              >
                Record Again
              </button>
              <button className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition">
                Save Product
              </button>
            </div>
          </>
        )}
      </div>

      <BottomNav items={navItems} />
    </main>
  )
}
