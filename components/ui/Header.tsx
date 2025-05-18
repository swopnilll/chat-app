import { logoutUser } from "@/firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type HeaderProps = {
  title: string;
  islogOutButtonRequired?: boolean;
  isBackButtonRequired?: boolean;
};

const Header = ({
  title,
  islogOutButtonRequired = false,
  isBackButtonRequired = false,
}: HeaderProps) => {
  const handleClick = async () => {
    await logoutUser();

    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      {islogOutButtonRequired && (
        <TouchableOpacity style={styles.iconWrapper} onPress={handleClick}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
        </TouchableOpacity>
      )}

      {isBackButtonRequired && (
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2A6EFF" />
        </Pressable>
      )}

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  iconWrapper: {
    position: "absolute",
    left: 15,
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  backButton: {
    position: "absolute",
    left: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
