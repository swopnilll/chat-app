import { StyleSheet, View } from "react-native";

import Header from "@/components/ui/Header";

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <Header title="Contacts" />
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
