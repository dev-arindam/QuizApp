import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

export default function SubjectReviewSystem({onBack}) {
  const [showForm, setShowForm] = useState(false);

  const [reviews, setReviews] = useState([
    { subject: "Math", teacher: "Dr. Sharma", rating: 5, review: "Great class", date: "Today" },
    { subject: "Physics", teacher: "Prof. Mehta", rating: 4, review: "Good numericals", date: "Today" },
    { subject: "Math", teacher: "Dr. Sharma", rating: 4, review: "Helpful notes", date: "Yesterday" },
  ]);

  const [form, setForm] = useState({
    subject: "",
    teacher: "",
    rating: 0,
    review: "",
  });

  const subjects = ["Math", "Physics", "Chemistry", "CS"];

  const submit = () => {
    if (!form.subject || !form.teacher || !form.rating || !form.review)
      return;

    setReviews([
      {
        ...form,
        date: "Today",
      },
      ...reviews,
    ]);

    setForm({ subject: "", teacher: "", rating: 0, review: "" });
    setShowForm(false);
  };

  const grouped = subjects.map(s => ({
    subject: s,
    data: reviews.filter(r => r.subject === s),
  }));

  return (
    <View style={styles.container}>
{/* HERO HEADER */}
<LinearGradient
  colors={["#5B8CFF", "#7B5CFF"]}
  style={styles.header}
>
  {/* TOP BAR */}
  <View style={styles.heroTopRow}>
    <TouchableOpacity
      style={styles.backBtn}
      onPress={onBack}
    >
      <MaterialIcons name="arrow-back" size={22} color="#fff" />
    </TouchableOpacity>

    <Text style={styles.headerTitle}>
      Daily Subject Reviews
    </Text>

    {/* spacer for center alignment */}
    <View style={{ width: 40 }} />
  </View>

  <Text style={styles.headerSub}>
    Track & share feedback by subject
  </Text>

  {/* HERO INFO CARD */}
  <View style={styles.heroInfoCard}>
    <MaterialIcons name="rate-review" size={26} color="#6A5AE0" />
    <View style={{ marginLeft: 10 }}>
      <Text style={styles.heroInfoTitle}>
        Student Review Dashboard
      </Text>
      <Text style={styles.heroInfoSub}>
        Add and monitor daily reviews
      </Text>
    </View>
  </View>
</LinearGradient>

      <ScrollView>

        {/* DASHBOARD LIST */}
        {!showForm &&
          grouped.map(section =>
            section.data.length > 0 && (
              <View key={section.subject} style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {section.subject}
                </Text>

                {section.data.map((item, i) => (
                  <ReviewCard key={i} item={item} />
                ))}
              </View>
            )
          )}

        {/* FORM */}
        {showForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              Add Subject Review
            </Text>

            <View style={styles.chipRow}>
              {subjects.map(s => (
                <TouchableOpacity
                  key={s}
                  onPress={() =>
                    setForm({ ...form, subject: s })
                  }
                  style={[
                    styles.chip,
                    form.subject === s && styles.chipActive,
                  ]}
                >
                  <Text
                    style={
                      form.subject === s
                        ? styles.chipTextActive
                        : styles.chipText
                    }
                  >
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              placeholder="Teacher name"
              style={styles.input}
              value={form.teacher}
              onChangeText={t =>
                setForm({ ...form, teacher: t })
              }
            />

            <View style={styles.starRow}>
              {[1,2,3,4,5].map(n => (
                <TouchableOpacity
                  key={n}
                  onPress={() =>
                    setForm({ ...form, rating: n })
                  }
                >
                  <MaterialIcons
                    name="star"
                    size={34}
                    color={
                      n <= form.rating
                        ? "#FFC107"
                        : "#DDD"
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              placeholder="Write review"
              style={styles.textarea}
              multiline
              value={form.review}
              onChangeText={t =>
                setForm({ ...form, review: t })
              }
            />

            <TouchableOpacity onPress={submit}>
              <LinearGradient
                colors={["#5B8CFF", "#7B5CFF"]}
                style={styles.submit}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Submit Review
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* FLOATING ADD BUTTON */}
      {!showForm && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setShowForm(true)}
        >
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

/* ---------- REVIEW CARD ---------- */

function ReviewCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.teacher}>{item.teacher}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>

      <View style={styles.starRowSmall}>
        {[1,2,3,4,5].map(n => (
          <MaterialIcons
            key={n}
            name="star"
            size={16}
            color={n <= item.rating ? "#FFC107" : "#DDD"}
          />
        ))}
      </View>

      <Text style={styles.review}>{item.review}</Text>
    </View>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:"#F4F6FB" },

header: {
  paddingTop: 58,
  paddingBottom: 26,
  paddingHorizontal: 16,
  borderBottomLeftRadius: 26,
  borderBottomRightRadius: 26,
},

heroTopRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

backBtn: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: "rgba(255,255,255,0.2)",
  alignItems: "center",
  justifyContent: "center",
},

headerTitle: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
},

headerSub: {
  color: "#E9E9FF",
  marginTop: 6,
  textAlign: "center",
  fontSize: 13,
},

heroInfoCard: {
  backgroundColor: "#fff",
  marginTop: 16,
  borderRadius: 16,
  padding: 14,
  flexDirection: "row",
  alignItems: "center",
  elevation: 6,
},

heroInfoTitle: {
  fontWeight: "700",
  fontSize: 14,
  color: "#333",
},

heroInfoSub: {
  fontSize: 12,
  color: "#777",
  marginTop: 2,
},
  section:{ marginTop:16 },
  sectionTitle:{
    fontSize:16,
    fontWeight:"bold",
    marginHorizontal:16,
    marginBottom:8,
  },

  card:{
    backgroundColor:"#fff",
    marginHorizontal:16,
    marginBottom:10,
    padding:14,
    borderRadius:16,
    elevation:3,
  },

  rowBetween:{
    flexDirection:"row",
    justifyContent:"space-between",
  },

  teacher:{ fontWeight:"700" },
  date:{ fontSize:12, color:"#888" },

  starRowSmall:{ flexDirection:"row", marginVertical:4 },
  review:{ color:"#555" },

  fab:{
    position:"absolute",
    right:20,
    bottom:30,
    backgroundColor:"#6A5AE0",
    width:56,
    height:56,
    borderRadius:28,
    alignItems:"center",
    justifyContent:"center",
    elevation:6,
  },

  /* FORM */

  formCard:{
    backgroundColor:"#fff",
    margin:16,
    padding:16,
    borderRadius:18,
    elevation:5,
  },

  formTitle:{
    fontWeight:"bold",
    fontSize:16,
    marginBottom:10,
  },

  chipRow:{ flexDirection:"row", flexWrap:"wrap" },

  chip:{
    backgroundColor:"#ECEFF7",
    paddingHorizontal:12,
    paddingVertical:8,
    borderRadius:20,
    marginRight:8,
    marginBottom:8,
  },

  chipActive:{ backgroundColor:"#6A5AE0" },
  chipText:{ color:"#555", fontWeight:"600" },
  chipTextActive:{ color:"#fff", fontWeight:"600" },

  input:{
    backgroundColor:"#F3F5FA",
    borderRadius:12,
    padding:12,
    marginTop:10,
  },

  textarea:{
    backgroundColor:"#F3F5FA",
    borderRadius:12,
    padding:12,
    height:100,
    marginTop:10,
    textAlignVertical:"top",
  },

  starRow:{ flexDirection:"row", marginTop:10 },

  submit:{
    marginTop:14,
    padding:14,
    borderRadius:14,
    alignItems:"center",
  },
});