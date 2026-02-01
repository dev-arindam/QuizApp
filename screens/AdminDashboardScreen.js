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
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import AdminUsersScreen from "./AdminUsersScreen";
import AdminStudentScreen from "./AdminStudentScreen";
import AdminDepartmentScreen from "./AdminDepartmentScreen";
import AdminSubjectScreen from "./AdminSubjectScreen";
import AdminQuizCreationScreen from "./AdminQuizCreationScreen";
import TeacherAssignedSubject from "./TeacherAssignedSubject";
import Nodatafound from "./nodatafound";

import AdminStudentUpgradeScreen from "./AdminStudentUpgradeScreen";




export default function AdminDashboardScreen({ user, scores }) {
  const screenWidth = Dimensions.get("window").width;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [studentMenuOpen, setStudentMenuOpen] = useState(false);


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
// sub menu ari
   {  label: "Student Manage", icon: "school-outline",
    children: [
      { label: "Student List" },
      { label: "Student Upgrade" },
    ],
  },
  { label: "Examination", icon: "clipboard-outline" },

  { label: "Expense", icon: "cash-outline" },
  { label: "Task Management", icon: "list-outline" },
  { label: "Reports", icon: "bar-chart-outline" },
  { label: "Library", icon: "library-outline" },

  { label: "Technical Issues", icon: "settings-outline" },
  { label: "Leave Approval", icon: "checkmark-done-outline" },
  { label: "Performance Record", icon: "trending-up-outline" },

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

  /* ---------------- STUDENT SECTION ---------------- */
  const StudentSection = () => { 

     const [activeTab, setActiveTab] = useState("Manage");
     return (
          <>
      {/* STUDENT HEADER */}
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#0b3d91" }}>
          Student Information
        </Text>

        {/* TABS */}
        <View style={{ flexDirection: "row", marginTop: 14 }}>
          <TouchableOpacity
            onPress={() => setActiveTab("Manage")}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 18,
              borderRadius: 20,
              backgroundColor:
                activeTab === "Manage" ? "#0b3d91" : "#e9f3ff",
              marginRight: 10,
            }}
          >
            <Text
              style={{
                color: activeTab === "Manage" ? "#fff" : "#0b3d91",
                fontWeight: "bold",
              }}
            >
              Student Manage
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("Upgrade")}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 18,
              borderRadius: 20,
              backgroundColor:
                activeTab === "Upgrade" ? "#0b3d91" : "#e9f3ff",
            }}
          >
            <Text
              style={{
                color: activeTab === "Upgrade" ? "#fff" : "#0b3d91",
                fontWeight: "bold",
              }}
            >
              Student Upgrade
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TAB CONTENT */}
      {activeTab === "Manage" && (
        <AdminStudentScreen user={user} scores={scores} />
      )}

      {activeTab === "Upgrade" && <AdminStudentUpgradeScreen />}
    </>
     );

    }

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

case "Student List":
  return <AdminStudentScreen user={user} scores={scores} />;

case "Student Upgrade":
  return <AdminStudentUpgradeScreen />;


    case "Examination":
      return <ExaminationSection />;

    case "Expense":
      return <AdminExpenseScreen />;

    case "Task Management":
      return <AdminTaskScreen />;

    case "Reports":
      return <AdminReportsScreen />;

    case "Library":
      return <AdminLibraryScreen />;

    case "Technical Issues":
      return <AdminTechnicalIssueScreen />;

    case "Leave Approval":
      return <AdminLeaveApprovalScreen />;

    case "Performance Record":
      return <AdminPerformanceRecordScreen />;

    case "Users":
      return <UsersSection />;

    case "Department":
      return <DepartmentSection />;

    case "Subject":
      return <SubjectSection />;

    default:
      return <Nodatafound />;
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

{sidebarItems.map((item, index) => {
  // STUDENT MENU WITH CHILDREN
  if (item.children) {
    return (
      <View key={index}>
        {/* PARENT ITEM */}
        <TouchableOpacity
          style={styles.sidebarItemBox}
          onPress={() => setStudentMenuOpen(!studentMenuOpen)}
        >
          <Ionicons name={item.icon} size={20} />
          <Text style={styles.sidebarText}>{item.label}</Text>
          <Ionicons
            name={studentMenuOpen ? "chevron-up" : "chevron-down"}
            size={16}
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        {/* CHILD ITEMS */}
        {studentMenuOpen &&
          item.children.map((child, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.subMenuItem,
                activeMenu === child.label && styles.activeItem,
              ]}
              onPress={() => {
                setActiveMenu(child.label);
                closeSidebar();
              }}
            >
              <Text style={styles.subMenuText}>{child.label}</Text>
            </TouchableOpacity>
          ))}
      </View>
    );
  }

  // NORMAL MENU ITEMS
  return (
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
  );
})}

          </Animated.View>
        </>
      )}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fb", paddingVertical:10, },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
    paddingBottom:10,
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

  // sub menu arindam
  subMenuItem: {
  paddingVertical: 10,
  paddingLeft: 50,
  marginTop:5,
  // backgroundColor: "#f1f6ff",
},

subMenuText: {
  fontSize: 14,
  // color: "#0b3d91",
},

});