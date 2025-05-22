// components/ChatTestLogger.tsx
import { useChatMessages } from "@/services/chat/messageListeningService";
import { sendMessage } from "@/services/chat/messageSendingService";
import { useEffect } from "react";

const TEST_THREAD_ID = "test-thread";

export default function ChatTestLogger() {
  const messages = useChatMessages(TEST_THREAD_ID);

  useEffect(() => {
    // Test sending a message on startup
    sendMessage(TEST_THREAD_ID, "Hello from startup test!").catch((err) =>
      console.log("❌ Error sending test message:", err)
    );
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      console.log("✅ Received messages:", messages);
    }
  }, [messages]);

  return null; // No UI, just for logging
}
