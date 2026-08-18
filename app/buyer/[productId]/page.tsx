export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string }
}) {
  return (
    <main className="min-h-screen p-24">
      <h1 className="text-3xl font-bold mb-4">Product Detail</h1>
      <p className="text-gray-600 mb-8">Product ID: {params.productId}</p>
      {/* Product card + heritage story player will go here */}
      <div className="max-w-2xl">
        <div className="border rounded-lg p-8 mb-8">
          <p className="text-gray-400">Product card loads here</p>
        </div>
        <div className="border rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Cultural Story</h2>
          <p className="text-gray-400">
            &quot;Listen to Story&quot; text-to-speech player goes here
          </p>
        </div>
      </div>
    </main>
  )
}
