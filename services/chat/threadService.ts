import { database } from "@/firebaseConfig";
import { get, ref, set } from "firebase/database";

export const getOrCreateThread = async (userId1: string, userId2: string): Promise<string> => {
  // Create a deterministic thread ID
  const sortedIds = [userId1, userId2].sort();
  const threadId = sortedIds.join("_");

  const threadRef = ref(database, `chats/${threadId}`);
  const snapshot = await get(threadRef);

  if (!snapshot.exists()) {
    await set(threadRef, {
      members: {
        [userId1]: true,
        [userId2]: true,
      },
      messages: {},
    });
  }

  return threadId;
};