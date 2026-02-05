import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import TeacherProfile from "./TeacherProfile"

const { width } = Dimensions.get("window");

export default function ModernTeacherDashboard({user ,onLogout,setScreen}) {
   const [questionMenu, setQuestionMenu] = useState(false);
   const [studyMenu, setStudyMenu] = useState(false);
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [quizOpen, setQuizOpen] = useState(false);


    // Function to get dynamic greeting
const getGreeting = () => {
  const hour = new Date().getHours(); // gets 0 - 23
  if (hour >= 5 && hour < 12) return "Good Morning";
  else if (hour >= 12 && hour < 17) return "Good Afternoon";
  else return "Good Evening";
};

  return (
    
    
    
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ===== Gradient Header ===== */}
        <LinearGradient colors={['#6366f1', '#4f46e5']} style={styles.header}>
  <View style={styles.headerTop}>
    <View style={styles.avatar}>
      <Ionicons name="person" size={28} color="#fff" />
    </View>

    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text style={styles.name}>
        {user?.fname || "Professor Name"} {user?.lname || "Professor Name"}
      </Text>
      <Text style={styles.role}>Assistant Professor</Text>
    </View>

    {/*  LOGOUT */}
    {/* <TouchableOpacity onPress={onLogout}>
      <Ionicons name="log-out-outline" size={26} color="#fff" />
    </TouchableOpacity> */}

    <TouchableOpacity onPress={() => setSidebarOpen(true)}>
  <Ionicons name="menu" size={28} color="#fff" />
</TouchableOpacity>

  </View>

  <Text style={styles.welcome}>
    {getGreeting()}, {user.fname} {user.lname} !
  </Text>
</LinearGradient>


        {/* ===== Floating Stats Cards ===== */}
        <View style={styles.statsRow}>
          <FloatingCard title="Exam & Marks" value="1,250" icon="clipboard-check" colors={['#6366f1', '#818cf8']} />
          <FloatingCard title="My Subject" value="24" icon="book" colors={['#22c55e', '#4ade80']} />
          <FloatingCard title="Assignments" value="32" icon="file-alt" colors={['#f59e0b', '#fcd34d']} />
          <FloatingCard title="Attendence" value="18" icon="calendar-check" colors={['#ef4444', '#f87171']} />
        </View>

        {/* ===== Quick Access Grid ===== */}
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickRow}>
          <QuickCard icon="chalkboard" label="Classes" colors={['#6366f1', '#818cf8']} />
          <QuickCard icon="tasks" label="Assignments" colors={['#22c55e', '#4ade80']} />
          <QuickCard icon="question-circle" label="Questions" colors={['#f59e0b', '#fcd34d']} onPress={() => setQuestionMenu(true)} />
          <QuickCard icon="user-graduate" label="Study" colors={['#ef4444', '#f87171']} onPress={() => setStudyMenu(true)} />
        </View>

        {/* ===== Performance Circular Chart ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Student Performance</Text>
          <View style={styles.performanceRow}>
            <View style={styles.circleChart}>
              <LinearGradient colors={['#6366f1', '#818cf8']} style={styles.circleGradient}>
                <Text style={styles.circleLabel}>85%</Text>
                <Text style={styles.circleSubLabel}>Average</Text>
              </LinearGradient>
            </View>
            <View style={{ flex: 1, paddingLeft: 12 }}>
              <Legend color="#6366f1" label="Average Score" />
              <Legend color="#22c55e" label="Top Performers" />
              <Legend color="#f59e0b" label="Class Avg" />
            </View>
          </View>
        </View>

        {/* ===== Upcoming Events ===== */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Upcoming Events</Text>

          <EventCard
            icon="flask"
            title="Lab Session"
            date="01 Feb 2026"
            time="10:00 AM"
            location="Lab 3"
            status="Pending"
            colors={['#fbbf24', '#fcd34d']}
          />

          <EventCard
            icon="users"
            title="Parent Meeting"
            date="03 Feb 2026"
            time="2:00 PM"
            location="Conference Room"
            status="Confirmed"
            colors={['#34d399', '#10b981']}
          />

          <EventCard
            icon="chalkboard-teacher"
            title="Guest Lecture"
            date="05 Feb 2026"
            time="11:30 AM"
            location="Auditorium"
            status="Scheduled"
            colors={['#6366f1', '#818cf8']}
          />

        </View>

        <View style={{ height: 40 }} />
      </ScrollView>


{sidebarOpen && (
  <View style={styles.sidebarOverlay}>
    <View style={styles.sidebar}>

      {/* Sidebar Header */}
      <View style={styles.sidebarHeader}>
    <TouchableOpacity
      style={styles.sidebarClose}
      onPress={() => setSidebarOpen(false)}
    >
      <Ionicons name="close" size={22} color="#6b7280" />
    </TouchableOpacity>

    <View style={styles.sidebarAvatar}>
      <Ionicons name="person" size={28} color="#fff" />
    </View>

    <Text style={styles.sidebarName}>
      {user?.fname || "Professor"} {user?.lname || ""}
    </Text>
    <Text style={styles.sidebarRole}>Assistant Professor</Text>
  </View>


      {/* Menu Items */}
     <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingBottom: 80,
  }}
>



  {/* Profile */}
  <TouchableOpacity style={styles.sidebarItem}>
    <Ionicons name="person-outline" size={22} color="#6366f1" />
    <Text style={styles.sidebarText}>Profile</Text>
  </TouchableOpacity>

  {/* Attendance */}
  <TouchableOpacity style={styles.sidebarItem}>
    <Ionicons name="calendar-outline" size={22} color="#6366f1" />
    <Text style={styles.sidebarText}>Attendance</Text>
  </TouchableOpacity>

  {/* Exam & Marks */}
  <TouchableOpacity style={styles.sidebarItem}>
    <Ionicons name="clipboard-outline" size={22} color="#6366f1" />
    <Text style={styles.sidebarText}>Exam & Marks</Text>
  </TouchableOpacity>

  {/* Assignment */}
  <TouchableOpacity style={styles.sidebarItem}>
    <Ionicons name="document-text-outline" size={22} color="#6366f1" />
    <Text style={styles.sidebarText}>Assignment</Text>
  </TouchableOpacity>

  {/* ===== ONLINE QUIZ (WITH SUB MENU) ===== */}
  <TouchableOpacity
    style={styles.sidebarItem}
    onPress={() => setQuizOpen(!quizOpen)}
  >
    <Ionicons name="help-circle-outline" size={22} color="#6366f1" />
    <Text style={styles.sidebarText}>Online Quiz</Text>
    <Ionicons
      name={quizOpen ? "chevron-up-outline" : "chevron-down-outline"}
      size={18}
      color="#64748b"
      style={{ marginLeft: "auto" }}
    />
  </TouchableOpacity>

  {quizOpen && (
    <View style={styles.subMenu}>
      <TouchableOpacity style={styles.subMenuItem}>
        <Ionicons name="add-circle-outline" size={18} color="#4f46e5" />
        <Text style={styles.subMenuText}>Create Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.subMenuItem}>
        <Ionicons name="albums-outline" size={18} color="#4f46e5" />
        <Text style={styles.subMenuText}>Question Bank</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.subMenuItem}>
        <Ionicons name="cloud-upload-outline" size={18} color="#4f46e5" />
        <Text style={styles.subMenuText}>Bulk Upload</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.subMenuItem}>
        <Ionicons name="trophy-outline" size={18} color="#4f46e5" />
        <Text style={styles.subMenuText}>Result</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.subMenuItem}>
        <Ionicons name="analytics-outline" size={18} color="#4f46e5" />
        <Text style={styles.subMenuText}>Analytics</Text>
      </TouchableOpacity>
    </View>
  )}

  {/* Study Materials */}
  <TouchableOpacity style={styles.sidebarItem}>
    <Ionicons name="library-outline" size={22} color="#6366f1" />
    <Text style={styles.sidebarText}>Study Materials</Text>
  </TouchableOpacity>

  {/* Notice */}
  <TouchableOpacity style={styles.sidebarItem}>
    <Ionicons name="notifications-outline" size={22} color="#6366f1" />
    <Text style={styles.sidebarText}>Notice</Text>
  </TouchableOpacity>

  {/* Message */}
  <TouchableOpacity style={styles.sidebarItem}>
    <Ionicons name="chatbubble-ellipses-outline" size={22} color="#6366f1" />
    <Text style={styles.sidebarText}>Message</Text>
  </TouchableOpacity>

  {/* Reports */}
  <TouchableOpacity style={styles.sidebarItem}>
    <Ionicons name="bar-chart-outline" size={22} color="#6366f1" />
    <Text style={styles.sidebarText}>Reports</Text>
  </TouchableOpacity>

  {/* Settings */}
  <TouchableOpacity style={styles.sidebarItem}>
    <Ionicons name="settings-outline" size={22} color="#6366f1" />
    <Text style={styles.sidebarText}>Settings</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.sidebarItem} onPress={onLogout}>
    <Ionicons name="log-out-outline" size={22} color="#6366f1" />
    <Text style={styles.sidebarText}>Logout</Text>
  </TouchableOpacity>

</ScrollView>




    </View>

    {/* Close on background tap */}
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => setSidebarOpen(false)}
    />
  </View>
)}



      {questionMenu && (
  <View style={styles.overlay}>
    <View style={styles.bottomSheet}>

      <View style={styles.sheetHeader}>
        <Text style={styles.sheetTitle}>Questions</Text>
        <TouchableOpacity onPress={() => setQuestionMenu(false)}>
          <Ionicons name="close" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Create Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Question Bank</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Bulk Upload</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Results</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Analytics</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  </View>
)}

{studyMenu && (
  <View style={styles.overlay}>
    <View style={styles.bottomSheet}>

      <View style={styles.sheetHeader}>
        <Text style={styles.sheetTitle}>Study</Text>
        <TouchableOpacity onPress={() => setStudyMenu(false)}>
          <Ionicons name="close" size={24} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Study Materials</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Notes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Video Lectures</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Reference Books</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Syllabus</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  </View>
)}

   
{/* ===== FIXED BOTTOM BAR ===== */}
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

    </SafeAreaView>
  );
}

/* ================= Components ================= */
const FloatingCard = ({ title, value, icon, colors }) => (
  <LinearGradient colors={colors} style={styles.floatingCard}>
    <View style={styles.iconCircle}>
      <FontAwesome5 name={icon} size={20} color="#fff" />
    </View>
    <Text style={styles.floatingValue}>{value}</Text>
    <Text style={styles.floatingTitle}>{title}</Text>
  </LinearGradient>
);

const QuickCard = ({ icon, label, colors, onPress }) => (
  <TouchableOpacity style={styles.quickCard} onPress={onPress}>
    <LinearGradient colors={colors} style={styles.quickIconCircle}>
      <FontAwesome5 name={icon} size={20} color="#fff" />
    </LinearGradient>
    <Text style={styles.quickLabel}>{label}</Text>
  </TouchableOpacity>
);


const EventCard = ({ icon, title, date, time, location, status, colors }) => (
  <LinearGradient colors={colors} style={styles.eventCard}>
    <View style={styles.eventCardTop}>
      <View style={styles.eventIconCircle}>
        <FontAwesome5 name={icon} size={18} color="#fff" />
      </View>
      <Text style={styles.eventCardTitle}>{title}</Text>
    </View>

    <View style={styles.eventCardBottom}>
      <View style={styles.eventInfo}>
        <Ionicons name="calendar-outline" size={14} color="#fff" />
        <Text style={styles.eventInfoText}>{date}</Text>
      </View>
      <View style={styles.eventInfo}>
        <Ionicons name="time-outline" size={14} color="#fff" />
        <Text style={styles.eventInfoText}>{time}</Text>
      </View>
      <View style={styles.eventInfo}>
        <Ionicons name="location-outline" size={14} color="#fff" />
        <Text style={styles.eventInfoText}>{location}</Text>
      </View>
      <View style={[styles.eventStatusBadge, { backgroundColor: '#fff' }]}>
        <Text style={[styles.eventStatusText, { color: colors[0] }]}>{status}</Text>
      </View>
    </View>
  </LinearGradient>
);

const Legend = ({ color, label }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);


/* ================= Styles ================= */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f4f6ff" },
  header: { padding: 22, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  headerTop: { flexDirection: "row", alignItems: "center",paddingTop: 20 },
  avatar: { backgroundColor: "#4f46e5", width: 48, height: 48, borderRadius: 24, justifyContent: "center", alignItems: "center" },
  name: { color: "#fff", fontSize: 17, fontWeight: "bold" },
  role: { color: "#c7d2fe", fontSize: 13 },
  welcome: { color: "#fff", fontSize: 22, fontWeight: "bold", marginTop: 18 },

  statsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", paddingHorizontal: 16, marginTop: 6 },
  floatingCard: { width: (width - 48) / 2, borderRadius: 20, padding: 16, alignItems: "center", marginBottom: 12, elevation: 6, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 6 },
  iconCircle: { backgroundColor: "rgba(255,255,255,0.3)", width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  floatingValue: { fontSize: 18, fontWeight: "bold", color: "#fff", marginTop: 8 },
  floatingTitle: { fontSize: 12, color: "#f0f0f0", marginTop: 4 },

  sectionTitle: { fontSize: 16, fontWeight: "bold", marginLeft: 16, marginTop: 20, marginBottom: 12, color: "#0f172a" },
  quickRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", paddingHorizontal: 16 },
  quickCard: { width: (width - 64) / 4, alignItems: "center", marginBottom: 12 },
  quickIconCircle: { width: 48, height: 48, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  quickLabel: { fontSize: 12, fontWeight: "500", marginTop: 6, color: "#1e293b" },

  card: { backgroundColor: "#fff", marginHorizontal: 16, marginTop: 16, padding: 16, borderRadius: 20, elevation: 3, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 12 },

  performanceRow: { flexDirection: "row", alignItems: "center" },
  circleChart: { width: 100, height: 100, justifyContent: "center", alignItems: "center", marginRight: 12 },
  circleGradient: { width: 100, height: 100, borderRadius: 50, justifyContent: "center", alignItems: "center" },
  circleLabel: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  circleSubLabel: { fontSize: 10, color: "#fff", marginTop: 2 },

  legendItem: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
  legendText: { fontSize: 12, color: "#6b7280" },

  // ===== New Event Card Styles =====
  eventCard: { borderRadius: 20, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4 },
  eventCardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  eventCardTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  eventCardBottom: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' },
  eventIconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.3)', marginRight: 12 },
  eventInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  eventInfoText: { color: '#fff', fontSize: 12, marginLeft: 4 },
  eventStatusBadge: { borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginTop: 4 },
  eventStatusText: { fontSize: 10, fontWeight: 'bold' },
  /* ===== Bottom Bar ===== */
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 15,
  },

  bottomItem: { alignItems: "center" },
  bottomLabel: { fontSize: 11, color: "#94a3b8" },
  bottomActive: { fontSize: 11, color: "#6366f1", fontWeight: "600" },

  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    elevation: 10,
  },
  overlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "flex-end",
},

bottomSheet: {
  backgroundColor: "#fff",
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  padding: 20,
  paddingBottom: 40,
  maxHeight: "50%",
  flex: 1,       
},



sheetHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
},

sheetTitle: {
  fontSize: 18,
  fontWeight: "700",
  color: "#0f172a",
},

menuItem: {
  paddingVertical: 14,
  borderBottomWidth: 1,
  borderBottomColor: "#e5e7eb",
},

menuText: {
  fontSize: 16,
  fontWeight: "600",
  color: "#1e293b",
},

/* ===== Sidebar ===== */
sidebarOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  flexDirection: "row",
},

sidebar: {
  width: 260,
  backgroundColor: "#fff",
  paddingTop: 50,
  paddingHorizontal: 20,
  marginTop: 40,
},

sidebarHeader: {
  alignItems: "center",
  marginBottom: 24,
},

sidebarClose: {
  position: "absolute",
  top: 0,
  right: 0,
  padding: 6,
  borderRadius: 20,
  backgroundColor: "#f1f5f9",
},


sidebarAvatar: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#6366f1",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 8,
},

sidebarName: {
  fontSize: 16,
  fontWeight: "700",
  color: "#0f172a",
},

sidebarRole: {
  fontSize: 12,
  color: "#6b7280",
  marginBottom: 16,
},

sidebarItem: {
  flexDirection: "row",
  alignItems: "center",
  gap: 14,
  paddingVertical: 14,
},

sidebarText: {
  fontSize: 15,
  fontWeight: "600",
  color: "#1e293b",
},
subMenu: {
  marginLeft: 34,
  marginTop: 6,
  marginBottom: 8,
  borderLeftWidth: 2,
  borderLeftColor: "#e5e7eb",
  paddingLeft: 12,
},

subMenuItem: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  paddingVertical: 8,
},

subMenuText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#334155",
},

fixedLogout: {
  flexDirection: "row",
  alignItems: "center",
  gap: 14,
  paddingVertical: 16,
  borderTopWidth: 1,
  borderTopColor: "#e5e7eb",
},

fixedLogoutText: {
  fontSize: 15,
  fontWeight: "600",
  color: "#ec1f1f",
},



});