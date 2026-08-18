export default function BuyerPage() {
  return (
    <main className="min-h-screen p-24">
      <h1 className="text-3xl font-bold mb-8">Artisan Products</h1>
      <p className="text-gray-600 mb-12">Discover handcrafted products with cultural stories.</p>
      {/* Product grid will go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <p className="text-gray-400">No products yet. Check back soon.</p>
      </div>
    </main>
  )
}
