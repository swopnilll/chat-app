import Header from "@/components/ui/Header";
import { uploadToCloudinary } from "@/services/ImageUpload";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  return (
    <View style={styles.container}>
      <Header title="Settings" islogOutButtonRequired={true} />

      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => uploadToCloudinary(setImageUrl, setUploading)}
          style={styles.imageContainer}
        >
          {uploading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Upload Profile Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => uploadToCloudinary(setImageUrl, setUploading)}
        >
          <Text style={styles.uploadButtonText}>Choose & Upload Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: "#fff",
    flex: 1,
  },
  content: {
    alignItems: "center",
    marginTop: 40,
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: "hidden",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  placeholderText: {
    color: "#999",
    textAlign: "center",
  },
  uploadButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
