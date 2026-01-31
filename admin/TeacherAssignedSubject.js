import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView
} from "react-native";

export default function TeacherSubject() {

  // ============================
  // OLD STATE (KEEPING)
  // ============================
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // ============================
  // NEW STATE (FORM FEATURE)
  // ============================
  const [modalVisible, setModalVisible] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  // ============================
  // API CONFIG
  // ============================
  const API_KEY = "sreya876";
  const API_HEADER = "x-api-key";

  const LIST_API =
    "https://api-admin-panel.sreya.online/admin-panel/dist/api/subject-teacher/insert-api.php";

  const TEACHER_API =
    "https://api-admin-panel.sreya.online/admin-panel/dist/api/teacher/fetch-api.php";

  const SUBJECT_API =
    "https://api-admin-panel.sreya.online/admin-panel/dist/api/subject/get_subjects.php";

  const INSERT_API =
    "https://api-admin-panel.sreya.online/admin-panel/dist/api/subject-teacher/insert-api.php";

  // ============================
  // OLD FETCH DATA (MODIFIED ONLY TO ADD HEADER)
  // ============================
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(LIST_API, {
        headers: { [API_HEADER]: API_KEY }
      });

      const json = await response.json();
      console.log("API Response:", json);

      const finalData = Array.isArray(json) ? json : json.data || [];
      setData(finalData);

    } catch (error) {
      console.error("Fetch Error:", error);
      Alert.alert("Error", "Failed to fetch data");
    }
    setLoading(false);
  };

  // ============================
  // NEW FETCH TEACHERS DROPDOWN
  // ============================
  const fetchTeachers = async () => {
    try {
      const res = await fetch(TEACHER_API, {
        headers: { [API_HEADER]: API_KEY }
      });

      const json = await res.json();
      setTeachers(json.data || []);

    } catch {
      Alert.alert("Error", "Failed to load teachers");
    }
  };

  // ============================
  // NEW FETCH SUBJECT CHECKBOXES
  // ============================
  const fetchSubjects = async () => {
    try {
      const res = await fetch(SUBJECT_API, {
        headers: { [API_HEADER]: API_KEY }
      });

      const json = await res.json();
      setSubjects(json.data || []);

    } catch {
      Alert.alert("Error", "Failed to load subjects");
    }
  };

  // ============================
  // NEW SUBJECT TOGGLE LOGIC
  // ============================
  const toggleSubject = (id) => {
    if (selectedSubjects.includes(id)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== id));
    } else {
      setSelectedSubjects([...selectedSubjects, id]);
    }
  };

  // ============================
  // NEW INSERT API FUNCTION
  // ============================
  const handleSubmit = async () => {
    if (!selectedTeacher || selectedSubjects.length === 0) {
      Alert.alert("Validation Error", "Select teacher and subjects");
      return;
    }

    try {
      const res = await fetch(INSERT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [API_HEADER]: API_KEY
        },
        body: JSON.stringify({
          teacher_id: selectedTeacher,
          subject_ids: selectedSubjects
        })
      });

      const result = await res.json();
        //  alert(JSON.stringify(result, null, 2));
      if (result.status === 'success') {
        // Alert.alert("Success", "Assigned Successfully");

        // Reset form
        setSelectedTeacher(null);
        setSelectedSubjects([]);
        setModalVisible(false);

        // Reload OLD table list
        fetchData();
      } else {
        Alert.alert("Error", result.message || "Insert Failed");
      }

    } catch {
      Alert.alert("Error", "Insert API Failed");
    }
  };

  // ============================
  // LOAD OLD + NEW DATA
  // ============================
  useEffect(() => {
    fetchData();      // OLD
    fetchTeachers();  // NEW
    fetchSubjects();  // NEW
  }, []);

  return (
    <View style={styles.container}>

      {/* ============================
          OLD TOP BAR UI (KEPT)
      ============================ */}
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Teacher Assign Subject</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add More</Text>
        </TouchableOpacity>
      </View>

      {/* ============================
          OLD LOADING + LIST VIEW
      ============================ */}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : data.length === 0 ? (
        <Text style={styles.emptyText}>No records found</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.label}>
                Teacher:{" "}
                <Text style={styles.value}>
                  {item.teacher_name || "N/A"}
                </Text>
              </Text>

              <Text style={styles.label}>
                Subject:{" "}
                <Text style={styles.value}>
                  {item.subject_name || "N/A"}
                </Text>
              </Text>
            </View>
          )}
        />
      )}

      {/* ============================
          NEW ADD FORM MODAL
      ============================ */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContainer}>

          <Text style={styles.modalTitle}>Assign Subject</Text>

          {/* TEACHER DROPDOWN */}
          <Text style={styles.label}>Select Teacher</Text>
         <View style={styles.dropdownWrapper}>
  <Picker
    selectedValue={selectedTeacher}
    onValueChange={(value) => setSelectedTeacher(value)}
  >
    <Picker.Item label="-- Select Teacher --" value={null} />

    {teachers.map((teacher) => (
      <Picker.Item
        key={teacher.id}
        label={teacher.name}
        value={teacher.id}
      />
    ))}
  </Picker>
</View>


          {/* SUBJECT CHECKBOX */}
          <Text style={styles.label}>Select Subjects</Text>
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject.id}
              style={styles.checkboxItem}
              onPress={() => toggleSubject(subject.id)}
            >
              <Text style={styles.check}>
                {selectedSubjects.includes(subject.id) ? "☑" : "☐"}{" "}
                {subject.subject_name}
              </Text>
            </TouchableOpacity>
          ))}

          {/* SUBMIT */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

          {/* CLOSE */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>

        </ScrollView>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 16 },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },

  pageTitle: { fontSize: 18, fontWeight: "bold" },

  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6
  },

  addButtonText: { color: "#fff", fontWeight: "bold" },

  list: { paddingBottom: 20 },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2
  },

  label:{ fontWeight: "bold", marginBottom: 6,
    textTransform:'capitalize',
    fontSize:14,
   },

  value: { fontWeight: "normal", color: "#444" },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#777"
  },

  modalContainer: { padding: 20, backgroundColor: "#fff" },

  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },

  optionItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginTop: 6
  },

  selectedItem: { backgroundColor: "#d9ebff" },

  checkboxItem: {
    padding: 10,
  },
  check:{
    fontSize:14,
    textTransform:'capitalize',
  },

  dropdownWrapper:{
  borderWidth: 1,
  borderColor: "#eee",  // border color
  borderRadius: 8,
  marginTop: 6,
  backgroundColor: "#fff",

  },
  submitBtn: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 6,
    marginTop: 20
  },

  submitText: { color: "#fff", textAlign: "center", fontWeight: "bold" },

  closeBtn: {
    marginTop: 12,
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#ccc"
  },

  closeText: { textAlign: "center" }
});