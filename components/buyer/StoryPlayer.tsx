"use client"

interface StoryPlayerProps {
  story: string
  significance: string
}

export function StoryPlayer({ story, significance }: StoryPlayerProps) {
  const handlePlay = () => {
    const utterance = new SpeechSynthesisUtterance(`${story}. ${significance}`)
    utterance.lang = "en-IN"
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-3">Cultural Story</h3>
      <p className="text-gray-700 mb-4">{story}</p>
      <p className="text-gray-500 text-sm mb-6">{significance}</p>
      <button
        onClick={handlePlay}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Listen to Story
      </button>
    </div>
  )
}
