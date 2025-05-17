import { StyleSheet, View } from "react-native";

import Header from "@/components/ui/Header";
import UserAvatar from "@/components/ui/UserAvator";


export default function ConversationScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Header title="Conversation" />
      </View>
      <UserAvatar
        size={60}
        imageUrl="https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109"
        name="Swopnil Acharya"
      />
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
