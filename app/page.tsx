export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">KathaOS</h1>
      <p className="text-xl text-gray-600 mb-12">Voice-First Cultural Commerce Engine</p>
      <div className="flex gap-8">
        <a
          href="/artisan/record"
          className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          I am an Artisan
        </a>
        <a
          href="/buyer"
          className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Browse Products
        </a>
      </div>
    </main>
  )
}
