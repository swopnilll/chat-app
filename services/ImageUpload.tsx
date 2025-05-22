
import { updateCurrentUserPhotoUrl } from "@/firebaseConfig";
import * as ImagePicker from "expo-image-picker";

export const uploadToCloudinary = async (
  setImageUrl: (url: string) => void,
  setUploading: (uploading: boolean) => void
) => {
  try {
    setUploading(true);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];

      const data = new FormData();
      data.append("file", {
        uri: image.uri,
        name: "upload.jpg",
        type: "image/jpeg",
      } as any);

      data.append("upload_preset", "intellecta_picture_upload");
      data.append("cloud_name", "dpf6ojj09");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dpf6ojj09/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const resultJson = await res.json();

      if (resultJson.secure_url) {
        console.log("✅ Uploaded Image URL:", resultJson.secure_url);
        setImageUrl(resultJson.secure_url);

        // ⬇️ Update Firebase profile photo
        await updateCurrentUserPhotoUrl(resultJson.secure_url);
      } else {
        console.error("⚠️ No secure_url in Cloudinary response:", resultJson);
      }
    }
  } catch (error) {
    console.error("❌ Upload or profile update failed:", error);
  } finally {
    setUploading(false);
  }
};
