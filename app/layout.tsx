import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "KathaOS — Inclusive Cultural Commerce Engine",
  description: "Voice-first cultural commerce engine bridging oral heritage and digital commerce for artisans.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-parchment text-charcoal font-sans antialiased selection:bg-ochre-light selection:text-ochre-dark">
        {children}
      </body>
    </html>
  )
}
