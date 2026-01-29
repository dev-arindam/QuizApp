import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
/* =======================
   Quiz Card Component
======================= */
const QuizCard = ({
  quizName,
  subject,
  department,
  semester,
  quizDate,
  startTime,
  endTime,
  totalMarks,
  passingMarks,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.quizName}>{quizName}</Text>
          <Text style={styles.subject}>{subject}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <InfoRow label="Department" value={department} />
        <InfoRow label="Semester" value={semester} />
        <InfoRow label="Date" value={quizDate} />
        <InfoRow label="Time" value={`${startTime} - ${endTime}`} />

        <View style={styles.marksRow}>
          <View style={styles.marksBox}>
            <Text style={styles.marksValue}>{totalMarks}</Text>
            <Text style={styles.marksLabel}>Total Marks</Text>
          </View>

          <View style={styles.marksBox}>
            <Text style={styles.marksValue}>{passingMarks}</Text>
            <Text style={styles.marksLabel}>Passing Marks</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

/* =======================
   App Component
======================= */
export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [quizzes, setQuizzes] = useState([
    {
      quizName: "Mid Term Quiz",
      subject: "Data Structures",
      department: "Computer Science",
      semester: "5",
      quizDate: "12 Oct 2026",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      totalMarks: "50",
      passingMarks: "20",
    },
    {
      quizName: "Final Quiz",
      subject: "Operating Systems",
      department: "Computer Science",
      semester: "5",
      quizDate: "25 Oct 2026",
      startTime: "2:00 PM",
      endTime: "4:00 PM",
      totalMarks: "100",
      passingMarks: "40",
    },
  ]);

  const [newQuiz, setNewQuiz] = useState({
    quizName: "",
    subject: "",
    department: "",
    semester: "",
    quizDate: "",
    startTime: "",
    endTime: "",
    totalMarks: "",
    passingMarks: "",
  });

  const handleAddQuiz = () => {
    setModalVisible(true);
  };

  const handleSaveQuiz = () => {
    if (!newQuiz.quizName || !newQuiz.subject) {
      Alert.alert("Error", "Please fill at least Quiz Name and Subject!");
      return;
    }

    setQuizzes([...quizzes, newQuiz]);
    setNewQuiz({
      quizName: "",
      subject: "",
      department: "",
      semester: "",
      quizDate: "",
      startTime: "",
      endTime: "",
      totalMarks: "",
      passingMarks: "",
    });
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddQuiz}>
          <Text style={styles.addButtonText}>+ Add Quiz</Text>
        </TouchableOpacity>

        {quizzes.map((quiz, index) => (
          <QuizCard key={index} {...quiz} />
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.crossButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.crossText}>×</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Add New Quiz</Text>

            <ScrollView>
              <TextInput
                style={styles.input}
                placeholder="Quiz Name"
                value={newQuiz.quizName}
                onChangeText={(text) => setNewQuiz({ ...newQuiz, quizName: text })}
              />

              {/* Dropdown for Subject */}
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={newQuiz.subject}
                  onValueChange={(itemValue) =>
                    setNewQuiz({ ...newQuiz, subject: itemValue })
                  }
                >
                  <Picker.Item label="Select Subject" value="" />
                  <Picker.Item label="Data Structures" value="Data Structures" />
                  <Picker.Item label="Operating Systems" value="Operating Systems" />
                  <Picker.Item label="Networking" value="Networking" />
                  <Picker.Item label="Database Systems" value="Database Systems" />
                </Picker>
              </View>

              {/* Dropdown for Department */}
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={newQuiz.department}
                  onValueChange={(itemValue) =>
                    setNewQuiz({ ...newQuiz, department: itemValue })
                  }
                >
                  <Picker.Item label="Select Department" value="" />
                  <Picker.Item label="Computer Science" value="Computer Science" />
                  <Picker.Item label="Mechanical" value="Mechanical" />
                  <Picker.Item label="Electrical" value="Electrical" />
                  <Picker.Item label="Civil" value="Civil" />
                </Picker>
              </View>

              {/* Dropdown for Semester */}
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={newQuiz.semester}
                  onValueChange={(itemValue) =>
                    setNewQuiz({ ...newQuiz, semester: itemValue })
                  }
                >
                  <Picker.Item label="Select Semester" value="" />
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                  <Picker.Item label="5" value="5" />
                  <Picker.Item label="6" value="6" />
                  <Picker.Item label="7" value="7" />
                  <Picker.Item label="8" value="8" />
                </Picker>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Quiz Date"
                value={newQuiz.quizDate}
                onChangeText={(text) => setNewQuiz({ ...newQuiz, quizDate: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Start Time"
                value={newQuiz.startTime}
                onChangeText={(text) => setNewQuiz({ ...newQuiz, startTime: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="End Time"
                value={newQuiz.endTime}
                onChangeText={(text) => setNewQuiz({ ...newQuiz, endTime: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Total Marks"
                keyboardType="numeric"
                value={newQuiz.totalMarks}
                onChangeText={(text) => setNewQuiz({ ...newQuiz, totalMarks: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Passing Marks"
                keyboardType="numeric"
                value={newQuiz.passingMarks}
                onChangeText={(text) => setNewQuiz({ ...newQuiz, passingMarks: text })}
              />
            </ScrollView>

            <TouchableOpacity
              style={[styles.modalButton, styles.saveButtonFull]}
              onPress={handleSaveQuiz}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* =======================
   Styles
======================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },

  addButton: {
    backgroundColor: "#0b3d91",
    margin: 16,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    overflow: "hidden",
  },

  header: {
    backgroundColor: "#0b3d91",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  quizName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  subject: {
    color: "#dcdde1",
    marginTop: 4,
    fontSize: 13,
  },

  body: {
    padding: 16,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  infoLabel: {
    color: "#7f8c8d",
    fontSize: 13,
  },

  infoValue: {
    color: "#2c3e50",
    fontWeight: "600",
    fontSize: 13,
  },

  marksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  marksBox: {
    width: "48%",
    backgroundColor: "#f1f2f6",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },

  marksValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0d0c2c",
  },

  marksLabel: {
    fontSize: 12,
    color: "#636e72",
    marginTop: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    maxHeight: "90%",
    position: "relative",
  },

  crossButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  crossText: {
    color: "#000",
    fontSize: 25,
    fontWeight: "bold",
    lineHeight: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#dcdde1",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#dcdde1",
    borderRadius: 10,
    marginBottom: 10,
  },

  modalButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  saveButtonFull: {
    backgroundColor: "#0b3d91",
    width: "100%",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});