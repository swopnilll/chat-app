import { StyleSheet, View } from "react-native";

import Header from "@/components/ui/Header";

export default function SettingsScreen() {


  return (
    <View style={styles.container}>
      <Header title="Settings" islogOutButtonRequired={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: "#fff",
    flex: 1,
  },
});
