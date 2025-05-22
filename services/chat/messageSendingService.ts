import { auth, database } from "@/firebaseConfig";
import { push, ref, set } from "firebase/database";


interface MessageUser {
    _id: string;
    name: string | null;
}

interface Message {
    _id: string | null;
    text: string;
    createdAt: string;
    user: MessageUser;
}

export const sendMessage = async (threadId: string, text: string): Promise<void> => {
    const messagesRef = ref(database, `chats/${threadId}/messages`);
    
    const newMessageRef = push(messagesRef);
    
    if (!auth.currentUser) {
        throw new Error("User is not authenticated.");
    }
    
    const message: Message = {
        _id: newMessageRef.key,
        text,
        createdAt: new Date().toISOString(),
        user: {
            _id: auth.currentUser.uid,
            name: auth.currentUser.displayName,
        },
    };

    await set(newMessageRef, message);
};
