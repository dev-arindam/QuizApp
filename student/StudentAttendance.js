import React, { useMemo } from "react";
import { View, Text, StyleSheet, SafeAreaView,TouchableOpacity} from "react-native";
import { Calendar } from "react-native-calendars";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
const attendanceData = {
  "2026-01-02": "present",
  "2026-01-03": "absent",
  "2026-01-05": "holiday",
  "2026-01-06": "present",
  "2026-01-08": "present",
};

export default function StudentAttendanceScreen({onBack}) {

  const markedDates = useMemo(() => {
    let marked = {};
    Object.keys(attendanceData).forEach(date => {
      let color = "#9E9E9E";
      if (attendanceData[date] === "present") color = "#4CAF50";
      if (attendanceData[date] === "absent") color = "#F44336";

      marked[date] = {
        customStyles: {
          container: {
            backgroundColor: color,
            borderRadius: 10,
          },
          text: {
            color: "#fff",
            fontWeight: "bold",
          },
        },
      };
    });
    return marked;
  }, []);

  const percentage = useMemo(() => {
    const total = Object.keys(attendanceData).length;
    const present = Object.values(attendanceData).filter(
      v => v === "present"
    ).length;
    return total ? Math.round((present / total) * 100) : 0;
  }, []);

  return (

    <SafeAreaView style={styles.container}>
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
        
                    {/* HEADER */}
                    <LinearGradient colors={["#2f49b6", "#6a11cb"]} style={styles.header}>
                        <TouchableOpacity onPress={onBack} style={styles.iconLeft}>
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Student Attendance</Text>
                        <TouchableOpacity style={styles.iconRight}>
                            <Ionicons name="settings-outline" size={22} color="#fff" />
                        </TouchableOpacity>
                    </LinearGradient>

      <View style={styles.card}>
        <Calendar
          markingType={"custom"}
          markedDates={markedDates}
          theme={{
            calendarBackground: "#fff",
            todayTextColor: "#6200EE",
            arrowColor: "#6200EE",
            monthTextColor: "#333",
            textDayFontWeight: "500",
            textMonthFontWeight: "700",
            textDayHeaderFontWeight: "600",
          }}
        />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.percentText}>{percentage}%</Text>
        <Text style={styles.subtitle}>Attendance</Text>

        <View style={styles.legend}>
          <Legend color="#4CAF50" label="Present" />
          <Legend color="#F44336" label="Absent" />
          <Legend color="#9E9E9E" label="Holiday" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const Legend = ({ color, label }) => (
  <View style={styles.legendItem}>
    <View style={[styles.dot, { backgroundColor: color }]} />
    <Text style={styles.legendText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    // padding: 16,
  },
  header: {
        paddingTop: 55,
        paddingBottom: 25,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        alignItems: "center"
    },
    headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
    iconLeft: { position: "absolute", left: 20, top: 55 },
    iconRight: { position: "absolute", right: 20, top: 55 },
  
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    marginTop:15,
    marginHorizontal:16,
    elevation: 5,
  },
  summaryCard: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    marginHorizontal:16,
  },
  percentText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#6200EE",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
  },
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
    }
});