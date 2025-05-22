import { database } from "@/firebaseConfig";
import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
};

export const useMessages = (threadId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const messagesRef = ref(database, `messages/${threadId}`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setMessages([]);
        return;
      }

      const formatted = Object.entries(data).map(([id, msg]: [string, any]) => ({
        id,
        ...msg,
      }));

      setMessages(formatted.sort((a, b) => a.timestamp - b.timestamp));
    });

    return () => off(messagesRef);
  }, [threadId]);

  return messages;
};
