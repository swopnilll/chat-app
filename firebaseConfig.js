// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDatabase, onValue, push, ref, set, update } from "firebase/database";
import { Alert } from "react-native";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL:
    "https://intellectachatapp-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
export const auth = getAuth(app);

export const database = getDatabase(app);

export const createUserProfile = async (uid, name, email, photoURL = "") => {
  if (!uid || !email) throw new Error("Invalid UID or Email");

  const userRef = ref(database, `userProfiles/${uid}`);

  await set(userRef, {
    uid,
    displayName: name,
    email,
    photoURL,
    status: "Available",
    createdAt: Date.now(),
    lastSeen: Date.now(),
    isOnline: true,
  });
};

// Proper function to create user
export const createUser = async (email, password, fullName) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: fullName,
  });

  await createUserProfile(
    userCredential.user.uid,
    fullName,
    userCredential.user.email
  );

  return userCredential;
};

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Get Auth Token / Current User
export const getAuthToken = async () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user || null);
    });
  });
};

export const logoutUser = async () => {
  try {
    const response = await signOut(auth);
    Alert.alert("Success", "You have been logged out successfully.");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    Alert.alert(
      "Success",
      "Password reset email sent. Please check your inbox."
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    Alert.alert("Error", "Failed to send password reset email.");
  }
};

/**
 * Updates the profile photo URL for the currently signed-in user.
 * This function should be called after the user has successfully logged in.
 * @param photoUrl The new URL for the user's profile photo. Provide null to remove the photo.
 * @returns Promise<void> Resolves when the update is complete, or rejects if an error occurs or no user is signed in.
 */
export const updateCurrentUserPhotoUrl = async (photoUrl) => {
  // Get the currently signed-in user from the auth instance
  const user = auth.currentUser;

  if (!user) {
    console.warn("No user is currently signed in.");
    throw new Error("No user is signed in.");
  }

  if (user) {
    try {
      // Call updateProfile on the currently signed-in user object
      await updateProfile(user, {
        photoURL: photoUrl,
      });

      console.log(
        "Currently signed-in user's profile photo URL updated successfully!"
      );

      const userRef = ref(database, `userProfiles/${user.uid}`);

      await update(userRef, { photoURL: photoUrl });

      console.log("User photo URL updated in Auth and Realtime DB!");
    } catch (error) {
      console.error("Error updating user photo URL:", error);
      throw error;
    }
  }
};

// Create chat thread (if doesn't exist)
export const createOrUpdateThread = async (
  senderId,
  receiverId,
  messageText
) => {
  const sortedIds = [senderId, receiverId].sort();
  const threadId = sortedIds.join("_");

  const message = {
    sender: senderId,
    text: messageText,
    timestamp: Date.now(),
  };

  const chatRef = ref(database, `chats/${threadId}`);
  const messageRef = push(ref(database, `messages/${threadId}`));

  await update(chatRef, {
    members: {
      [senderId]: true,
      [receiverId]: true,
    },
    lastMessage: message,
  });

  await set(messageRef, message);

  return threadId;
};

export const fetchUserConversations = (callback) => {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  const chatsRef = ref(database, "chats");

  onValue(chatsRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      callback([]);
      return;
    }

    const conversations = Object.entries(data)
      .filter(([threadId, chatData]) => chatData.members && chatData.members[uid])
      .map(([threadId, chatData]) => ({
        threadId,
        lastMessage: chatData.lastMessage || null,
        members: Object.keys(chatData.members),
      }));

    callback(conversations);
  });
};
