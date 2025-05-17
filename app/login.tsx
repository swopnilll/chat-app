import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { loginUser, resetPassword } from "../firebaseConfig"; // adjust path as needed

const LoginScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Enable login only if both fields are non-empty
  const isLoginEnabled = email.trim() !== "" && password !== "";

  const handleLogin = async () => {
    if (!isLoginEnabled) return;

    try {
      const userCredential = await loginUser(email.trim(), password);
      const user = userCredential.user;
      console.log("Logged in user:", user.email);

      Alert.alert(
        "Login successful",
        `Welcome back, ${user.displayName || "User"}!`
      );

      // ✅ Navigate to the authenticated screen (e.g., tab layout)
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "An unknown error occurred.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert("Login Failed", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back arrow */}
      <TouchableOpacity style={styles.backArrow} onPress={() => router.replace("/")}>
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>

      {/* Heading */}
      <Text style={styles.heading}>
        Log in to <Text style={styles.headingUnderline}>Intellecta</Text>
      </Text>

      <View>
        {/* Social login buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="facebook" size={30} color="#1877F2" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="google" size={30} color="#4285F4" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="apple" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        <Text style={styles.quickStart}>
          Get started quickly with your socials
        </Text>
      </View>

      {/* OR Divider */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* Email input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your email</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Login button */}
      <TouchableOpacity
        style={[
          styles.loginButton,
          !isLoginEnabled && styles.loginButtonDisabled,
        ]}
        onPress={handleLogin}
        disabled={!isLoginEnabled}
      >
        <Text
          style={[
            styles.loginButtonText,
            !isLoginEnabled && styles.loginButtonTextDisabled,
          ]}
        >
          Log in
        </Text>
      </TouchableOpacity>

      {/* Forgot password */}
      <TouchableOpacity onPress={() => resetPassword(email)}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backArrow: {
    position: "absolute",
    top: 50,
    left: 24,
  },
  backArrowText: {
    fontSize: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 80,
    marginBottom: 30,
  },
  headingUnderline: {
    borderBottomWidth: 6,
    borderBottomColor: "#7FAAA9",
  },
  socialContainer: {
    flexDirection: "row",
    gap: 25,
    marginTop: 20,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Shadow for Android
    elevation: 5,
  },

  quickStart: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    marginVertical: 15,
    textAlign: "center",
  },

  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    width: "100%",
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },

  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#777",
    fontWeight: "500",
  },

  inputGroup: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    color: "#3A6565",
    marginBottom: 6,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 6,
    fontSize: 16,
    color: "#000",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#E9F1EF",
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 30,
  },
  loginButtonDisabled: {
    backgroundColor: "#f2f2f2",
  },
  loginButtonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "#587878",
  },
  loginButtonTextDisabled: {
    color: "#b3b3b3",
  },
  forgotText: {
    color: "#3A6565",
    marginTop: 20,
    fontWeight: "600",
  },
});
