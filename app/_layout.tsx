import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { StyleSheet } from "react-native";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with real auth logic

  useEffect(() => {
    // Simulate async auth check (replace with actual logic, e.g., token or context)
    const checkAuth = async () => {
      const userToken = await getAuthToken(); // Create this function
      setIsAuthenticated(!!userToken);
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (authChecked) {
      if (isAuthenticated) {
        router.replace("/(tabs)");
      }
    }
  }, [authChecked, isAuthenticated]);

  if (!loaded || !authChecked) {
    return null; // Show splash or loading screen
  }

  return (
    <>
      <Slot />
      <StatusBar style="auto" />
    </>
  );
}

// Dummy function for example — replace with real auth mechanism
async function getAuthToken() {
  // Simulate a logged-in user
  const mockUser = {
    id: "user123",
    name: "Swopnil Acharya",
    email: "swopnil@example.com",
    role: "user",
    token: "mock-auth-token",
    avatarUrl: "https://example.com/avatar.jpg",
    preferences: {
      theme: "dark",
      notifications: true,
    },
  };

  return mockUser; // Logged in
  // return null; // Not logged in (for testing unauthenticated state)
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
