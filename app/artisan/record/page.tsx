export default function ArtisanRecordPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-4">Tell Us About Your Craft</h1>
      <p className="text-gray-600 mb-12 text-center max-w-md">
        Press the microphone button and speak naturally about your product.
        No typing required.
      </p>
      {/* MicButton component will go here */}
      <div className="w-32 h-32 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:bg-red-600 transition">
        <span className="text-white text-4xl">MIC</span>
      </div>
      <p className="mt-8 text-sm text-gray-400">Tap to start recording</p>
    </main>
  )
}
