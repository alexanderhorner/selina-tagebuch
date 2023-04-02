'use client'
import { useState, useEffect } from "react"

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
    question: "Hast du irgendetwas spannendes gesehen",
    answer: {
      type: "text"
    }
  },
  {
    question: "Ist dir irgendwas lustiges passiert",
    answer: {
      type: "text"
    }
  },
  {
    question: "Hast du einen neuen Menschen kennengelernt",
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
    question: "hast du etwas über dich selbst gelernt",
    answer: {
      type: "text"
    }
  },
  {
    question: "hast du etwas über dich selbst gelernt",
    answer: {
      type: "text"
    }
  },
]

// import firebase from "firebase/app";
// import "firebase/firestore";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://support.google.com/firebase/answer/7015592
// const firebaseConfig = {
//     FIREBASE_CONFIGURATION
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);


// // Initialize Cloud Firestore and get a reference to the service
// const db = firebase.firestore();


// DaySelector component
function DaySelector({ currentDate, setCurrentDate }) {
  const changeDate = (days) => {
    console.log(days);
    const newDate = new Date(currentDate);
    newDate.setUTCDate(newDate.getUTCDate() + days);
    setCurrentDate(newDate.toISOString().substring(0, 10));
  };

  return (
    <div className="flex gap-4 items-center">
      <button 
        className="bg-indigo-500 hover:bg-indigo-700 disabled:opacity-70 disabled:bg-indigo-500 transition-colors text-white font-bold py-2 px-4 rounded"
        onClick={() => changeDate(-1)}
      >Zurück</button>
      <div>{currentDate}</div>
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
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({});
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  });

  useEffect(() => {
    const storedAnswers = localStorage.getItem("answers");
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
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

  return (
    <div className="flex flex-col justify-center items-center gap-3">

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

      <div className="flex flex-wrap gap-4">
        <button
          className="bg-indigo-500 hover:bg-indigo-700 disabled:opacity-70 disabled:bg-indigo-500 transition-colors text-white font-bold py-2 px-4 rounded"
          onClick={() => setQuestionIndex(questionIndex - 1)}
          disabled={questionIndex === 0}
        >
          Vorherige Frage
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 disabled:opacity-70 disabled:bg-indigo-500 transition-colors text-white font-bold py-2 px-4 rounded"
          onClick={() => setQuestionIndex(questionIndex + 1)}
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
        className="border border-gray-300 rounded-md px-3 py-2 max-w-full w-[400px] text-black"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
    );
  } else if (answer.type === "oneToTen") {
    return (
      <input
        className="border border-gray-300 rounded-md px-3 py-2 w-25 text-black"
        type="number"
        min="1"
        max="10"
        value={inputValue}
        onChange={handleChange}
      />
    );
  } else {
    return <div>Unbekannter Antworttyp</div>;
  }
}
