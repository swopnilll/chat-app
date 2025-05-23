import { database } from "@/firebaseConfig";
import { get, off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: number;
  senderName?: string;
  photoURL?: string;
};

export const useMessages = (threadId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const messagesRef = ref(database, `messages/${threadId}`);

    const unsubscribe = onValue(messagesRef, async (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setMessages([]);
        return;
      }

      const entries = Object.entries(data) as [string, any][];

      // Extract unique sender UIDs
      const senderIds = Array.from(
        new Set(entries.map(([_, msg]) => msg.sender))
      );

      // Fetch user profiles once per sender
      const profilePromises = senderIds.map((uid) =>
        get(ref(database, `userProfiles/${uid}`)).then((snap) =>
          snap.exists() ? { uid, ...snap.val() } : null
        )
      );

      const profiles = await Promise.all(profilePromises);
      const profileMap: Record<string, { displayName?: string; photoURL?: string }> = {};
      profiles.forEach((profile) => {
        if (profile) {
          profileMap[profile.uid] = {
            displayName: profile.displayName,
            photoURL: profile.photoURL,
          };
        }
      });

      // Attach displayName and photoURL to each message
      const formatted = entries.map(([id, msg]) => ({
        id,
        ...msg,
        senderName: profileMap[msg.sender]?.displayName || msg.senderName,
        photoURL: profileMap[msg.sender]?.photoURL,
      }));

      // Sort by timestamp
      setMessages(formatted.sort((a, b) => a.timestamp - b.timestamp));
    });

    return () => off(messagesRef);
  }, [threadId]);

  return messages;
};
