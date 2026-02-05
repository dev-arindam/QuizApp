import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Image,
  Modal,
  TextInput,
} from "react-native";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { LineChart, BarChart } from "react-native-chart-kit";
import AdminUsersScreen from "./AdminUsersScreen";
import AdminLibrary from "./AdminLibrary";
import AdminStudentScreen from "./AdminStudentScreen";
import AdminDepartmentScreen from "./AdminDepartmentScreen";
import AdminSubjectScreen from "./AdminSubjectScreen";
import AdminQuizCreationScreen from "./AdminQuizCreationScreen";
import AdminExpenseScreen from "./AdminExpenseScreen";
import AdminTaskManagementOverview from "./AdminTaskManagementOverview";
import AdminStudentUpgrade from "./AdminStudentUpgrade";
import AdminLeaveApproval from "./AdminLeaveApproval";
import AdminPerformamceRecord from "./AdminPerformamceRecord";
import TeacherAssignedSubject from "./TeacherAssignedSubject";


/* ============================
   DASHBOARD HELPER COMPONENTS
   ============================ */

const HeroStat = ({ icon, value, label }) => (
  <View style={styles.heroStat}>
    <Ionicons name={icon} size={22} color="#fff" />
    <Text style={styles.heroValue}>{value}</Text>
    <Text style={styles.heroLabel}>{label}</Text>
  </View>
);

const KpiCard = ({ title, value, icon, color }) => (
  <View style={styles.kpiCard}>
    <View style={[styles.kpiIcon, { backgroundColor: color }]}>
      <Ionicons name={icon} size={20} color="#fff" />
    </View>
    <Text style={styles.kpiValue}>{value}</Text>
    <Text style={styles.kpiTitle}>{title}</Text>
  </View>
);

const ActionBtn = ({ icon, label }) => (
  <TouchableOpacity style={styles.actionBtn}>
    <Ionicons name={icon} size={22} color="#0b3d91" />
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const Progress = ({ label, percent, width }) => (
  <View style={{ marginBottom: 14 }}>
    <View style={styles.progressHeader}>
      <Text style={styles.progressLabel}>{label}</Text>
      <Text style={styles.progressValue}>{percent}</Text>
    </View>
    <View style={styles.progressBg}>
      <View style={[styles.progressFill, { width }]} />
    </View>
  </View>
);

const TaskRow = ({ title, date }) => (
  <View style={styles.taskRow}>
    <Ionicons name="time-outline" size={18} color="#0b3d91" />
    <Text style={styles.taskText}>{title}</Text>
    <Text style={styles.taskDate}>{date}</Text>
  </View>
);

const ActivityRow = ({ text }) => (
  <View style={styles.activityRow}>
    <Ionicons name="checkmark-circle-outline" size={18} color="#4caf50" />
    <Text style={styles.activityText}>{text}</Text>
  </View>
);

/* ---------------- TASK MANAGEMENT SECTIONS ---------------- */
const TaskOverview = () => (
  <AdminTaskManagementOverview />
);

const AllTasks = () => (
  <View style={styles.box}>
    <Text>All Tasks List</Text>
  </View>
);

const CreateTask = () => (
  <View style={styles.box}>
    <Text>Create New Task</Text>
  </View>
);

const TaskDepartments = () => (
  <View style={styles.box}>
    <Text>Department-wise Tasks</Text>
  </View>
);

const StaffTasks = () => (
  <View style={styles.box}>
    <Text>Staff Tasks</Text>
  </View>
);

const TaskCalendar = () => (
  <View style={styles.box}>
    <Text>Task Calendar View</Text>
  </View>
);

const TaskReports = () => (
  <View style={styles.box}>
    <Text>Task Reports & Analytics</Text>
  </View>
);


export default function AdminScreen({ user, scores, onLogout }) {
  const screenWidth = Dimensions.get("window").width - 40;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

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
    { label: "Examination", icon: "create-outline" },
    // { label: "Assigned Subject", icon: "book-outline" },
    {
      label: "Student Manage", icon: "school-outline",
      submenu: [
        { label: "Student List", icon: "analytics-outline" },
        { label: "Student Upgrade", icon: "list-outline" },
      ],
    },
    { label: "Expenses", icon: "cash-outline" },
    {
      label: "Task Management",
      icon: "clipboard-outline",
      submenu: [
        { label: "Overview", icon: "analytics-outline" },
        { label: "All Tasks", icon: "list-outline" },
        { label: "Create Task", icon: "add-circle-outline" },
        { label: "Departments", icon: "business-outline" },
        { label: "Staff Tasks", icon: "people-outline" },
        { label: "Calendar", icon: "calendar-outline" },
        { label: "Reports", icon: "document-text-outline" },
      ],
    },
    { label: "Reports", icon: "bar-chart-outline" },
    { label: "Library", icon: "library-outline" },
    { label: "Technical Issues", icon: "settings-outline" },
    { label: "Leave Approval", icon: "checkmark-done-outline" },
    { label: "Performance Record", icon: "trending-up-outline" },
    { label: "Logout", icon: "log-out-outline" },

  ];

  /* ---------------- DASHBOARD SECTION ---------------- */

  const DashboardSection = ({ user }) => (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: "#eef2f7" }}>

      {/* GREETING */}
      {/* <View style={{
      backgroundColor: "#4b7bec",
      borderRadius: 28,
      margin: 20,
      padding: 24,
      paddingBottom: 32,
      shadowColor: "#4b7bec",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 10,
    }}>
      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>Welcome, {user?.fname}!</Text>
      <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold", marginTop: 6 }}>
        Admin Dashboard
      </Text>
    </View> */}

      {/* ADMIN STAT CARDS */}
      <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
        <View style={adminStatCard("#4b7bec")}>
          <Ionicons name="people-outline" size={28} color="#fff" />
          <Text style={adminStatText}>1250</Text>
          <Text style={adminStatLabel}>Total Students</Text>
        </View>

        <View style={adminStatCard("#45aaf2")}>
          <Ionicons name="person-outline" size={28} color="#fff" />
          <Text style={adminStatText}>85</Text>
          <Text style={adminStatLabel}>Total Teachers</Text>
        </View>

        <View style={adminStatCard("#2bcbba")}>
          <Ionicons name="school-outline" size={28} color="#fff" />
          <Text style={adminStatText}>12</Text>
          <Text style={adminStatLabel}>Departments</Text>
        </View>

        <View style={adminStatCard("#fed330")}>
          <Ionicons name="book-outline" size={28} color="#fff" />
          <Text style={adminStatText}>38</Text>
          <Text style={adminStatLabel}>Courses</Text>
        </View>
      </View>

      {/* BAR CHART */}
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12, color: "#333" }}>Monthly Report</Text>
        <BarChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{ data: [30, 45, 28, 80, 99, 43], colors: [(opacity = 1) => `rgba(75,123,236, ${opacity})`] }],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: "#eef2f7",
            backgroundGradientTo: "#eef2f7",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(75,123,236, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(51,51,51, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{ borderRadius: 20 }}
          fromZero
          showValuesOnTopOfBars
        />
      </View>

      {/* PERFORMANCE CARDS */}
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16, color: "#333" }}>System Performance</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          <View style={performanceCardStyle("#4b7bec")}>
            <Ionicons name="checkmark-done-outline" size={26} color="#fff" />
            <Text style={perfTitle}>Tasks Completed</Text>
            <Text style={perfPercent}>320 / 400</Text>
          </View>

          <View style={performanceCardStyle("#45aaf2")}>
            <Ionicons name="create-outline" size={26} color="#fff" />
            <Text style={perfTitle}>Quizzes Created</Text>
            <Text style={perfPercent}>52 Quizzes</Text>
          </View>

          <View style={performanceCardStyle("#2bcbba")}>
            <Ionicons name="analytics-outline" size={26} color="#fff" />
            <Text style={perfTitle}>Reports Generated</Text>
            <Text style={perfPercent}>14 Reports</Text>
          </View>

          <View style={performanceCardStyle("#fed330")}>
            <Ionicons name="stats-chart-outline" size={26} color="#fff" />
            <Text style={perfTitle}>Active Users</Text>
            <Text style={perfPercent}>850 This Week</Text>
          </View>
        </View>
      </View>

      {/* LINE CHART */}
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12, color: "#333" }}>Weekly Activity</Text>
        <LineChart
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{ data: [50, 80, 70, 100, 90, 120, 110], color: () => "#4b7bec", strokeWidth: 3 }]
          }}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#eef2f7",
            backgroundGradientTo: "#eef2f7",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(75,123,236, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(51,51,51, ${opacity})`,
            propsForDots: { r: "6", strokeWidth: "2", stroke: "#4b7bec" }
          }}
          style={{ borderRadius: 20 }}
        />
      </View>

      {/* QUICK ACTION GRID */}
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 14, color: "#333" }}>Quick Actions</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          <View style={quickCardStyle("#4b7bec")}>
            <Ionicons name="person-add-outline" size={28} color="#fff" />
            <Text style={quickTextStyle}>Add Student</Text>
          </View>

          <View style={quickCardStyle("#45aaf2")}>
            <Ionicons name="create-outline" size={28} color="#fff" />
            <Text style={quickTextStyle}>Create Quiz</Text>
          </View>

          <View style={quickCardStyle("#2bcbba")}>
            <Ionicons name="clipboard-outline" size={28} color="#fff" />
            <Text style={quickTextStyle}>Assign Task</Text>
          </View>

          <View style={quickCardStyle("#fed330")}>
            <Ionicons name="analytics-outline" size={28} color="#fff" />
            <Text style={quickTextStyle}>View Reports</Text>
          </View>
        </View>
      </View>

      {/* RECENT ACTIVITY */}
      <View style={{ marginHorizontal: 20, marginTop: 24, marginBottom: 40 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12, color: "#333" }}>Recent Activity</Text>
        <View style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.06,
          shadowRadius: 10,
          elevation: 4,
        }}>
          <ActivityRow text="New student added to CSE department" />
          <ActivityRow text="Quiz published for ECE" />
          <ActivityRow text="Task assigned to faculty" />
        </View>
      </View>

    </ScrollView>
  );

  // --- STYLES ---
  const adminStatCard = (color) => ({
    alignItems: "center",
    backgroundColor: color,
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 16,
    width: "48%",
    marginBottom: 14,
    shadowColor: color,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  });

  const adminStatText = { color: "#fff", fontSize: 20, fontWeight: "bold", marginTop: 6 };
  const adminStatLabel = { color: "#fff9", fontSize: 12, marginTop: 4 };

  const performanceCardStyle = (color) => ({
    width: "48%",
    backgroundColor: color,
    borderRadius: 20,
    padding: 20,
    marginBottom: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: color,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  });


  const perfTitle = { color: "#fff", fontWeight: "bold", fontSize: 16, marginTop: 12 };
  const perfPercent = { color: "#fff9", fontSize: 12, marginTop: 4 };

  const quickCardStyle = (color) => ({
    width: "48%",
    backgroundColor: color,
    borderRadius: 20,
    paddingVertical: 28,
    alignItems: "center",
    marginBottom: 14,
    shadowColor: color,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6
  });

  const quickTextStyle = {
    color: "#fff",
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center"
  };


  /* ---------------- STUDENT SECTION ---------------- */
  const StudentSection = () => (
    <>
      <AdminStudentScreen
        user={user} scores={scores}
      />

    </>
  );
  const StudentUpgradeSection = () => (
    <>
      <AdminStudentUpgrade
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
  /* ---------------- Library SECTION ---------------- */
  const LibrarySection = () => (
    <>
      <AdminLibrary
      />

    </>
  );
  /* ---------------- LEAVE APPROVE SECTION ---------------- */
  const LeaveApprovalSection = () => (
    <>

      <AdminLeaveApproval />

    </>
  );
  /* ---------------- PERFORMANCE RECORD SECTION ---------------- */
  const PerformanceRecordSection = () => (
    <>

      <AdminPerformamceRecord  />

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
        return <StudentSection />;
      case "Student Upgrade":
        return <StudentUpgradeSection />;
      case "Department":
        return <DepartmentSection />;
      case "Expenses":
        return <ExpenseSection />;
      case "Users":
        return <UsersSection />;
      case "Examination":
        return <QuizSection />;
      case "Subject":
        return <SubjectSection />;
      case "Overview":
        return <TaskOverview />;
      case "All Tasks":
        return <AllTasks />;
      case "Create Task":
        return <CreateTask />;
      case "Departments":
        return <TaskDepartments />;
      case "Staff Tasks":
        return <StaffTasks />;
      case "Calendar":
        return <TaskCalendar />;
      case "Reports":
        return <TaskReports />;
      case "Library":
        return <LibrarySection />;
      case "Leave Approval":
        return <LeaveApprovalSection />;
        case "Performance Record":
        return <PerformanceRecordSection />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* ---------------- MODERN HEADER ---------------- */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>

          {/* LEFT: MENU */}
          <TouchableOpacity onPress={openSidebar} style={styles.menuBtn}>
            <Ionicons name="menu" size={26} color="#fff" />
          </TouchableOpacity>

          {/* CENTER: TITLE */}
          <View>
            <Text style={styles.welcomeText}>Welcome back 👋</Text>
            <Text style={styles.userName}>
              {user?.fname} {user?.lname}
            </Text>
          </View>

          {/* RIGHT: NOTIFICATION + AVATAR */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={styles.notification}>
              <Ionicons name="notifications-outline" size={22} color="#fff" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>

            <View
            >
              <Image source={{ uri: "https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg" }} style={styles.profileAvatar} />
            </View>
          </View>

        </View>
      </View>


      {/* ---------------- MAIN CONTENT ---------------- */}
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {renderContent()}
      </ScrollView>

      {/* ---------------- FIXED BOTTOM BAR ---------------- */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomItem}>
          <Ionicons name="home" size={24} color="#6366f1" />
          <Text style={styles.bottomActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomItem}>
          <Ionicons name="people-outline" size={24} color="#94a3b8" />
          <Text style={styles.bottomLabel}>Students</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomItem}>
          <Ionicons name="calendar-outline" size={24} color="#94a3b8" />
          <Text style={styles.bottomLabel}>Events</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomItem}>
          <Ionicons name="person-outline" size={24} color="#94a3b8" />
          <Text style={styles.bottomLabel}>Profile</Text>
        </TouchableOpacity>
      </View>


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
            {/* SIDEBAR HEADER */}
            <View style={styles.sidebarHeader}>
              <View style={styles.sidebarProfile}>
                <View style={styles.sidebarAvatar}>
                  <Text style={styles.sidebarAvatarText}>
                    {user?.fname?.[0]}
                  </Text>
                </View>
                <View>
                  <Text style={styles.sidebarName}>
                    {user?.fname} {user?.lname}
                  </Text>
                  <Text style={styles.sidebarRole}>Administrator</Text>
                </View>
              </View>

              {/* CLOSE BUTTON */}
              <TouchableOpacity
                style={styles.sidebarCloseBtn}
                onPress={closeSidebar}
              >
                <Ionicons name="close" size={20} color="#0b3d91" />
              </TouchableOpacity>
            </View>

            {/* MENU */}
            <ScrollView showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 50, // IMPORTANT
              }}>
              {sidebarItems.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={[
                      styles.sidebarItemBox,
                      activeMenu === item.label && styles.activeItem,
                    ]}
                    onPress={() => {
                      if (item.label === "Logout") {
                        closeSidebar();

                        if (typeof onLogout === "function") {
                          onLogout();
                        } else {
                          console.log("onLogout not provided");
                        }

                        return;
                      }


                      if (item.submenu) {
                        setOpenSubmenu(openSubmenu === item.label ? null : item.label);
                      } else {
                        setActiveMenu(item.label);
                        closeSidebar();
                      }
                    }}

                  >
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={activeMenu === item.label ? "#0b3d91" : "#555"}
                    />
                    <Text
                      style={[
                        styles.sidebarText,
                        activeMenu === item.label && styles.activeText,
                      ]}
                    >
                      {item.label}
                    </Text>

                    {item.submenu && (
                      <Ionicons
                        name={
                          openSubmenu === item.label
                            ? "chevron-up-outline"
                            : "chevron-down-outline"
                        }
                        size={16}
                        color="#777"
                        style={{ marginLeft: "auto" }}
                      />
                    )}
                  </TouchableOpacity>

                  {/* SUBMENU */}
                  {item.submenu && openSubmenu === item.label && (
                    <ScrollView
                      style={styles.submenuWrapper}
                      contentContainerStyle={{ paddingBottom: 8 }}
                      showsVerticalScrollIndicator={true}
                    >
                      {item.submenu.map((sub, subIndex) => (
                        <TouchableOpacity
                          key={subIndex}
                          style={[
                            styles.submenuItem,
                            activeMenu === sub.label && styles.submenuActive,
                          ]}
                          onPress={() => {
                            setActiveMenu(sub.label);
                            closeSidebar();
                          }}
                        >
                          <Ionicons
                            name={sub.icon}
                            size={15}
                            color={activeMenu === sub.label ? "#0b3d91" : "#777"}
                          />
                          <Text
                            style={[
                              styles.submenuText,
                              activeMenu === sub.label && styles.activeText,
                            ]}
                          >
                            {sub.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}

                </View>
              ))}
            </ScrollView>
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
    top: 124,
    left: 0,
    width: "75%",
    bottom: 0,
    // height: "100%",
    backgroundColor: "#ffffff",
    borderTopRightRadius: 28,
    paddingBottom: 30,
    elevation: 15,
    zIndex: 100,
  },

  sidebarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  sidebarProfile: {
    flexDirection: "row",
    alignItems: "center",
  },

  sidebarAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#e9f3ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  sidebarAvatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0b3d91",
  },

  sidebarName: {
    fontSize: 15,
    fontWeight: "bold",
  },

  sidebarRole: {
    fontSize: 12,
    color: "#777",
  },

  sidebarCloseBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#e9f3ff",
    justifyContent: "center",
    alignItems: "center",
  },

  sidebarItemBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 12,
    borderRadius: 14,
    marginTop: 6,
  },

  activeItem: {
    backgroundColor: "#e9f3ff",
  },

  sidebarText: {
    fontSize: 15,
    marginLeft: 14,
    color: "#444",
  },

  activeText: {
    fontWeight: "bold",
    color: "#0b3d91",
  },

  submenuWrapper: {
    marginLeft: 54,
    marginTop: 6,
  },


  submenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  submenuText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#777",
  },

  submenuActive: {
    backgroundColor: "#f1f6ff",
    borderRadius: 12,
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
  hero: {
    backgroundColor: "#0b3d91",
    padding: 26,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  heroSubtitle: {
    color: "#dbe7ff",
    marginTop: 6,
  },
  heroStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  heroStat: {
    alignItems: "center",
  },
  heroValue: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 4,
  },
  heroLabel: {
    color: "#cfd8ff",
    fontSize: 12,
  },

  kpiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  kpiCard: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
    elevation: 4,
  },
  kpiIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  kpiValue: {
    fontWeight: "bold",
    fontSize: 18,
  },
  kpiTitle: {
    fontSize: 12,
    color: "#777",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
  },
  actionBtn: {
    width: "30%",
    backgroundColor: "#fff",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    elevation: 3,
  },
  actionLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "bold",
    color: "#0b3d91",
  },

  analyticsCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBg: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    marginTop: 6,
  },
  progressFill: {
    height: 8,
    backgroundColor: "#0b3d91",
    borderRadius: 10,
  },

  listCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
    fontWeight: "bold",
  },
  taskDate: {
    fontSize: 12,
    color: "#777",
  },

  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  activityText: {
    marginLeft: 10,
  },

  headerContainer: {
    backgroundColor: "#0b3d91",
    paddingTop: 50,
    paddingBottom: 26,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 10,
  },

  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 10,
    borderRadius: 14,
  },

  welcomeText: {
    color: "#cddcff",
    fontSize: 12,
  },

  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  notification: {
    marginRight: 12,
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    backgroundColor: "#ff5252",
    borderRadius: 4,
  },

  profileAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#e9f3ff",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0b3d91",
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 24,
    color: "#1a1a1a",
  },

  overviewGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  overviewCard: {
    width: "30%",
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: "center",
    elevation: 6,
  },

  overviewValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },

  overviewLabel: {
    fontSize: 12,
    color: "#eaf0ff",
    marginTop: 4,
  },

  performanceCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 12,
    padding: 20,
    borderRadius: 22,
    elevation: 5,
  },

  performanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  performanceLabel: {
    fontSize: 14,
    color: "#444",
  },

  performanceValue: {
    fontWeight: "bold",
    color: "#0b3d91",
  },

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
  },

  quickCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 26,
    alignItems: "center",
    marginBottom: 14,
    elevation: 4,
  },

  quickText: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#0b3d91",
  },

  activityCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 22,
    elevation: 4,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#0b3d91",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 100,
  },

  bottomBarBtn: {
    justifyContent: "center",
    alignItems: "center",
  },

  bottomBarText: {
    color: "#cddcff",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "bold",
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 99,
  },

  bottomItem: {
    justifyContent: "center",
    alignItems: "center",
  },

  bottomLabel: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 2,
  },

  bottomActive: {
    fontSize: 12,
    color: "#6366f1",
    fontWeight: "bold",
    marginTop: 2,
  },

  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28, // lifts it above bar
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },


});