"use client"
import { useState, useEffect } from "react";
import { questions } from "@/components/QuestionList"; // Import the questions array from your index.js file

function AllQuestionsAndAnswers({ answers }) {
  return (
    <div>
      {Object.keys(answers).map((date) => (
        <div key={date} className="mb-4">
          <h2 className="text-xl font-bold mb-2">{date}</h2>
          {answers[date].map((answer, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-bold text-indigo-100">{questions[index].question}</h3>
              <div>{answer}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

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
      <h1 className="text-3xl font-bold mb-4">Alle Fragen und Antworten</h1>
      <AllQuestionsAndAnswers answers={answers} />
    </div>
  );
}
