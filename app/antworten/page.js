"use client"
import { useState, useEffect } from "react"
import AllQuestionsAndAnswers from "@/components/AllQuestionsAndAnswers"

export default function AntwortenPage() {
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const storedAnswers = localStorage.getItem("answers");
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-5 max-h-full overflow-auto">
      <h1 className="text-4xl font-bold mb-11">Alle Fragen und Antworten:</h1>
      <AllQuestionsAndAnswers answers={answers} />
    </div>
  );
}
