'use client'
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export const questions = [
  {
    question: "Wo bist du gerade?",
    answer: {
      type: "text"
    }
  },
  {
    question: "Wie geht es dir zurzeit?",
    answer: {
      type: "oneToTen"
    }
  },
  {
    question: "Hast du irgendetwas spannendes gesehen?",
    answer: {
      type: "text"
    }
  },
  {
    question: "Ist dir irgendwas lustiges passiert?",
    answer: {
      type: "text"
    }
  },
  {
    question: "Hast du einen neuen Menschen kennengelernt?",
    answer: {
      type: "text"
    }
  },
  {
    question: "Hast du etwas neues gelernt?",
    answer: {
      type: "text"
    }
  },
  {
    question: "Hast du etwas über dich selbst gelernt?",
    answer: {
      type: "text"
    }
  },
]

// DaySelector component
function DaySelector({ currentDate, setCurrentDate }) {
  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setUTCDate(newDate.getUTCDate() + days);
    setCurrentDate(newDate.toISOString().substring(0, 10));
    const newUrl = window.location.pathname;
    history.replaceState({}, "", newUrl);
  };

  return (
    <div className="grid grid-cols-[1fr_min-content_1fr] gap-4">
      <button 
        className="bg-indigo-500 hover:bg-indigo-700 disabled:opacity-70 disabled:bg-indigo-500 transition-colors text-white font-bold py-2 px-4 rounded"
        onClick={() => changeDate(-1)}
      >Zurück</button>
      <div className="whitespace-nowrap self-center">{currentDate}</div>
      <button 
        className="bg-indigo-500 hover:bg-indigo-700 disabled:opacity-70 disabled:bg-indigo-500 transition-colors text-white font-bold py-2 px-4 rounded"
        disabled={ currentDate === new Date().toISOString().substring(0, 10)}
        onClick={() =>  changeDate(+1)}
      >Vor</button>
    </div>
  );
}


// QuestionList component that shows one question after another at random
export default function QuestionList() {
  const searchParams = useSearchParams();
  const queries = {}
  queries.date = searchParams.get('date');
  queries.questionIndex = searchParams.get('questionIndex');

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().substring(0, 10));

  useEffect(() => {
    const storedAnswers = localStorage.getItem("answers");
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  useEffect(() => {
    setQuestionIndex(parseInt(queries.questionIndex) || 0);
    setCurrentDate(queries.date || new Date().toISOString().substring(0, 10));
  }, []);

  const handleInputChange = (index, value) => {
    const newAnswers = { ...answers };
    if (!newAnswers[currentDate]) {
      newAnswers[currentDate] = Array(questions.length).fill("");
    }
    newAnswers[currentDate][index] = value;
    setAnswers(newAnswers);
    localStorage.setItem("answers", JSON.stringify(newAnswers));
  };

  const _setQuestionIndex = (index) => {
    setQuestionIndex(index)
    const newUrl = window.location.pathname;
    history.replaceState({}, "", newUrl);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-3 -translate-y-[10%]">

      <DaySelector currentDate={currentDate} setCurrentDate={setCurrentDate} />

      <Question
        question={questions[questionIndex].question}
      />

      <Answer
        answer={questions[questionIndex].answer}
        key={questionIndex}
        inputValue={answers?.[currentDate]?.[questionIndex] || ""}
        onInputChange={(value) => handleInputChange(questionIndex, value)}
      />


      <div className="grid grid-cols-2 gap-4">
        <button
          className="whitespace-nowrap bg-indigo-500 hover:bg-indigo-700 disabled:opacity-70 disabled:bg-indigo-500 transition-colors text-white font-bold py-2 px-4 rounded"
          onClick={() => _setQuestionIndex(questionIndex - 1)}
          disabled={questionIndex === 0}
        >
          Vorherige Frage
        </button>
        <button
          className="whitespace-nowrap bg-indigo-500 hover:bg-indigo-700 disabled:opacity-70 disabled:bg-indigo-500 transition-colors text-white font-bold py-2 px-4 rounded"
          onClick={() => _setQuestionIndex(questionIndex + 1)}
          disabled={questionIndex === questions.length - 1}
        >
          Nächste Frage
        </button>
      </div>
    </div>
  )
}

// Component that renders a single question with an input field to answer it
function Question({ question }) {
  return (
    <div>
      <h2 className="text-2xl text-center">{question}</h2>
    </div>
  )
}

// Component that renders an input field to answer a question
function Answer({ answer, inputValue, onInputChange }) {
  const handleChange = (event) => {
    onInputChange(event.target.value);
  };

  if (answer.type === "text") {
    return (
      <input
        className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-[400px] mx-3 text-black"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
    );
  } else if (answer.type === "oneToTen") {
    const rangeValue = inputValue === "" ? 1 : inputValue;

    return (
      <div className="flex items-center">
        <input
          className="w-25 text-indigo-500 appearance-none h-1 rounded-md outline-none"
          type="range"
          min="1"
          max="10"
          value={rangeValue}
          onChange={handleChange}
          style={{
            background:
              inputValue === ""
                ? "linear-gradient(to right, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) 100%)"
                : "linear-gradient(to right, #4f46e5 0%, #4f46e5 " +
                  ((rangeValue - 1) * 100) / 9 +
                  "%, #ffffff " +
                  ((rangeValue - 1) * 100) / 9 +
                  "%, #ffffff 100%)",
          }}
        />
        <span className="w-8 ml-2">{inputValue === "" ? "N/A" : inputValue}</span>
      </div>
    );
  } else {
    return <div>Unbekannter Antworttyp</div>;
  }
}

