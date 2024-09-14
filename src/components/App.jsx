import React, { useReducer, useEffect } from "react";
import "../App.css";
import StartButton from "./StartButton";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import Loader from "./Loader";
import SubjectSelector from "./SubjectSelector";
import MainBody from "./MainBody";
import LevelSelector from "./LevelSelector";
import Question from "./Question";
import Error from "./Error";
import NextButton from "./NextButton";
import Timer from "./Timer";
import QuizFooter from "./QuizFooter";
import FinishedScreen from "./FinishedScreen";
import Progress from "./Progress";

const SECS_PER_QUESTION = 30;

const initialState = {
  // home, subjectSelection, difficultyAndQty, loading, error, ready, active, finished
  status: "home",
  category: 0,
  difficulty: "",
  amount: 0,
  questions: [],
  error: "",
  index: 0,
  answer: null,
  secondsRemaining: null,
  point: 0,
  maxPossiblePoint: null,
  categoryName: "",
  highscore: parseInt(localStorage.getItem("highscore"), 10) || 0,
};

const subjects = [
  { name: "General Knowledge", id: 9 },
  { name: "Computer", id: 18 },
  { name: "Mythology", id: 20 },
  { name: "Nature", id: 17 },
  { name: "Sports", id: 21 },
  { name: "History", id: 23 },
  { name: "Animals", id: 27 },
];

const assignPoints = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return 5;
    case "medium":
      return 10;
    case "hard":
      return 15;
    default:
      return 0;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "OpenSelector": {
      return { ...state, status: "subjectSelection" };
    }
    case "BackHome": {
      return {
        ...initialState,
        category: state.category,
        highscore: state.highscore,
      };
    }
    case "CategorySelected": {
      return {
        ...state,
        status: "categorySelect",
        category: action.payload.id,
        categoryName: action.payload.name,
      };
    }
    case "BackToSubjects": {
      return { ...state, status: "subjectSelection" };
    }
    case "SelectedDifficulty": {
      return { ...state, difficulty: action.payload };
    }
    case "SelectedNoOfQuestion": {
      return { ...state, amount: Number(action.payload) };
    }
    case "StartQuiz":
      return {
        ...state,
        status: "loading",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "DataRecieved":
      const maxPoints =
        assignPoints(action.payload[0]?.difficulty || "easy") *
        action.payload.length;

      return {
        ...state,
        status: "active",
        amount: action.payload.length,
        category: state.category,
        difficulty: state.difficulty,
        questions: action.payload,
        maxPossiblePoint: maxPoints,
        secondsRemaining: action.payload.length * SECS_PER_QUESTION,
      };
    case "DataFailed":
      return { ...state, status: "error", error: action.payload };
    case "NewAnswer":
      const question = state.questions.at(state.index);
      const pointsEarned = assignPoints(question.difficulty);
      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === question.correct_answer
            ? state.point + pointsEarned
            : state.point,
      };
    case "NextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "Finish":
      const newHighscore = Math.max(state.point, state.highscore);
      localStorage.setItem("highscore", newHighscore);
      return {
        ...state,
        status: "finished",
        highscore: newHighscore,
      };
    case "Restart":
      return {
        ...initialState,
        questions: state.questions,
        highscore: state.highscore,
        status: "subjectSelection",
        answer: null,
      };
    case "Tick":
      const isTimeUp = state.secondsRemaining === 1;

      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: isTimeUp ? "finished" : state.status,
        highscore: isTimeUp
          ? Math.max(state.point, state.highscore)
          : state.highscore,
      };
    default:
      throw new Error("unknown action");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    status,
    category,
    categoryName,
    difficulty,
    amount,
    questions,
    point,
    index,
    answer,
    secondsRemaining,
    maxPossiblePoint,
    highscore,
  } = state;

  const numQuestions = questions.length;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        console.log(data);
        dispatch({ type: "DataRecieved", payload: data.results });
      } catch (error) {
        console.error(error, "error");
        dispatch({ type: "DataFailed", payload: error.message });
      }
    };
    if (status === "loading") {
      fetchQuiz();
    }
  }, [status, amount, category, difficulty]);

  return (
    <>
      <div className="app">
        {status === "home" && (
          <>
            <Header />
            <Home />
            <StartButton dispatch={dispatch} />
          </>
        )}

        <MainBody>
          {status === "loading" && <Loader />}
          {status === "subjectSelection" && (
            <SubjectSelector dispatch={dispatch} subjects={subjects} />
          )}
        </MainBody>
        {status === "categorySelect" && (
          <LevelSelector
            dispatch={dispatch}
            categoryName={categoryName}
            amount={amount}
            difficulty={difficulty}
          />
        )}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              dispatch={dispatch}
              answer={answer}
              index={index}
              points={point}
              maxPossiblePoint={maxPossiblePoint}
              questions={questions}
            />
            <Question
              questions={questions[index]}
              answer={answer}
              dispatch={dispatch}
              index={index}
            />
            <QuizFooter>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                index={index}
                numQuestions={numQuestions}
                answer={answer}
              />
            </QuizFooter>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            dispatch={dispatch}
            points={point}
            maxPossiblePoint={maxPossiblePoint}
            highscore={highscore}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
