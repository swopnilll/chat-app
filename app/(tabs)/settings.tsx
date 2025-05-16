import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { logoutUser } from "@/firebaseConfig";
import { router } from "expo-router";

export default function SettingsScreen() {
  const handleClick = async () => {
    await logoutUser();

    router.replace("/login");
  };

  return (
    <ParallaxScrollView>
      <ThemedView>
        <ThemedText onPress={handleClick}>Settings Page</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({});
