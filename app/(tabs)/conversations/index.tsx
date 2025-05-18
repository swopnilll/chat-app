import SearchInput from "@/components/common/SearchInput";
import ConversationUnit from "@/components/conversation/ConversationUnit";
import Header from "@/components/ui/Header";
import { mockConversations } from "@/constants/users";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function ConversationScreen() {
  const [search, setSearch] = useState("");
  
  return (
    <View style={styles.container}>
      <Header title="Conversation" />

      <SearchInput
        value={search}
        onChangeText={setSearch}
        onClear={() => setSearch("")}
      />
      
      <ScrollView style={styles.scrollArea}>
        {mockConversations.map((item) => (
          <ConversationUnit
            key={item.id}
            name={item.name}
            message={item.message}
            avatarUrl={item.avatarUrl}
            seen={item.seen}
            isImage={item.isImage}
            isAudio={item.isAudio}
            duration={item.duration}
            isSentByUser={item.isSentByUser}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollArea: {
    flex: 1,
    marginBottom: 70,
  },
});
