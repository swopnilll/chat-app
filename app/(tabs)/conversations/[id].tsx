import Header from "@/components/ui/Header";
import { auth, createOrUpdateThread } from "@/firebaseConfig";
import { useMessages } from "@/hooks/useMessages";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import UserAvatar from "@/components/ui/UserAvator";

type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp?: number;
  senderName?: string;
  photoURL?: string;
};

const getOtherUserId = (threadId: string, selfId: string) =>
  threadId.split("_").find((id) => id !== selfId) || "";

export default function ConversationPage() {
  const { id: threadId } = useLocalSearchParams<{ id: string }>();
  const [input, setInput] = useState("");

  const currentUserId = auth.currentUser?.uid ?? "fallback_id";

  const messages: Message[] = useMessages(threadId);

  console.log("Messages:", messages);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    try {
      await createOrUpdateThread(
        currentUserId,
        getOtherUserId(threadId, currentUserId),
        trimmed
      );
      setInput("");
    } catch (error) {
      console.error("Send failed:", error);
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === currentUserId;

    return (
      <View
        style={[styles.messageRow, isUser ? styles.rowRight : styles.rowLeft]}
      >
        {!!item.photoURL && (
          <UserAvatar
            size={36}
            imageUrl={item.photoURL}
            name={item.senderName ?? "?"}
          />
        )}

        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.otherBubble,
          ]}
        >
          {!isUser && item.senderName && (
            <Text style={styles.senderName}>{item.senderName}</Text>
          )}
          <Text style={isUser ? styles.userText : styles.otherText}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  if (!threadId) {
    return (
      <View style={styles.centered}>
        <Text>Loading conversation...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <Header title="conversation" isBackButtonRequired={true} />

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatArea}
        inverted
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={handleSend}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 25,
    marginBottom: 60,
  },
  chatArea: {
    padding: 16,
    flexDirection: "column-reverse",
    gap: 8,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 4,
  },
  rowLeft: {
    alignSelf: "flex-start",
  },
  rowRight: {
    alignSelf: "flex-end",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  userBubble: {
    backgroundColor: "#007aff",
  },
  otherBubble: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  userText: {
    color: "#ffffff",
    fontSize: 16,
  },
  otherText: {
    color: "#1a202c",
    fontSize: 16,
  },
  senderName: {
    fontWeight: "600",
    marginBottom: 2,
    color: "#2d3748",
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#e2e8f0",
  },
  plus: {
    fontSize: 26,
    color: "#007aff",
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 42,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  sendButton: {
    color: "#007aff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
