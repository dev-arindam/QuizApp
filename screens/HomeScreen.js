import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  Dimensions
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function HomeScreen({ user, scores, onStartQuiz, onSelectCategory, onOpenAdmin }) {

  // ===== SIDEBAR STATE & ANIMATION =====
  const screenWidth = Dimensions.get("window").width;
  const sidebarX = useRef(new Animated.Value(-screenWidth)).current;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
    Animated.timing(sidebarX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarX, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: true
    }).start(() => setSidebarOpen(false));
  };

  const sidebarMenus = [
    { label: "Home", icon: "home-outline" },
    { label: "Categories", icon: "grid-outline" },
    { label: "Scores", icon: "stats-chart-outline" },
    { label: "Profile", icon: "person-outline" },
    // { label: "Admin", icon: "person-outline" },
    { label: "Logout", icon: "log-out-outline" }
  ];

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.profile}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.name}>{user.fname} {user.lname}</Text>
            <Text style={styles.id}>ID-{user.id}</Text>
          </View>
        </View>

        {/* ===== REPLACE COINBOX ICON WITH THREE-BAR MENU ===== */}
        <TouchableOpacity style={styles.coinBox} onPress={openSidebar}>
          <Ionicons name="menu" size={26} color="#0b3d91" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* BANNER */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Test Your Knowledge with Quizzes</Text>
          <Text style={styles.bannerSub}>Take fun quizzes for skill and learn</Text>

          <TouchableOpacity style={styles.playBtn} onPress={onStartQuiz}>
            <Text style={styles.playText}>Play Now</Text>
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>

        {/* CATEGORIES */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categories}>
          {[{ icon: "html5", label: "HTML", color: "#f16529" },
            { icon: "js", label: "JAVASCRIPT", color: "#f7df1e" },
            { icon: "react", label: "REACT", color: "#61dafb" },
            { icon: "cuttlefish", label: "C++", color: "#00599C" },
            { icon: "python", label: "PYTHON", color: "#306998" }
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => onSelectCategory(item.label)}>
              <FontAwesome5 name={item.icon} size={26} color={item.color} />
              <Text style={styles.categoryText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RECENT ACTIVITY */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {[{ title: "HTML", key: "HTML", color: "#f16529" },
          { title: "JAVASCRIPT", key: "JAVASCRIPT", color: "#f7df1e" },
          { title: "REACT", key: "REACT", color: "#61dafb" },
          { title: "C++", key: "C++", color: "#00599C" },
          { title: "PYTHON", key: "PYTHON", color: "#306998" }
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.activityCard} onPress={() => onSelectCategory(item.title)}>
            <View style={styles.activityLeft}>
              <FontAwesome5
                name={
                  item.key === "HTML" ? "html5" :
                  item.key === "JAVASCRIPT" ? "js" :
                  item.key === "REACT" ? "react" :
                  item.key === "PYTHON" ? "python" :
                  "cuttlefish"
                }
                size={26}
                color={item.color}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activitySub}>30 Question</Text>
              </View>
            </View>

            <View style={[styles.scoreCircle, { borderColor: item.color }]}>
              <Text style={styles.scoreText}>{scores[item.key]}/30</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeSidebar}
        />
      )}

      {/* SIDEBAR */}
     <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarX }], top: 90 }]}>
        {/* CROSS ICON */}
        <TouchableOpacity onPress={closeSidebar} style={{ alignSelf: "flex-end", marginTop: 10 }}>
          <Ionicons name="close" size={26} color="#0b3d91" />
        </TouchableOpacity>

        {/* SIDEBAR TITLE */}
        <Text style={styles.sidebarTitle}>Menu</Text>

        {/* MENU ITEMS */}
        {sidebarMenus.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.sidebarItem}
            onPress={() => {
              if (item.label === "Admin") {
                onOpenAdmin(); 
              }
              closeSidebar(); 
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <Ionicons name={item.icon} size={20} color="#0b3d91" />
              <Text style={styles.sidebarText}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.View>


      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={22} color="#0b3d91" />
        <Ionicons name="grid" size={22} color="#999" />
        <Ionicons name="heart" size={22} color="#999" />
        <Ionicons name="person" size={22} color="#999" />
      </View>

    </View>
  );
}

// ===== ADD THESE SIDEBAR STYLES =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop:40,
    alignItems: "center"
  },
  profile: {
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#ccc",
    marginRight: 10
  },
  name: {
    fontWeight: "bold",
    fontSize: 14
  },
  id: {
    fontSize: 12,
    color: "#777"
  },
  coinBox: {
    flexDirection: "row",
    backgroundColor: "#e9f9ff",
    padding: 6,
    borderRadius: 10,
    alignItems: "center"
  },
  banner: {
    backgroundColor: "#0b3d91",
    margin: 20,
    padding: 20,
    borderRadius: 16
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  bannerSub: {
    color: "#dbe6ff",
    marginVertical: 8,
    fontSize: 12
  },
  playBtn: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8
  },
  playText: {
    color: "#0b3d91",
    fontWeight: "bold"
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    alignItems: "center"
  },
  searchInput: {
    marginLeft: 8,
    flex: 1
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginTop: 20,
    fontWeight: "bold"
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20
  },
  categoryItem: {
    alignItems: "center"
  },
  categoryText: {
    fontSize: 10,
    marginTop: 4
  },
  activityCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 6,
    padding: 14,
    borderRadius: 14,
    alignItems: "center"
  },
  activityLeft: {
    flexDirection: "row",
    alignItems: "center"
  },
  activityTitle: {
    fontWeight: "bold"
  },
  activitySub: {
    fontSize: 11,
    color: "#777"
  },
  scoreCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  scoreText: {
    fontSize: 10,
    fontWeight: "bold"
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff"
  },

  /* ===== SIDEBAR ===== */
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 260,
    backgroundColor: "#fff",
    // paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 10,
    elevation: 10
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20
  },
  sidebarItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd"
  },
  sidebarText: {
    fontSize: 14
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 5
  }
});
