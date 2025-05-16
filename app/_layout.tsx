import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { StyleSheet } from "react-native";
import { getAuthToken } from "../firebaseConfig";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getAuthToken(); 
      setIsAuthenticated(!!user);
      setAuthChecked(true);
    };

    checkAuth();

  }, []);

  useEffect(() => {
    if (authChecked) {
      if (isAuthenticated) {
        router.replace("/(tabs)"); // Redirect if logged in
      }
    }
  }, [authChecked, isAuthenticated]);

  if (!loaded || !authChecked) {
    return null; // Could replace with SplashScreen or loading indicator
  }

  return (
    <>
      <Slot />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
