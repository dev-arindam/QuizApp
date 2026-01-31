import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function StudentProfileScreen({ user, onBack }) {
  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <LinearGradient colors={["#3b82f6", "#7c3aed"]} style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.iconLeft}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Profile</Text>
        <TouchableOpacity style={styles.iconRight}>
          <Ionicons name="settings-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>

        {/* AVATAR */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.fname || "Puja"} {user?.lname || "Sen"}</Text>
          <Text style={styles.grade}>MCA • 3rd Year</Text>
        </View>

        {/* INFO CARD */}
        <GlassCard>
          <InfoRow icon="badge" label="Enrollment No" value={`ENR-${user?.id || 2025}`} />
          <InfoRow icon="email" label="College Email" value="student@university.edu" />
          <InfoRow icon="phone" label="Phone" value="+91 98765 43210" />
          <InfoRow icon="school" label="University" value="National Institute of Technology" />
          <InfoRow icon="menu-book" label="Department" value="Computer Science & Engineering" />
          <InfoRow icon="date-range" label="Year" value="3rd Year" />
        </GlassCard>

        {/* SUBJECTS */}
        <SectionTitle title="Current Subjects" />
        <GlassCard>
          <InfoRow icon="menu-book" label="Data Structures" value="A Grade" />
          <InfoRow icon="menu-book" label="Operating Systems" value="B+" />
          <InfoRow icon="menu-book" label="Database Systems" value="A" />
          <InfoRow icon="menu-book" label="Computer Networks" value="A-" />
        </GlassCard>

        {/* QUIZ PERFORMANCE */}
        <SectionTitle title="Quiz Performance" />
        <StatRow>
          <StatBox label="Quizzes" value="12" colors={["#ff9966", "#ff5e62"]} />
          <StatBox label="Average" value="82%" colors={["#36d1dc", "#5b86e5"]} />
          <StatBox label="Rank" value="#5" colors={["#f7971e", "#ffd200"]} />
        </StatRow>

        {/* ACADEMIC */}
        <SectionTitle title="Academic Overview" />
        <StatRow>
          <StatBox label="CGPA" value="8.2" colors={["#56ab2f", "#a8e063"]} />
          <StatBox label="Credits" value="86" colors={["#2193b0", "#6dd5ed"]} />
          <StatBox label="Semester" value="6th" colors={["#cc2b5e", "#753a88"]} />
        </StatRow>

        {/* ATTENDANCE */}
        <SectionTitle title="Attendance" />
        <StatRow>
          <StatBox label="Overall" value="91%" colors={["#834d9b", "#d04ed6"]} />
          <StatBox label="This Month" value="88%" colors={["#1e3c72", "#2a5298"]} />
          <StatBox label="Leaves" value="3" colors={["#ff416c", "#ff4b2b"]} />
        </StatRow>

        {/* ACHIEVEMENTS */}
        <SectionTitle title="Achievements" />
        <GlassCard>
          <InfoRow icon="emoji-events" label="Hackathon Winner" value="2025" />
          <InfoRow icon="star" label="Merit Scholarship" value="2 Years" />
        </GlassCard>

        {/* FEES */}
        <SectionTitle title="Fee Status" />
        <GlassCard>
          <InfoRow icon="payments" label="Tuition Fee" value="Paid" />
          <InfoRow icon="account-balance-wallet" label="Scholarship" value="₹ 25,000" />
          <InfoRow icon="event" label="Next Due Date" value="15 March 2026" />
        </GlassCard>

        {/* QUICK ACTIONS */}
        <SectionTitle title="Quick Actions" />
        <View style={styles.actionsRow}>
          <ActionBtn icon="edit" label="Edit Profile" />
          <ActionBtn icon="lock" label="Password" />
          <ActionBtn icon="logout" label="Logout" />
        </View>

      </ScrollView>
    </View>
  );
}

/* COMPONENTS */

const GlassCard = ({ children }) => (
  <View style={styles.card}>{children}</View>
);

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <MaterialIcons name={icon} size={20} color="#4f46e5" />
    <View style={{ marginLeft: 12 }}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const StatRow = ({ children }) => (
  <View style={styles.statsRow}>{children}</View>
);

const StatBox = ({ label, value, colors }) => (
  <LinearGradient colors={colors} style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </LinearGradient>
);

const ActionBtn = ({ icon, label }) => (
  <TouchableOpacity style={styles.actionBtn}>
    <MaterialIcons name={icon} size={22} color="#fff" />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);

const SectionTitle = ({ title }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

/* STYLES */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef2ff" },

  header: {
    paddingTop: 60,
    paddingBottom:30,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: "center"
  },

  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  iconLeft: { position: "absolute", left: 20, top: 60 },
  iconRight: { position: "absolute", right: 20, top: 60 },

  avatarWrapper: { alignItems: "center", marginTop: -70 },
  avatar: {
    width: 140,
    height: 140,
    marginTop:90,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: "#fff"
  },

  name: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  grade: { color: "#555", marginTop: 4 },

  sectionTitle: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 22,
    color: "#3730a3"
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    marginHorizontal: 18,
    marginTop: 12,
    borderRadius: 20,
    padding: 18,
    elevation: 6
  },

  infoRow: { flexDirection: "row", marginBottom: 12 },
  infoLabel: { color: "#777", fontSize: 12 },
  infoValue: { fontSize: 15, fontWeight: "bold" },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 14
  },

  statBox: {
    width: 100,
    paddingVertical: 20,
    borderRadius: 18,
    alignItems: "center"
  },

  statValue: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  statLabel: { color: "#fff", fontSize: 12, marginTop: 4 },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20
  },

  actionBtn: {
    backgroundColor: "#4f46e5",
    width: 100,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    elevation: 5
  },

  actionText: { color: "#fff", fontSize: 12, marginTop: 6 }
});