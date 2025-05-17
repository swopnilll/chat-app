import React from "react";
import {
    ImageStyle,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";

import { Image } from "expo-image";

interface UserAvatarProps {
  size?: number;
  imageUrl?: string;
  name?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  size = 50,
  imageUrl,
  name = "User",
}) => {
  const styles = StyleSheet.create<{
    container: ViewStyle;
    image: ImageStyle;
    initials: TextStyle;
  }>({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#888",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    initials: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: size / 2.5,
    },
  });

  const getInitials = (text: string): string => {
    const names = text.trim().split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <View style={styles.container}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text style={styles.initials}>{getInitials(name)}</Text>
      )}
    </View>
  );
};

export default UserAvatar;
