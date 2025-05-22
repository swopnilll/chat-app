import SearchInput from "@/components/common/SearchInput";
import ConversationUnit from "@/components/conversation/ConversationUnit";
import Header from "@/components/ui/Header";
import { auth, fetchUserConversations } from "@/firebaseConfig";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function ConversationScreen() {
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    fetchUserConversations(setConversations);
  }, []);

  // const filteredConversations = mockConversations.filter((item) =>
  //   item.name.toLowerCase().includes(search.toLowerCase())
  // );

  const filteredConversations = conversations.filter((item) =>
    item.threadId.toLowerCase().includes(search.toLowerCase())
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
        {filteredConversations.map((item) => {
          const otherUserId = item.members.find(
            (id: string) => id !== auth.currentUser?.uid
          );

          return (
            <ConversationUnit
              key={item.threadId}
              id={item.threadId}
              name={otherUserId}
              message={item.lastMessage?.text}
              avatarUrl={item.photoURL}
              seen={item.seen}
              isImage={false}
              isAudio={false}
              duration={""}
              isSentByUser={item.lastMessage?.sender === auth.currentUser?.uid}
            />
          );
        })}
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
