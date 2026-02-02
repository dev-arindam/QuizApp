import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function FunnyNoticeBoard() {
  const { width } = Dimensions.get("window");

  const initialNotices = [
    { id: 1, title: "📝 Midterm Madness!", date: "Feb 5, 2026", description: "Exams start soon! Stay calm ☕️", category: "Academic", isNew: true, emoji: "🧠" },
    { id: 2, title: "📚 Library Lockdown", date: "Feb 3, 2026", description: "Library closed 😢", category: "General", isNew: false, emoji: "📖" },
    { id: 3, title: "🤖 AI Guest Lecture", date: "Jan 30, 2026", description: "Robots takeover 🤯", category: "Academic", isNew: true, emoji: "🤖" },
    { id: 4, title: "🏆 Sports Extravaganza", date: "Jan 28, 2026", description: "Games & fun 🏃‍♂️💨", category: "Sports", isNew: false, emoji: "🏅" },
    { id: 5, title: "🎨 Art Contest", date: "Feb 6, 2026", description: "Show your talent 🖌️", category: "General", isNew: true, emoji: "🎨" },
    { id: 6, title: "🍕 Pizza Party", date: "Feb 7, 2026", description: "Free pizza 🍕", category: "General", isNew: false, emoji: "🍕" },
    { id: 7, title: "💡 Hackathon", date: "Feb 8, 2026", description: "Code & innovate 💻", category: "Academic", isNew: true, emoji: "💡" },
    { id: 8, title: "🏀 Basketball Finals", date: "Feb 9, 2026", description: "Cheer your team 🏀", category: "Sports", isNew: true, emoji: "🏀" },
    { id: 9, title: "🎶 Music Night", date: "Feb 10, 2026", description: "Sing & dance 🎤", category: "General", isNew: false, emoji: "🎶" },
    { id: 10, title: "🛹 Skateboarding Event", date: "Feb 11, 2026", description: "Show off tricks 🛹", category: "Sports", isNew: true, emoji: "🛹" },
  ];

  const [notices, setNotices] = useState(initialNotices);

  // Animated values
  const animValues = useRef(initialNotices.map(() => new Animated.Value(0))).current;
  const bounceValues = useRef(initialNotices.map(() => new Animated.Value(0))).current;
  const rotateValues = useRef(initialNotices.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Entrance animation
    Animated.stagger(
      100,
      animValues.map(anim => Animated.spring(anim, { toValue: 1, friction: 5, tension: 50, useNativeDriver: true }))
    ).start();

    // Animate only NEW notices
    notices.forEach((notice, index) => {
      if (notice.isNew) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(bounceValues[index], { toValue: -5, duration: 300, useNativeDriver: true }),
            Animated.timing(bounceValues[index], { toValue: 5, duration: 300, useNativeDriver: true }),
          ])
        ).start();

        Animated.loop(
          Animated.sequence([
            Animated.timing(rotateValues[index], { toValue: 3, duration: 600, useNativeDriver: true }),
            Animated.timing(rotateValues[index], { toValue: -3, duration: 600, useNativeDriver: true }),
          ])
        ).start();
      }
    });
  }, []);

  const handleNoticeClick = (id) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, isNew: false } : n));
  };

  const sortedNotices = [...notices].sort((a, b) => b.isNew - a.isNew);

  // Dark theme colors
  const gradientColors = {
    New: ["#7c3aed","#4f46e5"], // Neon blue for new notices
    Read: ["#222222", "#444444"], // Dark gray for read notices
  };

  const shadowColors = {
    New: "#7c3aed",
    Read: "#666666",
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🎉 FUNNY NOTICEBOARD 🎉</Text>

      {sortedNotices.map((notice, index) => {
        const colors = notice.isNew ? gradientColors.New : gradientColors.Read;
        const borderColor = notice.isNew ? shadowColors.New : shadowColors.Read;

        return (
          <Animated.View
            key={notice.id}
            style={{
              transform: [
                { scale: animValues[index] },
                { translateY: notice.isNew ? bounceValues[index] : 0 },
                {
                  rotate: notice.isNew
                    ? rotateValues[index].interpolate({ inputRange: [-3, 3], outputRange: ["-3deg", "3deg"] })
                    : "0deg",
                },
              ],
            }}
          >
            <TouchableOpacity activeOpacity={0.9} onPress={() => handleNoticeClick(notice.id)}>
              <LinearGradient
                colors={colors}
                style={[
                  styles.noticeCard,
                  { borderColor: borderColor, borderWidth: 2 }
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.noticeTitle}>
                    {notice.title} {notice.emoji}
                  </Text>
                  {notice.isNew && <Text style={styles.newBadge}>✨NEW✨</Text>}
                </View>
                <Text style={styles.noticeDate}>{notice.date}</Text>
                <Text style={styles.noticeDesc}>{notice.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 10 },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00ffff", // Neon cyan for dark theme
    marginBottom: 15,
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  noticeCard: {
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  noticeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  newBadge: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#00ffff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    shadowColor: "#00ffff",
    shadowOpacity: 0.8,
    shadowRadius: 4,
    textShadowColor: "#000",
  },
  noticeDate: { fontSize: 11, color: "#fff", fontWeight: "600", marginBottom: 4 },
  noticeDesc: { fontSize: 13, color: "#fff" },
});
