import { useState } from "react";

import StudentDashboard from "./student/StudentDashboard";
import QuizDashboard from "./student/QuizDashboard";
import QuizScreen from "./student/QuizScreen";
import ResultScreen from "./student/ResultScreen";
import StudentChat from "./student/StudentChat";

import StudentSubjectReview from "./student/StudentSubjectReview";

import AssignmentScreen from "./student/StudentAssignment";
import StudentProfile from "./student/StudentProfile";
import StudentAttendance from "./student/StudentAttendance";
import StudentFees from "./student/StudentFees";
import SubjectScreen from "./student/StudentSubject";
import NoticeBoard from "./student/StudentNoticeboard";
import SemesterResult from "./student/SemesterResult";

import LoginScreen from "./login/LoginScreen";
import AdminDashboardScreen from "./admin/AdminDashboardScreen";
import TeacherDashboard from "./teacher/TeacherDashboard";
import StudyMaterials from "./teacher/study/StudyMaterials";



export default function App() {
  const [user, setUser] = useState(null);

  const [screen, setScreen] = useState("home");
  const [category, setCategory] = useState("HTML");

  const [scores, setScores] = useState({
    HTML: 0,
    JAVASCRIPT: 0,
    REACT: 0,
    "C++": 0,
    PYTHON: 0,
  });

  /* ===== LOGIN + ROLE SWITCH ===== */

  if (!user) {
    return <LoginScreen onLoginSuccess={setUser} />;
  }

  if (user.role_id === 2) {
    return (
    <AdminDashboardScreen
      user={user}
      scores={scores}
      onLogout={() => setUser(null)}
    />
  );
  }

  if (user.role_id === 1) {
    return (
    <TeacherDashboard
  user={user}
  onLogout={() => setUser(null)}
  setScreen={setScreen}
/>
);
  }

  /* ===== STUDENT FLOW ===== */

  return (
    <>
      {/* HOME */}
      {screen === "home" && (
        <StudentDashboard
          user={user}
          scores={scores}
          setScreen={setScreen}

          onOpenProfile={() => setScreen("profile")}
          onOpenAttendance={() => setScreen("attendance")}
        />
      )}

      {/* PROFILE */}
      {screen === "profile" && (
        <StudentProfile
          user={user}
          onBack={() => setScreen("home")}
          onLogout={() => {
    setUser(null);      // or clear auth
    setScreen("home");
  }}
        />
      )}
      {/* ASSIGNMENT */}
      {screen === "assignment" && (
        <AssignmentScreen

          onBack={() => setScreen("home")}
        />
      )}

      {/* ATTENDANCE */}
      {screen === "attendance" && (
        <StudentAttendance onBack={() => setScreen("home")} />
      )}
      {/* NOTICE */}
      {screen === "notice" && (
        <NoticeBoard onBack={() => setScreen("home")} />
      )}

      {/* FEES */}
      {screen === "fees" && (
        <StudentFees onBack={() => setScreen("home")} />
      )}

      {/* Chat */}
      {screen === "chat" && (
        <StudentChat onBack={() => setScreen("home")} />
      )}
      {/* Semester Result */}
      {screen === "semesterResult" && (
        <SemesterResult onBack={() => setScreen("home")} />
      )}
      {/* Student Result */}

      {screen === "review" && (
        <StudentSubjectReview onBack={() => setScreen("home")} />
      )}

      {/* Subject */}
      {screen === "subject" && (
        <SubjectScreen onBack={() => setScreen("home")} />
      )}
      {/* ✅ QUIZ DASHBOARD (NEW STEP) */}
      {screen === "quizDashboard" && (
        <QuizDashboard
          user={user}
          scores={scores}
          setScreen={setScreen}
          setCategory={setCategory}
          onStartQuiz={(cat) => {
            setCategory(cat);
            setScreen("quiz");
          }}
          onBack={() => setScreen("home")}
        />
      )}

      {/* QUIZ */}
      {screen === "quiz" && (
        <QuizScreen
          key={category}
          category={category}
          onFinish={(finalScore) => {
            setScores((prev) => ({
              ...prev,
              [category]: finalScore,
            }));
            setScreen("result");
          }}
          onQuit={() => setScreen("quizDashboard")}
        />
      )}

      {/* RESULT */}
      {screen === "result" && (
        <ResultScreen
          score={scores[category]}
          category={category}
          onHome={() => setScreen("home")}
        />
      )}
      {/* RESULT */}
      {screen === "teacherStudyMaterials" && (
        <StudyMaterials
          setScreen={setScreen}
        />
      )}
    </>
  );
}