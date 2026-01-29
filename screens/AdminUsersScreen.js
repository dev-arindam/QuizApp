 import React, { useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
   Modal,   
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AdminUsersScreen() {
  const [students, setStudents] = useState([
    { id: "1", name: "Arindam Bar", email: "ladykiller@mail.com" ,avatar:"https://randomuser.me/api/portraits/women/68.jpg"},
    { id: "2", name: "Jane Smith", email: "jane@mail.com" ,avatar:"https://randomuser.me/api/portraits/women/44.jpg" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", email: "" });
  const [menuOpenId, setMenuOpenId] = useState(null);

  const addStudent = () => {
    if (!newStudent.name || !newStudent.email) return;
    setStudents([
      ...students,
      { id: Date.now().toString(), ...newStudent },
    ]);
    setNewStudent({ name: "", email: "" });
    setModalVisible(false);
  };

  const updateStudent = () => {};
  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
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
          Users
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

      {/* STUDENT LIST */}
      {students.map((student) => (
        <View
          key={student.id}
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
              <Image source={{ uri: student.avatar }} style={{width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12}} />
            </View>

            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {student.name}
              </Text>
              <Text style={{ fontSize: 12, color: "#777", marginTop: 3 }}>
                {student.email}
              </Text>
            </View>
          </View>

          {/* ACTION MENU */}
          <View>
            <TouchableOpacity
              onPress={() =>
                setMenuOpenId(
                  menuOpenId === student.id ? null : student.id
                )
              }
            >
              <Ionicons
                name="ellipsis-vertical"
                size={22}
                color="#444"
              />
            </TouchableOpacity>

            {menuOpenId === student.id && (
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
                    deleteStudent(student.id);
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

      {/* ADD STUDENT MODAL */}
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
            <View
              style={{ flexDirection: "row", alignItems: "center" }}
            >
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
                <Ionicons
                  name="school"
                  size={20}
                  color="#0b3d91"
                />
              </View>
              <Text
                style={{ fontSize: 18, fontWeight: "bold" }}
              >
                Add User
              </Text>
            </View>

            {/* INPUTS */}
            <TextInput
              placeholder="User Name"
              value={newStudent.name}
              onChangeText={(text) =>
                setNewStudent({ ...newStudent, name: text })
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
              placeholder="User Role"
              value={newStudent.name}
              onChangeText={(text) =>
                setNewStudent({ ...newStudent, name: text })
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
              placeholder="Email Address"
              value={newStudent.email}
              onChangeText={(text) =>
                setNewStudent({ ...newStudent, email: text })
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
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
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
                onPress={addStudent}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold" }}
                >
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