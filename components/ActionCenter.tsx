"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Mic, MicOff, Loader2, CheckCircle2 } from "lucide-react"

type MicState = "idle" | "listening" | "processing" | "success"

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export function ActionCenter() {
  const [micState, setMicState] = useState<MicState>("idle")
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop()
    }
  }, [])

  const startListening = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Voice recording is not supported in this browser. Please try Chrome.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = false
    recognition.lang = "en-IN"
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setMicState("listening")
      setTranscript("")
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        }
      }
      if (finalTranscript) {
        setTranscript((prev) => (prev + " " + finalTranscript).trim())
      }
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error)
      setMicState("idle")
    }

    recognition.onend = () => {
      if (micState === "listening") {
        setMicState("processing")
        handleVoiceSubmit(transcript)
      }
    }

    recognitionRef.current = recognition
    recognition.start()
  }, [micState, transcript])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setMicState("processing")
  }, [])

  const handleVoiceSubmit = useCallback(async (text: string) => {
    // Mock API call — in production this hits /api/extract
    await new Promise((resolve) => setTimeout(resolve, 2200))
    console.log("[KathaOS] Transcript submitted:", text)
    setMicState("success")
    setTimeout(() => {
      setMicState("idle")
      setTranscript("")
    }, 2500)
  }, [])

  const handleMicTap = () => {
    if (micState === "listening") {
      stopListening()
    } else if (micState === "idle" || micState === "success") {
      startListening()
    }
  }

  return (
    <section className="animate-fade-in-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-balance">
          What did you make today?
        </h2>
        <p className="text-lg text-zinc-400 mt-2">
          Tap to tell the story
        </p>
      </div>

      {/* MIC BUTTON — Massive touch target */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleMicTap}
          disabled={micState === "processing"}
          aria-label={micState === "listening" ? "Stop recording" : "Start recording"}
          className={`
            relative w-44 h-44 rounded-full flex items-center justify-center
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-4 focus:ring-white/20
            active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              micState === "listening"
                ? "bg-red-600 shadow-[0_0_0_0_rgba(239,68,68,0.7)] animate-glow-pulse"
                : micState === "processing"
                ? "bg-zinc-800"
                : micState === "success"
                ? "bg-emerald-600"
                : "bg-white hover:bg-zinc-200"
            }
          `}
        >
          {micState === "idle" && (
            <Mic className="w-16 h-16 text-black" strokeWidth={2.5} />
          )}
          {micState === "listening" && (
            <MicOff className="w-16 h-16 text-white" strokeWidth={2.5} />
          )}
          {micState === "processing" && (
            <Loader2 className="w-12 h-12 text-zinc-400 animate-spin" strokeWidth={2} />
          )}
          {micState === "success" && (
            <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Status text */}
      <div className="text-center">
        {micState === "idle" && (
          <p className="text-sm text-zinc-500">
            Press once to start, once to stop
          </p>
        )}
        {micState === "listening" && (
          <div className="space-y-2">
            <p className="text-sm text-red-400 font-medium flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Recording — speak now
            </p>
            {transcript && (
              <p className="text-sm text-zinc-400 max-w-xs mx-auto px-4 italic">
                &ldquo;{transcript}&rdquo;
              </p>
            )}
          </div>
        )}
        {micState === "processing" && (
          <p className="text-sm text-zinc-400">
            Saving your story...
          </p>
        )}
        {micState === "success" && (
          <p className="text-sm text-emerald-400 font-medium flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Story saved!
          </p>
        )}
      </div>
    </section>
  )
}
