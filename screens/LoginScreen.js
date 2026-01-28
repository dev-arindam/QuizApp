import { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  KeyboardAvoidingView, Platform, ActivityIndicator 
} from "react-native";

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Error", "All fields are required");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await fetch(
      "https://api-admin-panel.sreya.online/admin-panel/dist/api/user/user_fetch_api.php",
      {
        method: "POST",
        headers: {
          "X-API-KEY": "sreya876",
          // Do NOT set Content-Type; let fetch handle it for FormData
        },
        body: formData,
      }
    );

    const data = await res.json();
    console.log("API Response:", data);

    if (data.status === "1" || data.status === 1 || data.status === true) {
      onLoginSuccess(data.data);
    } else {
      Alert.alert("Login Failed", data.message);
    }
  } catch (err) {
    Alert.alert("Error", "Server not reachable");
  } finally {
    setLoading(false);
  }
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.login_container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity 
          style={styles.btn} 
          onPress={handleLogin} 
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor:'#f5f5f5',
    flex: 1,
    justifyContent: "center", 
    paddingHorizontal: 20,
  },
  login_container: {
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor: "#ccc",
    padding: 30,
    borderRadius:10,
    elevation: 5,
  },
  title: { 
    fontSize: 25, 
    fontWeight: "bold", 
    marginBottom: 20 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#0b3d91",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { 
    color: "#fff", 
    textAlign: "center", 
    fontWeight: "bold" 
  }
});
