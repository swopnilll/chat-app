import Header from "@/components/ui/Header";
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

export default function ConversationPage() {
  const { id } = useLocalSearchParams();

  const [messages, setMessages] = useState([
    { id: "1", sender: "Brooke", text: "Hey Martin!" },
    { id: "2", sender: "Brooke", text: "How's your project going?" },
    { id: "3", sender: "Martin", text: "Hi Brooke!" },
  ]);
  const [input, setInput] = useState("");

  type Message = { id: string; sender: string; text: string };

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "Martin",
      text: input.trim(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === "Martin";

    return (
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.otherBubble,
        ]}
      >
        {!isUser && <Text style={styles.senderName}>{item.sender}</Text>}
        <Text style={isUser ? styles.userText : styles.otherText}>
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <Header title="Brooke" isBackButtonRequired={true} />

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
    backgroundColor: "#fff",
    paddingTop: 25,
    marginBottom: 60,
  },
  chatArea: {
    padding: 16,
    flexDirection: "column-reverse",
  },
  messageBubble: {
    maxWidth: "80%",
    marginVertical: 4,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007aff",
  },
  otherBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#f4f5fb",
  },
  userText: {
    color: "#fff",
    fontSize: 16,
  },
  otherText: {
    color: "#000",
    fontSize: 16,
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f4f5fb",
  },
  plus: {
    fontSize: 28,
    color: "#007aff",
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    fontSize: 16,
  },
  sendButton: {
    color: "#007aff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 12,
  },
});
