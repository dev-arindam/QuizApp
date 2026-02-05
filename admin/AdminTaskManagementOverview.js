import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TaskOverviewPage() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ================= HERO ================= */}
      <View style={styles.hero}>
        <Text style={styles.heroSub}>TASK MANAGEMENT</Text>
        <Text style={styles.heroTitle}>Overview</Text>
        <Text style={styles.heroDesc}>
          Track progress, workload & performance in one place
        </Text>

        <View style={styles.heroStats}>
          <HeroStat icon="clipboard-outline" value="248" label="Total Tasks" />
          <HeroStat icon="checkmark-done-outline" value="180" label="Completed" />
          <HeroStat icon="time-outline" value="68" label="Pending" />
        </View>
      </View>

      {/* ================= KPI ================= */}
      <View style={styles.kpiRow}>
        <KpiCard
          icon="trending-up-outline"
          label="Completion Rate"
          value="72%"
          color="#6366f1"
        />
        <KpiCard
          icon="people-outline"
          label="Staff Involved"
          value="38"
          color="#22c55e"
        />
        <KpiCard
          icon="calendar-outline"
          label="Due This Week"
          value="24"
          color="#f59e0b"
        />
      </View>

      {/* ================= PROGRESS ================= */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Task Progress</Text>

        <ProgressRow label="Completed Tasks" percent="72%" width="72%" />
        <ProgressRow label="In Progress" percent="18%" width="18%" />
        <ProgressRow label="Overdue Tasks" percent="10%" width="10%" />
      </View>

      {/* ================= STATUS CARDS ================= */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Task Status</Text>

        <View style={styles.statusGrid}>
          <StatusCard
            icon="checkmark-circle-outline"
            label="Completed"
            value="180"
            color="#22c55e"
          />
          <StatusCard
            icon="sync-outline"
            label="In Progress"
            value="45"
            color="#6366f1"
          />
          <StatusCard
            icon="alert-circle-outline"
            label="Overdue"
            value="23"
            color="#ef4444"
          />
        </View>
      </View>

      {/* ================= RECENT ACTIVITY ================= */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>

        <Activity
          text="Task assigned to CSE Department"
          time="10 mins ago"
        />
        <Activity
          text="Faculty completed syllabus review task"
          time="1 hour ago"
        />
        <Activity
          text="New task created for ECE department"
          time="Yesterday"
        />
      </View>

    </ScrollView>
  );
}

/* ================= COMPONENTS ================= */

const HeroStat = ({ icon, value, label }) => (
  <View style={styles.heroStat}>
    <Ionicons name={icon} size={22} color="#fff" />
    <Text style={styles.heroValue}>{value}</Text>
    <Text style={styles.heroLabel}>{label}</Text>
  </View>
);

const KpiCard = ({ icon, value, label, color }) => (
  <View style={[styles.kpiCard, { backgroundColor: color }]}>
    <Ionicons name={icon} size={26} color="#fff" />
    <Text style={styles.kpiValue}>{value}</Text>
    <Text style={styles.kpiLabel}>{label}</Text>
  </View>
);

const ProgressRow = ({ label, percent, width }) => (
  <View style={{ marginBottom: 14 }}>
    <View style={styles.progressHeader}>
      <Text style={styles.progressLabel}>{label}</Text>
      <Text style={styles.progressPercent}>{percent}</Text>
    </View>
    <View style={styles.progressBg}>
      <View style={[styles.progressFill, { width }]} />
    </View>
  </View>
);

const StatusCard = ({ icon, label, value, color }) => (
  <View style={styles.statusCard}>
    <Ionicons name={icon} size={28} color={color} />
    <Text style={styles.statusValue}>{value}</Text>
    <Text style={styles.statusLabel}>{label}</Text>
  </View>
);

const Activity = ({ text, time }) => (
  <View style={styles.activityRow}>
    <Ionicons name="checkmark-circle-outline" size={18} color="#22c55e" />
    <Text style={styles.activityText}>{text}</Text>
    <Text style={styles.activityTime}>{time}</Text>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* HERO */
  hero: {
    backgroundColor: "",
    padding: 26,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  heroSub: {
    color: "#0b3d91",
    fontSize: 12,
    letterSpacing: 2,
  },

  heroTitle: {
    color: "#0b3d91",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },

  heroDesc: {
    color: "#0b3d91",
    fontSize: 13,
    marginTop: 6,
  },

  heroStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },

  heroStat: { alignItems: "center" },

  heroValue: {
    color: "#0b3d91",
    fontWeight: "bold",
    marginTop: 6,
  },

  heroLabel: {
    color: "#0b3d91",
    fontSize: 12,
  },

  /* KPI */
  kpiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: -22,
  },

  kpiCard: {
    width: "30%",
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: "center",
    elevation: 8,
  },

  kpiValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 6,
  },

  kpiLabel: {
    color: "#e0e7ff",
    fontSize: 12,
  },

  /* SECTION */
  section: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 12,
  },

  /* PROGRESS */
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  progressLabel: {
    fontWeight: "600",
    color: "#334155",
  },

  progressPercent: {
    fontWeight: "bold",
    color: "#0b3d91",
  },

  progressBg: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    marginTop: 6,
  },

  progressFill: {
    height: 8,
    backgroundColor: "#6366f1",
    borderRadius: 10,
  },

  /* STATUS */
  statusGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statusCard: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: "center",
    elevation: 5,
  },

  statusValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 6,
    color: "#0f172a",
  },

  statusLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },

  /* ACTIVITY */
  activityRow: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    elevation: 3,
  },

  activityText: {
    flex: 1,
    marginLeft: 10,
    fontWeight: "600",
    color: "#334155",
  },

  activityTime: {
    fontSize: 12,
    color: "#94a3b8",
  },
});