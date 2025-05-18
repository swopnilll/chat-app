import Header from "@/components/ui/Header";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ConversationPage() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Header title={"Swopnil Acharya"}  isBackButtonRequired={true}/>
      <Text style={styles.title}>Conversation with ID: {id}</Text>
      {/* Render messages for this conversation here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
    position: "relative",
  },

  backButton: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
