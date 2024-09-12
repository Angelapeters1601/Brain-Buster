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
  selectedSubject: "",
  noOfQuestions: 0,
  difficultyLevel: "",

  //   category: 9,
  //   difficulty: "easy",
  //   amount: 10,

  category: 9,
  difficulty: "easy",
  amount: 10,

  error: "",
  questions: [],
  index: 0,
  answer: null,
  secondsRemaining: null,
  point: 0,
  maxPossiblePoint: 50,
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
      return {
        ...state,
        status: "loading",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
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
      const question = state.questions.at(state.index);
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
      return { ...state, status: "finished" };
    case "Restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "subjectSelection",
        answer: null,
      };
    case "Tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
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
    questions,
    point,
    index,
    answer,
    secondsRemaining,
    maxPossiblePoint,
  } = state;

  const numQuestions = questions.length;

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
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
