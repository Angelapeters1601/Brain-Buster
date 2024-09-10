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

const initialState = {
  // home, subjectSelection, difficultyAndQty, loading, error, ready, active, finished
  status: "home",
  selectedSubject: "",
  noOfQuestions: 0,
  difficultyLevel: "",
  category: 9,
  difficulty: "easy",
  amount: 10,
  error: "",
  questions: [],
  index: 0,
  answer: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "OpenSelector": {
      return { ...state, status: "subjectSelection" };
    }
    case "BackHome": {
      return { ...state, status: "home" };
    }
    case "LevelAndQty": {
      return {
        ...state,
        status: "difficultyAndQty",
        selectedSubject: action.payload,
      };
    }
    case "BackToSubjects": {
      return { ...state, status: "subjectSelection" };
    }
    case "SelectedDifficulty": {
      return { ...state, difficultyLevel: action.payload };
    }
    case "SelectedNoOfQuestion": {
      return { ...state, noOfQuestions: Number(action.payload) };
    }
    case "StartQuiz":
      return { ...state, status: "loading" };
    case "DataRecieved":
      return {
        ...state,
        status: "active",
        // amount: action.payload,
        // category: action.payload,
        // difficulty: action.payload,
        questions: action.payload,
      };
    case "DataFailed":
      return { ...state, status: "error", error: action.payload };
    case "NewAnswer":
      return { ...state, answer: action.paload };
    case "NextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("unknown action");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    status,
    selectedSubject,
    noOfQuestions,
    difficultyLevel,
    category,
    difficulty,
    amount,
    error,
    questions,
    index,
    answer,
  } = state;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        dispatch({ type: "DataRecieved", payload: data.results });
      } catch (error) {
        console.error(error, "error");
        dispatch({ type: "DataFailed", payload: error });
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
            <SubjectSelector dispatch={dispatch} />
          )}
        </MainBody>
        {status === "difficultyAndQty" && (
          <LevelSelector
            dispatch={dispatch}
            selectedSubject={selectedSubject}
            noOfQuestions={noOfQuestions}
            difficultyLevel={difficultyLevel}
          />
        )}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Question
              questions={questions[index]}
              answer={answer}
              dispatch={dispatch}
              index={index}
            />
            <QuizFooter>
              <Timer />
              <NextButton dispatch={dispatch} index={index} answer={answer} />
            </QuizFooter>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
