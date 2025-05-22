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
import { getDatabase } from "firebase/database";
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
  databaseURL: "https://intellectachatapp-default-rtdb.asia-southeast1.firebasedatabase.app" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
export const auth = getAuth(app);

export const database = getDatabase(app);

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
}


/**
 * Updates the profile photo URL for the currently signed-in user.
 * This function should be called after the user has successfully logged in.
 * @param photoUrl The new URL for the user's profile photo. Provide null to remove the photo.
 * @returns Promise<void> Resolves when the update is complete, or rejects if an error occurs or no user is signed in.
 */
export const updateCurrentUserPhotoUrl = async (photoUrl) => {
  // Get the currently signed-in user from the auth instance
  const user = auth.currentUser;

  if (user) {
    try {
      // Call updateProfile on the currently signed-in user object
      await updateProfile(user, {
        photoURL: photoUrl,

      });

      console.log("Currently signed-in user's profile photo URL updated successfully!");


    } catch (error) {
      console.error("Error updating current user's profile photo URL:", error);

      throw error;
    }
  } else {
    console.warn("No user is currently signed in. Cannot update profile photo URL.");

    throw new Error("No user is signed in.");
  }
};
// ==============================================