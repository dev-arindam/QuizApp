
 import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
   Modal,   
  TextInput,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function AdminDepartmentScreen() {
  const [departments, setDepartments] = useState([
    { id: "1", name: "Computer Science", code: "CSE" },
    { id: "2", name: "Electronics", code: "ECE" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    code: "",
  });
  const [menuOpenId, setMenuOpenId] = useState(null);

  const addDepartment = () => {
    if (!newDepartment.name || !newDepartment.code) return;
    setDepartments([
      ...departments,
      { id: Date.now().toString(), ...newDepartment },
    ]);
    setNewDepartment({ name: "", code: "" });
    setModalVisible(false);
  };

  const deleteDepartment = (id) => {
    setDepartments(departments.filter((d) => d.id !== id));
  };

  return (
    <ScrollView style={{ backgroundColor: "#f2f5fa", flex: 1 }}>
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 20,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#0b3d91" }}>
          Departments
        </Text>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#0b3d91",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={{ color: "#fff", marginLeft: 6, fontWeight: "bold" }}>
            Add
          </Text>
        </TouchableOpacity>
      </View>

      {/* DEPARTMENT LIST */}
      {departments.map((dept) => (
        <View
          key={dept.id}
          style={{
            backgroundColor: "#fff",
            marginHorizontal: 20,
            marginBottom: 14,
            padding: 16,
            borderRadius: 18,
            elevation: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeftWidth: 4,
            borderLeftColor: "#0b3d91",
          }}
        >
          {/* LEFT */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: "#e9f3ff",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
              }}
            >
              <Ionicons name="business" size={22} color="#0b3d91" />
            </View>

            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {dept.name}
              </Text>
              <Text style={{ fontSize: 12, color: "#777", marginTop: 3 }}>
                Code: {dept.code}
              </Text>
            </View>
          </View>

          {/* ACTION MENU */}
          <View>
            <TouchableOpacity
              onPress={() =>
                setMenuOpenId(menuOpenId === dept.id ? null : dept.id)
              }
            >
              <Ionicons name="ellipsis-vertical" size={22} color="#444" />
            </TouchableOpacity>

            {menuOpenId === dept.id && (
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: 28,
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  elevation: 8,
                  flexDirection: "row",
                  padding: 6,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: "#e9f3ff",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 6,
                  }}
                  onPress={() => setMenuOpenId(null)}
                >
                  <Ionicons name="pencil" size={18} color="#0b3d91" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: "#ffecec",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    deleteDepartment(dept.id);
                    setMenuOpenId(null);
                  }}
                >
                  <Ionicons name="trash" size={18} color="#e53935" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ))}

      {/* ADD DEPARTMENT MODAL */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "#fff",
              borderRadius: 22,
              padding: 22,
              elevation: 10,
            }}
          >
            {/* MODAL HEADER */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: "#e9f3ff",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <Ionicons name="business" size={20} color="#0b3d91" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Add Department
              </Text>
            </View>

            {/* INPUTS */}
            <TextInput
              placeholder="Department Name"
              value={newDepartment.name}
              onChangeText={(text) =>
                setNewDepartment({ ...newDepartment, name: text })
              }
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 12,
                padding: 14,
                marginTop: 18,
                backgroundColor: "#fafafa",
              }}
            />

            <TextInput
              placeholder="Department Code"
              value={newDepartment.code}
              onChangeText={(text) =>
                setNewDepartment({ ...newDepartment, code: text })
              }
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 12,
                padding: 14,
                marginTop: 12,
                backgroundColor: "#fafafa",
              }}
            />

            {/* BUTTONS */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 22,
              }}
            >
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: "#777", marginRight: 20 }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#0b3d91",
                  paddingHorizontal: 22,
                  paddingVertical: 10,
                  borderRadius: 12,
                }}
                onPress={addDepartment}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};