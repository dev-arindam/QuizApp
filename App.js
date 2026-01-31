import { useState } from "react";
import HomeScreen from "./student/HomeScreen";
import QuizScreen from "./student/QuizScreen";
import ResultScreen from "./student/ResultScreen";
import LoginScreen from "./login/LoginScreen";
import AdminDashboardScreen from "./admin/AdminDashboardScreen";
import TeacherDashboard from "./teacher/TeacherDashboard";
import StudentProfile from "./student/StudentProfile";
import StudentAttendance from "./student/StudentAttendance";




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
    return <AdminDashboardScreen user={user} scores={scores} />;
  }
  if (user.role_id === 1) {
    return <TeacherDashboard user={user}/>;
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
          onOpenProfile={() => setScreen("profile")}
          onOpenAttendance={() => setScreen("attendance")}
        />
      )}

      {screen === "attendance" && (
  <StudentAttendance onBack={() => setScreen("home")}/>
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

      {screen === "profile" && (
  <StudentProfile
    user={user}
          onBack={() => setScreen("home")}
    
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
