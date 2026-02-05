import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";

export default function app() {
  const [tab, setTab] = useState("Teacher");

  const PersonCard = ({ name, dept, rating, avatar }) => (
    <View style={styles.card}>
      <Image source={{ uri: avatar }} style={styles.avatar} />

      <View style={{ flex: 1 }}>
        <Text style={styles.cardName}>{name}</Text>
        <Text style={styles.cardDept}>{dept}</Text>

        <View style={styles.ratingRow}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${rating * 20}%` }]} />
          </View>
          <Text style={styles.ratingText}>{rating}/5 • Excellent</Text>
        </View>
      </View>

      <Icon name="more-vertical" size={18} color="#888" />
    </View>
  );

  const Bubble = ({ text, left }) => (
    <View style={[styles.bubble, left ? styles.left : styles.right]}>
      <Text style={styles.bubbleText}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={["#2F80ED", "#56CCF2"]}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <Icon name="arrow-left" size={22} color="#fff" />
          <Text style={styles.headerTitle}>Performance Records</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* SEGMENT CONTROL */}
        <View style={styles.segment}>
          {["Teacher", "Student"].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={[
                styles.segmentBtn,
                tab === t && styles.segmentActive,
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  tab === t && { color: "#2F80ED" },
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        <PersonCard
          name="Amay Harly"
          dept="Computer Department"
          rating={4.8}
          avatar="https://i.pravatar.cc/150?img=11"
        />

        <PersonCard
          name="Aulam Learon"
          dept="Science Department"
          rating={4.6}
          avatar="https://i.pravatar.cc/150?img=32"
        />

        <Text style={styles.sectionTitle}>Recent Feedback</Text>

        <Bubble
          left
          text="I am impressed about the students for pool and health activities."
        />
        <Bubble
          text="Students think my part was very helpful and engaging."
        />
      </ScrollView>

      {/* FLOATING BUTTON */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="menu" size={22} color="#fff" />
      </TouchableOpacity>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <Icon name="home" size={22} color="#888" />
        <Icon name="message-circle" size={22} color="#2F80ED" />
        <Icon name="bell" size={22} color="#888" />
        <Icon name="settings" size={22} color="#888" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F5F9" },

  header: {
    paddingTop: 55,
    paddingBottom: 22,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  segment: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 25,
    marginTop: 14,
    padding: 4,
  },

  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },

  segmentActive: {
    backgroundColor: "#fff",
  },

  segmentText: {
    color: "#fff",
    fontWeight: "600",
  },

  content: {
    padding: 16,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 14,
    borderRadius: 16,
    marginBottom: 14,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },

  cardName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
  },

  cardDept: {
    fontSize: 12,
    color: "#777",
    marginBottom: 6,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  progressTrack: {
    height: 6,
    width: 120,
    backgroundColor: "#E6ECF5",
    borderRadius: 6,
    overflow: "hidden",
    marginRight: 8,
  },

  progressFill: {
    height: 6,
    backgroundColor: "#27AE60",
  },

  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#444",
  },

  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },

  bubble: {
    padding: 12,
    borderRadius: 14,
    maxWidth: "82%",
    marginBottom: 10,
  },

  left: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },

  right: {
    backgroundColor: "#DCEBFF",
    alignSelf: "flex-end",
  },

  bubbleText: {
    fontSize: 14,
    color: "#333",
  },

  fab: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    backgroundColor: "#2F80ED",
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 10,
  },
});