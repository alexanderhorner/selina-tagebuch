"use client";
import { useEffect, useState } from "react";
import { questions } from "@/components/QuestionList";

export default function SharePage() {
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const storedAnswers = localStorage.getItem("answers");
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  const formatAnswers = () => {
    const sortedDates = Object.keys(answers).sort(
      (a, b) => new Date(b) - new Date(a)
    );

    let formattedText = "";

    sortedDates.forEach((date) => {
      formattedText += `${date}\n`;
      answers[date].forEach((answer, index) => {
        if (answer.trim() === "") {
          return;
        }
        formattedText += `${questions[index]?.question || "[Gelöschte Frage]"}: `;
        formattedText +=
          questions[index]?.answer.type === "oneToTen"
            ? `${answer} von 10\n`
            : `${answer}\n`;
      });
      formattedText += "\n";
    });

    return formattedText;
  };

  const shareAnswers = async () => {
    const text = formatAnswers();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Selinas Tagebuch",
          text: text,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.error("Web Share API is not supported in this browser.");
    }
  };

  const downloadAnswers = () => {
    const text = formatAnswers();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Selinas-Tagebuch.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl mb-4">Teile deine Antworten</h1>
      <button
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={shareAnswers}
      >
        Teilen
      </button>
      <button
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        onClick={downloadAnswers}
      >
        Herunterladen
      </button>
    </div>
  );
}
