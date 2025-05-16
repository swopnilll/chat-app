import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { createUser } from "../firebaseConfig"; // Adjust path if needed

const SignUpScreen = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!fullName.trim()) {
      Alert.alert("Missing Name", "Please enter your full name.");
      return;
    }
    if (!trimmedEmail) {
      Alert.alert("Missing Email", "Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!trimmedPassword || trimmedPassword.length < 6) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 6 characters long."
      );
      return;
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    try {
      const user = await createUser(trimmedEmail, trimmedPassword, fullName);
      console.log("User created:", user);
      Alert.alert("Success", "Account created successfully!");
      router.push("/login");
    } catch (error) {
      Alert.alert(
        "Signup Failed",
        (error instanceof Error && error.message) ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backArrow} onPress={() => router.back()}>
        <Text style={styles.backArrowText}>←</Text>
      </Pressable>

      <Text style={styles.heading}>
        Sign up with <Text style={styles.headingUnderline}>Email</Text>
      </Text>
      <Text style={styles.subtitle}>
        Get chatting with friends and family today by signing up for our chat
        app!
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Your email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <Pressable style={styles.createButton} onPress={handleSignUp}>
        <Text style={styles.createButtonText}>Create an account</Text>
      </Pressable>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
  },
  backArrow: {
    position: "absolute",
    top: 50,
    left: 24,
  },
  backArrowText: {
    fontSize: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
  },
  headingUnderline: {
    textDecorationLine: "underline",
    textDecorationColor: "#58C3B6",
    textDecorationStyle: "solid",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    width: "100%",
  },
  label: {
    fontWeight: "600",
    color: "#24786D",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
  },
  createButton: {
    marginTop: 40,
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#58C3B6",
    borderRadius: 15,
    alignItems: "center",
  },
  createButtonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
  },
});
