import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ResultScreen({ score, category, onHome }) {

  const TOTAL_QUESTIONS = 30;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I scored ${score}/${TOTAL_QUESTIONS} in ${category} Quiz! 🎉`
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

      {/* SCORE CIRCLE */}
      <View style={styles.circleOuter}>
        <View style={styles.circleInner}>
          <Text style={styles.scoreTitle}>Your Score</Text>
          <Text style={styles.scoreValue}>
            {score}/{TOTAL_QUESTIONS}
          </Text>
        </View>
      </View>

      {/* TEXT */}
      <Text style={styles.congrats}>Congratulations 🎉</Text>
      <Text style={styles.subText}>
        Great job, Rumi Aktar! You completed the {category} quiz.
      </Text>

      {/* BUTTONS */}
      <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.homeBtn} onPress={onHome}>
        <Text style={styles.homeText}>Back to Home</Text>
      </TouchableOpacity>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={22} color="#999" />
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
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 100,
  },

  circleOuter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#e6f0ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30
  },

  circleInner: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#0b3d91",
    justifyContent: "center",
    alignItems: "center"
  },

  scoreTitle: {
    color: "#cce0ff",
    fontSize: 14
  },

  scoreValue: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold"
  },

  congrats: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0b3d91",
    marginTop: 10
  },

  subText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 6
  },

  shareBtn: {
    width: "85%",
    backgroundColor: "#0b3d91",
    padding: 14,
    borderRadius: 10,
    marginTop: 40
  },

  shareText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  },

  homeBtn: {
    width: "85%",
    backgroundColor: "#0b3d91",
    padding: 14,
    borderRadius: 10,
    marginTop: 14
  },

  homeText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff"
  }
});
