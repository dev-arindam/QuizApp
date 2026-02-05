import React, { useRef, useEffect, useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Dimensions, FlatList, Animated, Image, Easing
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import StudentFab from "../components/studentFab";

const { width } = Dimensions.get("window");
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from "react-native-svg";

/* ================= MULTI-COLOR PROGRESS CIRCLE ================= */
const MultiColorProgress = ({ size = 80, strokeWidth = 8, progress = 75, subject }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={size} height={size}>
        <Defs>
          <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#8b5cf6" />
            <Stop offset="50%" stopColor="#22d3ee" />
            <Stop offset="100%" stopColor="#facc15" />
          </SvgLinearGradient>
        </Defs>

        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={strokeWidth}
        />

        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>

      {/* Center Text */}
      <View style={[StyleSheet.absoluteFillObject, { justifyContent: "center", alignItems: "center" ,}]}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>{progress}%</Text>
      </View>

      {/* Subject Name */}
      {subject && <Text style={{ marginTop: 8, fontWeight: "600", color: "#fff" }}>{subject}</Text>}
    </View>
  );
};
/* ================= kpi card ================= */

const KpiCard = ({ icon, value, label, colors,onPress }) => (
  <LinearGradient
    colors={colors}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.kpiCard}
  >
    <View style={styles.kpiIconWrap}>
      <Ionicons name={icon} size={20} color="#fff" />
    </View>

    <Text style={styles.kpiValue}>{value}</Text>
    <Text style={styles.kpiLabel}>{label}</Text>
  </LinearGradient>
);


/* ================= ROTATING AVATAR ================= */

const RotatingAvatar = () => {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 4500,
        easing: Easing.linear,
        useNativeDriver: false, // <- change here
      })
    ).start();
  }, []);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.avatarOuter}>
      <Animated.View style={[styles.ring, { transform: [{ rotate }] }]}>
        <LinearGradient
          colors={["#8b5cf6", "#22d3ee", "#8b5cf6"]}
          style={styles.ringGradient}
        />
      </Animated.View>

      <Image
        source={{ uri: "https://s1.dmcdn.net/u/B0lsg1dzxtqSvSrIj/240x240" }}
        style={styles.avatarImage}
      />
    </View>
  );
};

/* ================= MAIN SCREEN ================= */

export default function StudentDashboardMerged({ setScreen, user }) {


  // fab start 
    <StudentFab setScreen={setScreen} />
// end fab 


  const sliderData = [
    { id: "1", subject: "Data Structures", date: "Thu 11:00 AM" },
    { id: "2", subject: "OS", date: "Fri 9:30 AM" },
    { id: "3", subject: "DBMS", date: "Mon 10:15 AM" }
  ];

  const flatRef = useRef();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      const next = (index + 1) % sliderData.length;
      flatRef.current?.scrollToIndex({ index: next, animated: true });
      setIndex(next);
    }, 3000);
    return () => clearInterval(t);
  }, [index]);


  /* ===== Subjects Progress Data ===== */
  const subjects = [
    { name: "Machine Learning", progress: 85 },
    { name: "Software", progress: 70 },
    { name: "NLP", progress: 65 },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#020617" }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ===== HERO ===== */}

        <LinearGradient
          colors={["#0f172a", "#1e293b", "#312e81"]}
          style={styles.herocard}
        >

          <View style={styles.headerRow}>
            <Text style={styles.logo}>{user?.fname} {user?.lname}</Text>



          </View>

          <View style={styles.bodyRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heading}>
                You can start your{"\n"}test here
              </Text>

              <Text style={styles.sub}>
                Create your own Test, keep{"\n"}
                practicing & stay on top{"\n"}
                for your next exam
              </Text>
            </View>

            <RotatingAvatar />
          </View>

          <View style={styles.topBlob} />
          <View style={styles.leftBlob} />
          <View style={styles.bottomCurve} />

        </LinearGradient>

        {/* ===== KPI ===== */}

<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  style={{ marginTop: 14 }}
  contentContainerStyle={{ paddingHorizontal: 12 }}
>
  <KpiCard icon="calendar-outline" value="92%" label="Attendance" colors={["#6366f1","#8b5cf6"]} />
  <TouchableOpacity onPress={() => setScreen("notice")}>
  <KpiCard icon="megaphone-outline" value="10" label="Notice" colors={["#ef4444", "#fb7185"]} />
</TouchableOpacity>

  <KpiCard icon="clipboard-outline" value="4" label="Assignments" colors={["#06b6d4","#22d3ee"]} />
  <KpiCard icon="create-outline" value="7" label="Quiz" colors={["#f59e0b","#facc15"]} />
  <KpiCard icon="card-outline" value="₹12K" label="Fees" colors={["#10b981","#34d399"]} />
</ScrollView>


        {/* ===== SLIDER ===== */}

        <FlatList
          ref={flatRef}
          data={sliderData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <LinearGradient colors={["#1e293b", "#0f172a"]} style={[styles.classCard, { width: width - 30 }]}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#94a3b8" }}>Next Class</Text>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>{item.subject}</Text>
                <Text style={{ color: "#c7d2fe" }}>{item.date}</Text>
              </View>

              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png" }}
                style={{ width: 90, height: 90 }}
              />
            </LinearGradient>
          )}
        />

        {/* <View style={styles.progressCard}>
  <Text style={{ color: "#fff", fontWeight: "700" }}>Today's Goal</Text>
  <View style={styles.progressCircle}>
    <Text style={styles.progressText}>75%</Text>
  </View>
</View> */}

        {/* ===== SUBJECTS PROGRESS ===== */}
        <View style={{ margin: 15 }}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
            Subjects Progress
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-around", marginVertical: 20 }}>
            {subjects.map((s) => (
              <MultiColorProgress key={s.name} progress={s.progress} subject={s.name} />
            ))}
          </View>
        </View>

        {/* ===== CHART ===== */}

        <Text style={styles.section}>Performance Trend</Text>

        <LineChart
          data={{
            labels: ["W1", "W2", "W3", "W4", "W5"],
            datasets: [{ data: [70, 78, 75, 88, 92] }]
          }}
          width={width - 30}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#020617",
            backgroundGradientTo: "#020617",
            color: (o = 1) => `rgba(139,92,246,${o})`,
            labelColor: () => "#94a3b8"
          }}
          style={{ borderRadius: 20, alignSelf: "center" }}
        />

        {/* ===== CONTROL GRID ===== */}

        <Text style={styles.section}>Control Panel</Text>

        <View style={styles.grid}>
          <Tile icon="book" title="Subjects" onPress={() => setScreen("subject")}/>
          <Tile icon="clipboard" title="Assignments" onPress={() => setScreen("assignment")}/>
          <Tile icon="card" title="Fees" onPress={() => setScreen("fees")}/>
          <Tile icon="stats-chart" title="Results" onPress={() => setScreen("semesterResult")}/>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

{/* ===== FAB MENU BUTTONS ===== */}
    <StudentFab setScreen={setScreen} />


    </View>
  );
}

/* ================= SMALL COMPONENTS ================= */

const Stat = ({ icon, value, label }) => (
  <View style={styles.stat}>
    <Ionicons name={icon} size={22} color="#8b5cf6" />
    <Text style={styles.statV}>{value}</Text>
    <Text style={styles.statL}>{label}</Text>
  </View>
);

const Tile = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.tile} onPress={onPress}>
    <Ionicons name={icon} size={26} color="#a78bfa" />
    <Text style={{ color: "#fff", fontWeight: "700", marginTop: 8 }}>{title}</Text>
  </TouchableOpacity>
);


/* ================= STYLES ================= */

const styles = StyleSheet.create({

  /* ================= NEW STYLES + IMPROVEMENTS ================= */

  // Hero Card
  herocard: {
    borderRadius: 28,
    padding: 18,
    paddingTop: 40,
    overflow: "hidden",
  },

  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },

  logo: { fontWeight: "700", fontSize: 20, color: "#fff" },

  bodyRow: { flexDirection: "row", alignItems: "center" },

  heading: { fontSize: 16, fontWeight: "800", color: "#c7d2fe", lineHeight: 22 },

  sub: { marginTop: 8, fontSize: 12, color: "#c7d2fe", lineHeight: 18 },

  // Rotating Avatar
  avatarOuter: { width: 140, height: 140, borderRadius: 70, justifyContent: "center", alignItems: "center", zIndex: 2 },

  ring: { position: "absolute", width: 140, height: 140, borderRadius: 70 },

  ringGradient: { flex: 1, borderRadius: 70 },

  avatarImage: { width: 110, height: 110, borderRadius: 55, backgroundColor: "#fff", padding: 6, elevation: 8 },


  topBlob: { position: "absolute", top: -20, right: -10, width: 120, height: 80, borderRadius: 40, backgroundColor: "rgba(255,255,255,0.25)", transform: [{ rotate: "25deg" }] },

  leftBlob: { position: "absolute", top: -15, left: -15, width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(255,255,255,0.25)" },

  bottomCurve: { position: "absolute", left: -50, bottom: -60, width: 240, height: 140, borderRadius: 120, backgroundColor: "rgba(255,255,255,0.15)" },

  section: { color: "#e5e7eb", fontSize: 18, fontWeight: "bold", margin: 15 },

  stat: { width: 140, marginLeft: 15, marginTop: 10, padding: 16, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.06)" },

  statV: { color: "#fff", fontSize: 18, fontWeight: "bold", marginTop: 6 },

  statL: { color: "#c7d2fe", fontSize: 12 },

  classCard: { margin: 15, padding: 18, borderRadius: 22, flexDirection: "row", alignItems: "center" },

  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", padding: 15 },

  tile: { width: "48%", backgroundColor: "#111827", borderRadius: 20, padding: 18, marginBottom: 14 },

  fab: { position: "absolute", right: 20, bottom: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: "#8b5cf6", justifyContent: "center", alignItems: "center" },

  fabExtra: {
  position: "absolute",
  right: 20,
  bottom: 20,
  transformOrigin: "bottom",
},


  fabSmall: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#8b5cf6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },

  // New progress card
  progressCard: {
    margin: 15,
    borderRadius: 20,
    padding: 18,
    backgroundColor: "rgba(139,92,246,0.15)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  progressCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 6,
    borderColor: "#8b5cf6",
    justifyContent: "center",
    alignItems: "center",
  },

  progressText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  notificationCard: {
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "linear-gradient(45deg, #8b5cf6, #22d3ee)",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  // kpi cart 
  kpiCard: {
  width: 140,
  marginRight: 14,
  padding: 16,
  borderRadius: 22,
  shadowColor: "#000",
  shadowOpacity: 0.35,
  shadowRadius: 10,
  elevation: 8,
},

kpiIconWrap: {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "rgba(255,255,255,0.25)",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 10,
},

kpiValue: {
  color: "#fff",
  fontSize: 22,
  fontWeight: "800",
},

kpiLabel: {
  color: "rgba(255,255,255,0.85)",
  fontSize: 13,
  marginTop: 4,
},

});