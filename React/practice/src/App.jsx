import { use, useEffect, useState } from "react";
// import Child1 from "./components/Child1";
const App = () => {

  const quizQuestions = [
    {
      id: 1,
      question: "What is JavaScript?",
      options: ["Programming Language", "Database", "Browser", "Framework"],
      correctAnswer: "Programming Language",
    },
    {
      id: 2,
      question: "Which keyword is used to declare a variable in JS?",
      options: ["var", "let", "const", "All of these"],
      correctAnswer: "All of these",
    },
    {
      id: 3,
      question: "Which company developed React?",
      options: ["Google", "Microsoft", "Facebook", "Amazon"],
      correctAnswer: "Facebook",
    },
    {
      id: 4,
      question: "What is JSX?",
      options: ["JavaScript XML", "HTML", "CSS", "React Hook"],
      correctAnswer: "JavaScript XML",
    },
    {
      id: 5,
      question: "Which hook is used to manage state in functional components?",
      options: ["useEffect", "useState", "useContext", "useRef"],
      correctAnswer: "useState",
    },
    {
      id: 6,
      question: "What does useEffect do?",
      options: [
        "Handles side effects",
        "Manages state",
        "Creates components",
        "Handles routing",
      ],
      correctAnswer: "Handles side effects",
    },
    {
      id: 7,
      question: "Which method is used to render lists in React?",
      options: ["forEach", "map", "filter", "reduce"],
      correctAnswer: "map",
    },
    {
      id: 8,
      question: "What is the virtual DOM?",
      options: ["Copy of real DOM", "Browser API", "Database", "CSS Model"],
      correctAnswer: "Copy of real DOM",
    },
    {
      id: 9,
      question: "Which statement about props is correct?",
      options: [
        "Props are immutable",
        "Props can be changed",
        "Props store state",
        "Props are hooks",
      ],
      correctAnswer: "Props are immutable",
    },
    {
      id: 10,
      question: "Which hook runs after component renders?",
      options: ["useState", "useEffect", "useMemo", "useCallback"],
      correctAnswer: "useEffect",
    },
  ];


  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [curruntIndex, SetCurruntIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [disable, SetDisable] = useState(true);
const[start, setStart] = useState(false);
const [time, setTime] = useState(60); 


  const handleNext = () => {
   if (selectedOption === quizQuestions[curruntIndex].correctAnswer) {
     setScore((prev)=> prev + 1);
     
     
    } 
    // setSelectedOption("")
    SetDisable(true)
    
    if (curruntIndex + 1 < quizQuestions.length) {
      SetCurruntIndex(curruntIndex + 1);
    }
  }
    console.log("score==>", score);


  const handlePrevious = () => {
    if (curruntIndex > 0) {
      SetCurruntIndex(curruntIndex - 1)
    }
  }

  const handleStart = () => {
    setStart(true);
    setTime(60);
  };

  useEffect(() => {
    if (!start) return;

    if (time === 0) {
      setShowResult(true);
      return;
    }

    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time, start]);

  return (
    <>
      <h6>QUIZ APP</h6>

      {!showResult && <h4>Time: {time}s</h4>}

      {showResult ? (
        <h2>Your Score: {score}</h2>
      ) : (
        <div>
          <h3>{quizQuestions[curruntIndex].question}</h3>

          {quizQuestions[curruntIndex].options.map((option, index) => (
            <label
              key={index}
              style={{
                display: "block",
                margin: "8px 0",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name={`question-${curruntIndex}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => {
                  (setSelectedOption(option), SetDisable(false));
                }}
                style={{ marginRight: "8px" }}
              />
              {option}
            </label>
          ))}
          <div>
            <button onClick={handlePrevious} disabled={curruntIndex == 0}>
              Previous
            </button>

           {!start ? (
  <button onClick={handleStart}>Start Quiz</button>
) : (
              <button onClick={handleNext} disabled={disable}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;


