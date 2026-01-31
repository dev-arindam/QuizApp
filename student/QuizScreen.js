import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { htmlQuestions } from "../data/htmlQuestions";
import { jsQuestions } from "../data/jsQuestions";
import { reactQuestions } from "../data/reactQuestions";
import { cppQuestions } from "../data/cppQuestions";
import { pythonQuestions } from "../data/pythonQuestions";

export default function QuizScreen({ onFinish, onQuit, category }) {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);

const questions = (() => {
  switch(category) {
    case "HTML": return htmlQuestions;
    case "JAVASCRIPT": return jsQuestions;
    case "REACT": return reactQuestions; // Add reactQuestions later
    case "C++": return cppQuestions;   // Add cppQuestions later
    case "PYTHON": return pythonQuestions; // Add pythonQuestions later
    default: return [];
  }
})();

// Show message if no questions
if (!questions || questions.length === 0) {
  return (
    <View style={styles.container}>
      <Text>No questions available for {category}</Text>
      <TouchableOpacity onPress={onQuit} style={{marginTop:20}}>
        <Text style={{color:"#0b3d91"}}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}


  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (selected === null) return;

    if (currentIndex + 1 < questions.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelected(answers[nextIndex] ?? null);
    } else {
      let finalScore = 0;
      questions.forEach((q, i) => {
        if (answers[i] === q.correctAnswer) {
          finalScore++;
        }
      });
      onFinish(finalScore);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelected(answers[prevIndex] ?? null);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={22} onPress={onQuit} />
        <View>
          <Text style={styles.headerTitle}>{category}</Text>
          <Text style={styles.headerSub}>
            {questions.length} Question
          </Text>
        </View>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.progress}>
              Question: {currentIndex + 1}/{questions.length}
            </Text>
            <Text style={styles.quit} onPress={onQuit}>Quit</Text>
          </View>

          <Text style={styles.question}>
            {currentQuestion.question}
          </Text>

          {currentQuestion.options.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selected === index && styles.optionActive
              ]}
              onPress={() => {
                setSelected(index);
                setAnswers(prev => ({
                  ...prev,
                  [currentIndex]: index
                }));
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  selected === index && styles.optionTextActive
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navBtns}>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={handlePrevious}
            disabled={currentIndex === 0}
          >
            <Text style={styles.navText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navBtn, styles.nextBtn]}
            onPress={handleNext}
          >
            <Text style={[styles.navText, { color: "#fff" }]}>
              {currentIndex + 1 === questions.length ? "Finish" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop:40,
    alignItems: "center"
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center"
  },

  headerSub: {
    fontSize: 11,
    color: "#777",
    textAlign: "center"
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },

  progress: {
    fontSize: 12,
    color: "#0b3d91"
  },

  quit: {
    fontSize: 12,
    color: "red"
  },

  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12
  },

  option: {
    backgroundColor: "#f2f2f2",
    padding: 14,
    borderRadius: 10,
    marginVertical: 6
  },

  optionActive: {
    backgroundColor: "#0b3d91"
  },

  optionText: {
    fontSize: 14
  },

  optionTextActive: {
    color: "#fff"
  },

  seeResult: {
    color: "#0b3d91",
    fontSize: 12,
    marginTop: 10
  },

  navBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },

  navBtn: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0b3d91"
  },

  nextBtn: {
    backgroundColor: "#0b3d91"
  },

  navText: {
    color: "#0b3d91",
    fontWeight: "bold"
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff"
  }
});

