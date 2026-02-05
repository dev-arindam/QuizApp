import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AdminLeaveApprovalScreen() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      dept: "CSE",
      reason: "Medical Leave",
      date: "5 Feb - 8 Feb",
      status: "Pending",
    },
    {
      id: 2,
      name: "Anita Roy",
      dept: "ECE",
      reason: "Family Function",
      date: "10 Feb - 12 Feb",
      status: "Pending",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setRequests(req =>
      req.map(r => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Leave Approval Requests</Text>

      {requests.map(item => (
        <View key={item.id} style={styles.card}>
          {/* PROFILE */}
          <View style={styles.headerRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.dept}>{item.dept} Department</Text>
            </View>

            <View style={[styles.statusBadge, item.status === "Approved" && styles.approved, item.status === "Rejected" && styles.rejected]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>

          {/* DETAILS */}
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={18} color="#555" />
            <Text style={styles.infoText}>{item.date}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="document-text-outline" size={18} color="#555" />
            <Text style={styles.infoText}>{item.reason}</Text>
          </View>

          {/* ACTION BUTTONS */}
          {item.status === "Pending" && (
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.approveBtn}
                onPress={() => updateStatus(item.id, "Approved")}
              >
                <Ionicons name="checkmark" size={18} color="#fff" />
                <Text style={styles.btnText}>Approve</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.rejectBtn}
                onPress={() => updateStatus(item.id, "Rejected")}
              >
                <Ionicons name="close" size={18} color="#fff" />
                <Text style={styles.btnText}>Reject</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef2f7", padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    elevation: 5,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#4b7bec",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: { color: "#fff", fontWeight: "bold", fontSize: 18 },

  name: { fontSize: 16, fontWeight: "bold" },
  dept: { fontSize: 12, color: "#777" },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#ff9800",
  },
  approved: { backgroundColor: "#4caf50" },
  rejected: { backgroundColor: "#f44336" },
  statusText: { color: "#fff", fontSize: 12 },

  infoRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  infoText: { marginLeft: 6, color: "#555" },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  approveBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 6,
    justifyContent: "center",
  },

  rejectBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 6,
    justifyContent: "center",
  },

  btnText: { color: "#fff", marginLeft: 6, fontWeight: "bold" },
});