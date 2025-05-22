import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LandingScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* Branding */}
      <View style={styles.branding}>
        <View style={styles.logo}>
          <Text style={styles.heading}>Intellecta</Text>
          <View style={styles.logoBorder} />
        </View>
        <Text style={styles.subheading}>
          Bridging Conversations, Brilliantly
        </Text>
      </View>

      {/* Social Icons */}
      <View style={styles.socialCallToAction}>
        <View style={styles.containerSocials}>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="facebook" size={24} color="#3b5998" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="google" size={24} color="#DB4437" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="apple" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.quickStart}>Get started quickly with your socials</Text>
      </View>

      {/* OR Divider */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* Email Options */}
      <View style={styles.emailOption}>
        <Pressable onPress={() => router.push("/signup")}>
          <Text style={styles.signupLink}>Sign up with Email</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/login")}>
          <Text style={styles.loginLink}>Existing account? Log in</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 10,
    borderBottomColor: "#58C3B6",
  },

  branding: {
    gap: 20,
    alignItems: "center",
  },

  logo: {
    position: "relative",
    alignItems: "center",
  },

  logoBorder: {
    borderWidth: 3,
    borderColor: "#58C3B6",
    position: "absolute",
    bottom: -6,
    left: 60,
    width: 50,
  },

  heading: {
    fontSize: 44,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111",
  },

  subheading: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    maxWidth: 250,
  },

  quickStart: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    marginTop: 10,
    textAlign: "center",
  },

  socialCallToAction: {
    marginTop: 150,
  },

  containerSocials: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 10,
  },

  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
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

  emailOption: {
    alignItems: "center",
    gap: 16,
  },

  signupLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  loginLink: {
    fontSize: 14,
    color: "#1DA1F2",
    fontWeight: "500",
  },
});
