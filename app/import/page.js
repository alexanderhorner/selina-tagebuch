"use client"
import AllQuestionsAndAnswers from 'components/AllQuestionsAndAnswers';
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ImportPage() {
  const router = useRouter()
  const [jsonString, setJsonString] = useState('')

  const [answers, setAnswers] = useState({});

  const handleJsonStringChange = (e) => {
    setJsonString(e.target.value)
    setAnswers({})
  };

  const showVorschau = () => {
    try {
      const importedData = JSON.parse(jsonString)
      setAnswers(importedData)
    } catch (error) {
      console.error('Error importing data:', error)
    }
  }

  const importAnswers = () => {
    if (!confirm('Bist du dir sicher, dass du die Daten importieren willst? Alle aktuellen Antworten werden überschrieben.')) {
      return
    }
    try {
      const importedData = JSON.parse(jsonString)
      localStorage.setItem('answers', JSON.stringify(importedData))
      router.push('/antworten')
    } catch (error) {
      console.error('Error importing data:', error)
      alert('Error importing data. Please make sure the input contains valid JSON.')
    }
  };

  return (
    <div className="container mx-auto px-4 py-5 max-h-full overflow-auto">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-4">Antworten importieren</h1>
        <textarea
          rows="10"
          cols="50"
          onChange={handleJsonStringChange}
          className="mb-4 p-2 w-full max-w-lg border border-gray-300 rounded-lg text-neutral-900 resize-y min-h-[200px]"
          placeholder="Antworten im JSON Format hier einfügen..."
        ></textarea>
        <button
          className="bg-indigo-500 active:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          onClick={importAnswers}
        >
          Importieren
        </button>
        <h2 className="mb-2 mt-5 text-2xl">Vorschau</h2>
        <button
          className="bg-indigo-500 active:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          onClick={showVorschau}
        >
          Anzeigen
        </button>
        <AllQuestionsAndAnswers answers={answers} />
      </div>
    </div>
  );
}
