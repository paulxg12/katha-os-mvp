import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-parchment text-charcoal">
      <div className="max-w-md w-full bg-parchment-card rounded-3xl p-8 border border-parchment-border shadow-organic text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ochre to-ochre-dark text-white flex items-center justify-center mx-auto shadow-organic border-4 border-parchment font-serif text-3xl font-bold">
          K
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-ochre">Digital Heritage Engine</span>
          <h1 className="text-3xl font-serif font-bold text-charcoal mt-1">KathaOS</h1>
          <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
            Bridging oral artisan heritage with open digital commerce infrastructure (ONDC ready).
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/vendor"
            className="w-full py-3.5 px-6 bg-gradient-to-r from-ochre to-ochre-dark text-white font-bold rounded-full hover:opacity-95 shadow-organic transition text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            🏛 Master Artisan Vendor Hub
          </Link>

          <Link
            href="/vendor/profile"
            className="w-full py-3 px-6 bg-white border border-parchment-border text-ochre font-bold rounded-full hover:bg-parchment-border/40 transition text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            📜 View Vendor Profile
          </Link>

          <Link
            href="/buyer"
            className="w-full py-3 px-6 bg-indigo-fixed/50 text-indigo-dark font-bold rounded-full hover:bg-indigo-fixed transition text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            🛍 Browse Buyer Marketplace
          </Link>
        </div>
      </div>
    </main>
  )
}
