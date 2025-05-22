import { database } from "@/firebaseConfig";
import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

// Define a type for messages
export type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
};

export const useMessages = (threadId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const messagesRef = ref(database, `chats/${threadId}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() as Record<string, Message>;

      if (!data) {
        setMessages([]);
        return;
      }

      const loadedMessages = Object.values(data).sort(
        (a, b) => a.timestamp - b.timestamp
      );

      setMessages(loadedMessages);
    });

    return () => off(messagesRef);
  }, [threadId]);

  return messages;
};
