import { ActionCenter } from "@/components/ActionCenter"
import { PortfolioGrid } from "@/components/PortfolioGrid"
import { ImpactTracker } from "@/components/ImpactTracker"

export default function ArtisanDashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white px-5 pt-16 pb-12 safe-bottom">
      <div className="max-w-lg mx-auto space-y-10">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">
            Namaste
          </h1>
          <p className="text-lg text-zinc-400 mt-1">
            Your craft, your story
          </p>
        </header>

        <ActionCenter />

        <PortfolioGrid />

        <ImpactTracker />
      </div>
    </main>
  )
}
