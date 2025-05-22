import { database } from "@/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  createdAt: string;
  [key: string]: any; // For any additional fields
}

export const useChatMessages = (threadId: string): ChatMessage[] => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const messagesRef = ref(database, `chats/${threadId}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setMessages(
          (Object.values(data) as ChatMessage[]).sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          )
        );
      }
    });

    return () => unsubscribe();
  }, [threadId]);

  return messages;
};
