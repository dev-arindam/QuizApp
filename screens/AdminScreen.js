import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
   Modal,   
  TextInput,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function AdminScreen({ user, scores }) {
  const screenWidth = Dimensions.get("window").width;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

  /* ---------------- SIDEBAR ANIMATION ---------------- */
  const openSidebar = () => {
    setIsSidebarOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsSidebarOpen(false));
  };

  /* ---------------- SIDEBAR MENU ---------------- */
  const sidebarItems = [
    { label: "Dashboard", icon: "home-outline" },
    { label: "Users", icon: "people-outline" },
    { label: "Department", icon: "business-outline" },
    { label: "Quiz Creation", icon: "create-outline" },
    { label: "Student", icon: "school-outline" },
    { label: "Logout", icon: "log-out-outline" },
  ];

  /* ---------------- DASHBOARD SECTION ---------------- */
  const DashboardSection = () => (
    <>
      <Text style={styles.sectionTitle}>Admin Dashboard</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>120</Text>
          <Text style={styles.statLabel}>Students</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>10</Text>
          <Text style={styles.statLabel}>Quizzes</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>78%</Text>
          <Text style={styles.statLabel}>Avg Score</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
        Recent Performance
      </Text>

      {Object.keys(scores || {}).map((key, index) => (
        <View key={index} style={styles.activityCard}>
          <Text style={{ fontWeight: "bold" }}>{key}</Text>
          <Text>{scores[key]} / 30</Text>
        </View>
      ))}
    </>
  );

  /* ---------------- Student SECTION ---------------- */
 const StudentSection = () => {
  const [students, setStudents] = useState([
    { id: "1", name: "John Doe", email: "john@mail.com" },
    { id: "2", name: "Jane Smith", email: "jane@mail.com" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", email: "" });
  const [menuOpenId, setMenuOpenId] = useState(null);

  const addStudent = () => {
    if (!newStudent.name || !newStudent.email) return;
    setStudents([
      ...students,
      { id: Date.now().toString(), ...newStudent },
    ]);
    setNewStudent({ name: "", email: "" });
    setModalVisible(false);
  };

  const updateStudent = () => {};
  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <ScrollView style={{ backgroundColor: "#f2f5fa", flex: 1 }}>
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 20,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#0b3d91" }}>
          Students
        </Text>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#0b3d91",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={{ color: "#fff", marginLeft: 6, fontWeight: "bold" }}>
            Add
          </Text>
        </TouchableOpacity>
      </View>

      {/* STUDENT LIST */}
      {students.map((student) => (
        <View
          key={student.id}
          style={{
            backgroundColor: "#fff",
            marginHorizontal: 20,
            marginBottom: 14,
            padding: 16,
            borderRadius: 18,
            elevation: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeftWidth: 4,
            borderLeftColor: "#0b3d91",
          }}
        >
          {/* LEFT */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: "#e9f3ff",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Ionicons name="person" size={22} color="#0b3d91" />
            </View>

            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {student.name}
              </Text>
              <Text style={{ fontSize: 12, color: "#777", marginTop: 3 }}>
                {student.email}
              </Text>
            </View>
          </View>

          {/* ACTION MENU */}
          <View>
            <TouchableOpacity
              onPress={() =>
                setMenuOpenId(
                  menuOpenId === student.id ? null : student.id
                )
              }
            >
              <Ionicons
                name="ellipsis-vertical"
                size={22}
                color="#444"
              />
            </TouchableOpacity>

            {menuOpenId === student.id && (
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: 28,
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  elevation: 8,
                  flexDirection: "row",
                  padding: 6,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: "#e9f3ff",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 6,
                  }}
                  onPress={() => setMenuOpenId(null)}
                >
                  <Ionicons name="pencil" size={18} color="#0b3d91" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: "#ffecec",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    deleteStudent(student.id);
                    setMenuOpenId(null);
                  }}
                >
                  <Ionicons name="trash" size={18} color="#e53935" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ))}

      {/* ADD STUDENT MODAL */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "#fff",
              borderRadius: 22,
              padding: 22,
              elevation: 10,
            }}
          >
            {/* MODAL HEADER */}
            <View
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: "#e9f3ff",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <Ionicons
                  name="school"
                  size={20}
                  color="#0b3d91"
                />
              </View>
              <Text
                style={{ fontSize: 18, fontWeight: "bold" }}
              >
                Add Student
              </Text>
            </View>

            {/* INPUTS */}
            <TextInput
              placeholder="Student Name"
              value={newStudent.name}
              onChangeText={(text) =>
                setNewStudent({ ...newStudent, name: text })
              }
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 12,
                padding: 14,
                marginTop: 18,
                backgroundColor: "#fafafa",
              }}
            />

            <TextInput
              placeholder="Email Address"
              value={newStudent.email}
              onChangeText={(text) =>
                setNewStudent({ ...newStudent, email: text })
              }
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 12,
                padding: 14,
                marginTop: 12,
                backgroundColor: "#fafafa",
              }}
            />

            {/* BUTTONS */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 22,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "#777", marginRight: 20 }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#0b3d91",
                  paddingHorizontal: 22,
                  paddingVertical: 10,
                  borderRadius: 12,
                }}
                onPress={addStudent}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold" }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};



  /* ---------------- DEPARTMENT SECTION ---------------- */

const DepartmentSection = () => {
  const [departments, setDepartments] = useState([
    { id: "1", name: "Computer Science", code: "CSE" },
    { id: "2", name: "Electronics", code: "ECE" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    code: "",
  });
  const [menuOpenId, setMenuOpenId] = useState(null);

  const addDepartment = () => {
    if (!newDepartment.name || !newDepartment.code) return;
    setDepartments([
      ...departments,
      { id: Date.now().toString(), ...newDepartment },
    ]);
    setNewDepartment({ name: "", code: "" });
    setModalVisible(false);
  };

  const deleteDepartment = (id) => {
    setDepartments(departments.filter((d) => d.id !== id));
  };

  return (
    <ScrollView style={{ backgroundColor: "#f2f5fa", flex: 1 }}>
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 20,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#0b3d91" }}>
          Departments
        </Text>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#0b3d91",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={{ color: "#fff", marginLeft: 6, fontWeight: "bold" }}>
            Add
          </Text>
        </TouchableOpacity>
      </View>

      {/* DEPARTMENT LIST */}
      {departments.map((dept) => (
        <View
          key={dept.id}
          style={{
            backgroundColor: "#fff",
            marginHorizontal: 20,
            marginBottom: 14,
            padding: 16,
            borderRadius: 18,
            elevation: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeftWidth: 4,
            borderLeftColor: "#0b3d91",
          }}
        >
          {/* LEFT */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: "#e9f3ff",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Ionicons name="business" size={22} color="#0b3d91" />
            </View>

            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {dept.name}
              </Text>
              <Text style={{ fontSize: 12, color: "#777", marginTop: 3 }}>
                Code: {dept.code}
              </Text>
            </View>
          </View>

          {/* ACTION MENU */}
          <View>
            <TouchableOpacity
              onPress={() =>
                setMenuOpenId(menuOpenId === dept.id ? null : dept.id)
              }
            >
              <Ionicons name="ellipsis-vertical" size={22} color="#444" />
            </TouchableOpacity>

            {menuOpenId === dept.id && (
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: 28,
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  elevation: 8,
                  flexDirection: "row",
                  padding: 6,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: "#e9f3ff",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 6,
                  }}
                  onPress={() => setMenuOpenId(null)}
                >
                  <Ionicons name="pencil" size={18} color="#0b3d91" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: "#ffecec",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    deleteDepartment(dept.id);
                    setMenuOpenId(null);
                  }}
                >
                  <Ionicons name="trash" size={18} color="#e53935" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ))}

      {/* ADD DEPARTMENT MODAL */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "#fff",
              borderRadius: 22,
              padding: 22,
              elevation: 10,
            }}
          >
            {/* MODAL HEADER */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: "#e9f3ff",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <Ionicons name="business" size={20} color="#0b3d91" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Add Department
              </Text>
            </View>

            {/* INPUTS */}
            <TextInput
              placeholder="Department Name"
              value={newDepartment.name}
              onChangeText={(text) =>
                setNewDepartment({ ...newDepartment, name: text })
              }
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 12,
                padding: 14,
                marginTop: 18,
                backgroundColor: "#fafafa",
              }}
            />

            <TextInput
              placeholder="Department Code"
              value={newDepartment.code}
              onChangeText={(text) =>
                setNewDepartment({ ...newDepartment, code: text })
              }
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 12,
                padding: 14,
                marginTop: 12,
                backgroundColor: "#fafafa",
              }}
            />

            {/* BUTTONS */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 22,
              }}
            >
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: "#777", marginRight: 20 }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#0b3d91",
                  paddingHorizontal: 22,
                  paddingVertical: 10,
                  borderRadius: 12,
                }}
                onPress={addDepartment}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};


  /* ---------------- USERS SECTION ---------------- */
  const UsersSection = () => (
    <>
      <Text style={styles.sectionTitle}>Users</Text>
      <View style={styles.box}>
        <Text>User management section</Text>
      </View>
    </>
  );

  /* ---------------- QUIZ SECTION ---------------- */
  const QuizSection = () => (
    <>
      <Text style={styles.sectionTitle}>Quiz Creation</Text>
      <View style={styles.box}>
        <Text>Create & manage quizzes here</Text>
      </View>
    </>
  );

  /* ---------------- RENDER CONTENT ---------------- */
  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return <DashboardSection />;
      case "Student":
        return <StudentSection />;
      case "Department":
        return <DepartmentSection />;
      case "Users":
        return <UsersSection />;
      case "Quiz Creation":
        return <QuizSection />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <View style={styles.profile}>
          <View style={styles.avatar} />
          <Text style={styles.name}>
            {user?.fname} {user?.lname}
          </Text>
        </View>

        <TouchableOpacity onPress={openSidebar}>
          <Ionicons name="menu" size={28} color="#0b3d91" />
        </TouchableOpacity>
      </View>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {renderContent()}
      </ScrollView>

      {/* ---------------- SIDEBAR ---------------- */}
      {isSidebarOpen && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            onPress={closeSidebar}
            activeOpacity={1}
          />

          <Animated.View
            style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
          >
            <TouchableOpacity style={styles.closeBtn} onPress={closeSidebar}>
              <Ionicons name="close" size={28} />
            </TouchableOpacity>

            {sidebarItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sidebarItemBox,
                  activeMenu === item.label && styles.activeItem,
                ]}
                onPress={() => {
                  setActiveMenu(item.label);
                  closeSidebar();
                }}
              >
                <Ionicons name={item.icon} size={20} />
                <Text style={styles.sidebarText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </>
      )}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fb" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },

  profile: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  name: { fontWeight: "bold" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 20,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 16,
  },

  statCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    width: "30%",
    alignItems: "center",
  },

  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0b3d91",
  },

  statLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  activityCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 10,
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  box: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 14,
  },

  sidebar: {
    position: "absolute",
    top: 90,
    left: 0,
    width: "70%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    zIndex: 100,
  },

  closeBtn: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },

  sidebarItemBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  sidebarText: {
    fontSize: 16,
    marginLeft: 12,
  },

  activeItem: {
    backgroundColor: "#e9f3ff",
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  overlay: {
    position: "absolute",
    top: 90,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 50,
  },
});