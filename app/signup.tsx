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

const SignUpScreen = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    // Trim inputs to avoid whitespace issues
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Basic validation checks
    if (!trimmedFullName) {
      Alert.alert("Missing Name", "Please enter your full name.");
      return;
    }
    if (!trimmedEmail) {
      Alert.alert("Missing Email", "Please enter your email address.");
      return;
    }
    // Email format validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!trimmedPassword) {
      Alert.alert("Missing Password", "Please enter your password.");
      return;
    }
    if (trimmedPassword.length < 6) {
      Alert.alert(
        "Weak Password",
        "Password should be at least 6 characters long."
      );
      return;
    }
    if (!trimmedConfirmPassword) {
      Alert.alert("Missing Confirmation", "Please confirm your password.");
      return;
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    // Passed all validations - proceed with signup logic
    try {
      // Example: Call your signup API here
      // await signUpUser(trimmedFullName, trimmedEmail, trimmedPassword);
      Alert.alert("Success", "Account created successfully! Login using your email and password.");
      router.push("/login"); // Or wherever you want to navigate after signup
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
      {/* Back arrow at top left */}
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
    textDecorationColor: "#58C3B6", // teal underline color
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
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
  },
  createButton: {
    marginTop: 40,
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#58C3B6", // active teal color
    borderRadius: 15,
    alignItems: "center",
  },
  createButtonText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff", // white text for contrast
  },
});
