"use client"
import { useState, useEffect } from "react"
import { questions } from "@/components/QuestionList"
import Link from 'next/link'


function AllQuestionsAndAnswers({ answers }) {
  const sortedDates = Object.keys(answers).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div>
      {sortedDates.map((date) => (
        <div key={date} className="mb-11">
          <h2 className="font-bold text-2xl text-indigo-300 mb-2">{date}</h2>
          {answers[date].map((answer, index) => {
            if (answer.trim() === "") {
              return null;
            }
            return (
              <div key={index} className="mb-3 p-4 rounded-lg bg-slate-900">
                <h3 className="font-bold text-lg text-indigo-100 mb-1">{questions[index].question}</h3>
                <div className="text-indigo-200">
                  {questions[index].answer.type === "oneToTen"
                    ? `${answer} von 10`
                    : answer}
                </div>
                <Link href={{ pathname: "/", query: { date, questionIndex: index } }}>
                  <button className="mt-2 text-indigo-300 hover:text-indigo-500 transition-colors">Bearbeiten</button>
                </Link>
              </div>
            );
          })}
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
      <h1 className="text-4xl font-bold mb-11">Alle Fragen und Antworten:</h1>
      <AllQuestionsAndAnswers answers={answers} />
    </div>
  );
}
