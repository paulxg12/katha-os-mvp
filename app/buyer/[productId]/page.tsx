export function generateStaticParams() {
  return [
    { productId: "p1" },
    { productId: "p2" },
    { productId: "p3" },
    { productId: "p4" },
  ]
}

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string }
}) {
  return (
    <main className="min-h-screen p-6 bg-parchment text-charcoal flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-parchment-card rounded-3xl p-6 border border-parchment-border shadow-organic">
        <h1 className="text-2xl font-serif font-bold text-charcoal mb-2">Product Detail</h1>
        <p className="text-xs text-charcoal-muted mb-6">Product ID: {params.productId}</p>
        
        <div className="bg-parchment p-4 rounded-2xl border border-parchment-border mb-4">
          <p className="text-xs font-semibold text-ochre">ONDC Catalog Item</p>
          <p className="text-sm font-bold text-charcoal mt-1">Banarasi Silk Craft</p>
        </div>

        <a
          href="/vendor/products"
          className="inline-block py-2.5 px-5 bg-gradient-to-r from-ochre to-ochre-dark text-white font-bold rounded-full text-xs uppercase tracking-wider"
        >
          ← Back to Vendor Catalog
        </a>
      </div>
    </main>
  )
}
