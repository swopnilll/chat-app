import SearchInput from "@/components/common/SearchInput";
import ConversationUnit from "@/components/conversation/ConversationUnit";
import Header from "@/components/ui/Header";
import { mockConversations } from "@/constants/users";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function ConversationScreen() {
  const [search, setSearch] = useState("");

  const filteredConversations = mockConversations.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* <ChatTestLogger /> */}

      <Header title="Conversation" />

      <SearchInput
        value={search}
        onChangeText={setSearch}
        onClear={() => setSearch("")}
      />

      <ScrollView style={styles.scrollArea}>
        {filteredConversations.map((item) => (
          <ConversationUnit
            key={item.id}
            id={item.id}
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
