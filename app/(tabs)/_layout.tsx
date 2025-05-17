import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            height: 60,
            paddingTop: 2,
          },
          default: {
            height: 60,
          },
        }),
        tabBarLabelStyle: {
          color: "#888888", // Keep label color gray always
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Conversations",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="chatbubble"
              size={20}
              color={focused ? "#2A6EFF" : "#888888"} // blue if focused, else gray
            />
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contacts",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="person"
              size={20}
              color={focused ? "#2A6EFF" : "#888888"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name="settings"
              size={20}
              color={focused ? "#2A6EFF" : "#888888"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
