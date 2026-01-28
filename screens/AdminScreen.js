// screens/AdminScreen.js
// screens/AdminScreen.js
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

export default function AdminScreen({ user }) {
  const [activeTab, setActiveTab] = useState("users");

  const users = [
    { id: "1", name: "John Doe", role: "teacher", email: "john@example.com" },
    { id: "2", name: "Jane Smith", role: "student", email: "jane@example.com" },
    { id: "3", name: "Alice Johnson", role: "teacher", email: "alice@example.com" },
  ];

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userRole}>Role: {item.role}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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

        <Ionicons name="menu" size={26} color="#0b3d91" />
      </View>

      {/* CONTENT */}
      {activeTab === "users" && (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderUser}
          contentContainerStyle={styles.listContent}
        />
      )}

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

  coinText: {
    marginLeft: 4,
    fontWeight: "bold"
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
    welcome: {
        fontSize: 16,
        marginBottom: 20
    },
    tabs: {
        flexDirection: "row",
        marginBottom: 20
    },
    tabBtn: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: "#ddd",
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: "center"
    },
    activeTab: {
        backgroundColor: "#0b3d91"
    },
    tabText: {
        color: "#fff",
        fontWeight: "bold"
    },
    tabContent: {
        flex: 1
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },
    statBox: {
        flex: 1,
        backgroundColor: "#0b3d91",
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 5,
        alignItems: "center"
    },
    statNumber: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff"
    },
    statLabel: {
        fontSize: 14,
        color: "#fff",
        marginTop: 5
    },
    userCard: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc"
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold"
    },
    userRole: {
        fontSize: 14,
        color: "#555",
        marginTop: 3
    },
    userEmail: {
        fontSize: 14,
        color: "#555",
        marginBottom: 10
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    editBtn: {
        backgroundColor: "#0b3d91",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginRight: 10
    },
    deleteBtn: {
        backgroundColor: "#d9534f",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5
    },
    btnText: {
        color: "#fff",
        fontWeight: "bold"
    },
    bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff"
  }
});
