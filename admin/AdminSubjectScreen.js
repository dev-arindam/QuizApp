import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AdminSubjectScreen(){
  const [subjects, setSubjects] = useState([
    { id: "1", name: "Data Structures", code: "CS201" },
    { id: "2", name: "Operating Systems", code: "CS305" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", code: "" });
  const [menuOpenId, setMenuOpenId] = useState(null);

  const addSubject = () => {
    if (!newSubject.name || !newSubject.code) return;
    setSubjects([
      ...subjects,
      { id: Date.now().toString(), ...newSubject },
    ]);
    setNewSubject({ name: "", code: "" });
    setModalVisible(false);
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  return (
    <ScrollView style={{ backgroundColor: "#f2f5fa", flex: 1 }}>
      
      {/* HEADER */}
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 20,
      }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#0b3d91" }}>
          Subjects
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

      {/* SUBJECT LIST CARDS */}
      {subjects.map((sub) => (
        <View
          key={sub.id}
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
          {/* LEFT SIDE */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: "#e9f3ff",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 12,
            }}>
              <Ionicons name="book" size={22} color="#0b3d91" />
            </View>

            <View>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {sub.name}
              </Text>
              <Text style={{ fontSize: 12, color: "#777", marginTop: 3 }}>
                Code: {sub.code}
              </Text>
            </View>
          </View>

          {/* ACTION MENU */}
          <View>
            <TouchableOpacity
              onPress={() =>
                setMenuOpenId(menuOpenId === sub.id ? null : sub.id)
              }
            >
              <Ionicons name="ellipsis-vertical" size={22} color="#444" />
            </TouchableOpacity>

            {menuOpenId === sub.id && (
              <View style={{
                position: "absolute",
                right: 0,
                top: 28,
                backgroundColor: "#fff",
                borderRadius: 20,
                elevation: 8,
                flexDirection: "row",
                padding: 6,
              }}>
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
                    deleteSubject(sub.id);
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

      {/* ADD SUBJECT MODAL */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <View style={{
            width: "85%",
            backgroundColor: "#fff",
            borderRadius: 22,
            padding: 22,
            elevation: 10,
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Add Subject
            </Text>

            <TextInput
              placeholder="Subject Name"
              value={newSubject.name}
              onChangeText={(text) =>
                setNewSubject({ ...newSubject, name: text })
              }
              style={inputStyle}
            />

            <TextInput
              placeholder="Subject Code"
              value={newSubject.code}
              onChangeText={(text) =>
                setNewSubject({ ...newSubject, code: text })
              }
              style={inputStyle}
            />

            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 20 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: "#777", marginRight: 20 }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#0b3d91",
                  paddingHorizontal: 22,
                  paddingVertical: 10,
                  borderRadius: 12,
                }}
                onPress={addSubject}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const inputStyle = {
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 12,
  padding: 14,
  marginTop: 12,
  backgroundColor: "#fafafa",
};

