import { useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import QuizScreen from "./screens/QuizScreen";
import ResultScreen from "./screens/ResultScreen";
import LoginScreen from "./screens/LoginScreen";
import AdminScreen from "./screens/AdminScreen";

export default function App() {
const [user, setUser] = useState(null);

  const [screen, setScreen] = useState("home");
  const [category, setCategory] = useState("HTML");
  const [scores, setScores] = useState({
    HTML: 0,
    JAVASCRIPT: 0,
    REACT: 0,
    "C++": 0,
    PYTHON: 0
  });

  if (!user) {
    return <LoginScreen onLoginSuccess={setUser} />;
  }
  if (user.role_id === 2) {
    return <AdminScreen user={user} />;
  }
  return (

    <>
      {screen === "home" && (
        <HomeScreen
         user={user}
          scores={scores}
          onStartQuiz={() => {
            setCategory("HTML");
            setScreen("quiz");
          }}
          onSelectCategory={(cat) => {
            setCategory(cat);
            setScreen("quiz");
          }}
        />
      )}
      
      {screen === "quiz" && (
        <QuizScreen
        key={category}
          category={category}
          onFinish={(finalScore) => {
            setScores(prev => ({
              ...prev,
              [category]: finalScore
            }));
            setScreen("result");
          }}
          onQuit={() => setScreen("home")}
        />
      )}

      {screen === "result" && (
        <ResultScreen
          score={scores[category]}
          category={category}
          onHome={() => setScreen("home")}
        />
      )}
    </>
  );
}
