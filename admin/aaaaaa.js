import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import AdminUsersScreen from "./AdminUsersScreen";
import AdminStudentScreen from "./AdminStudentScreen";
import AdminDepartmentScreen from "./AdminDepartmentScreen";
import AdminSubjectScreen from "./AdminSubjectScreen";
import AdminQuizCreationScreen from "./AdminQuizCreationScreen";
import AdminExpenseScreen from "./AdminExpenseScreen";
import TeacherAssignedSubject from "./TeacherAssignedSubject";
import LoginScreen from "../login/LoginScreen";





export default function AdminDashboardScreen({ user, scores }) {
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
    { label: "Subject", icon: "book-outline" },
    { label: "Quiz Creation", icon: "create-outline" },
    { label: "Student", icon: "school-outline" },
    { label: "Teacher Assign Subject", icon: "people-outline" },
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

  /* ---------------- STUDENT SECTION ---------------- */
  const StudentSection = () => (
    <>
      <AdminStudentScreen
        user={user} scores={scores}
      />

    </>
  );
  /* ---------------- EXPENSE SECTION ---------------- */
  const ExpenseSection = () => (
    <>
      <AdminExpenseScreen
      />

    </>
  );
  /* ---------------- SUBJECT SECTION ---------------- */
  const SubjectSection = () => (
    <>
      <AdminSubjectScreen />

    </>
  );
  /* ---------------- DEPARTMENT SECTION ---------------- */
  const DepartmentSection = () => (
    <>
      <AdminDepartmentScreen />
    </>
  );

  /* ---------------- USERS SECTION ---------------- */
  const UsersSection = () => (
    <>
      <AdminUsersScreen

      />
    </>
  );

  /* ---------------- QUIZ SECTION ---------------- */
  const QuizSection = () => (
    <>
      <AdminQuizCreationScreen />

    </>
  );

  /* ---------------- Asiign teacher SECTION ---------------- */
  const TeacherAssignSection = () => (
    <>

      <TeacherAssignedSubject />

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
      case "Teacher Assign Subject":
        return <TeacherAssignSection />;
      case "Quiz Creation":
        return <QuizSection />;
      case "Subject":
        return <AdminExpenseScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Image source={{ uri:"https://static.wikia.nocookie.net/universalstudios/images/e/ed/Shrek2-disneyscreencaps.com-4305.jpg/revision/latest?cb=20250608051324"}} style={{width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 12}} />
          </View>
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
            <TouchableOpacity
                
                style={[
                  styles.sidebarItemBox,
                  activeMenu === "Logout" && styles.activeItem,
                ]}
                onPress={() => {
                  
                }}
              >
                <Ionicons name="log-out-outline" size={20} />
                <Text style={styles.sidebarText}>Logout</Text>
              </TouchableOpacity>
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