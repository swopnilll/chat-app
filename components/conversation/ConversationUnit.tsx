import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import UserAvatar from "../ui/UserAvator";

type ConversationUnitProps = {
  name: string;
  message: string;
  avatarUrl: string;
  seen?: boolean;
  isImage?: boolean;
  isAudio?: boolean;
  duration?: string;
  isSentByUser?: boolean;
};

const ConversationUnit = ({
  name,
  message,
  avatarUrl,
  seen = false,
  isImage = false,
  isAudio = false,
  duration = "",
  isSentByUser = true,
}: ConversationUnitProps) => {
  const renderMessageContent = () => {
    if (isImage) {
      return (
        <View style={styles.messageRow}>
          {isSentByUser && renderSeenIcon()}
          <MaterialIcons name="photo-camera" size={16} color="#888" />
          <Text style={styles.lastMessage}> Photo</Text>
        </View>
      );
    }

    if (isAudio) {
      return (
        <View style={styles.messageRow}>
          {isSentByUser && renderSeenIcon()}
          <Ionicons name="mic-outline" size={16} color="#888" />
          <Text style={styles.lastMessage}> {duration}</Text>
        </View>
      );
    }

    return (
      <View style={styles.messageRow}>
        {isSentByUser && renderSeenIcon()}
        <Text style={styles.lastMessage}>{message}</Text>
      </View>
    );
  };

  const renderSeenIcon = () => {
    return (
      <Ionicons
        name="checkmark-done"
        size={16}
        color={seen ? "#34B7F1" : "#999"}
        style={styles.checkIcon}
      />
    );
  };

  return (
    <View style={styles.container}>
      <UserAvatar size={60} imageUrl={avatarUrl} name={name} />

      <View style={styles.textContainer}>
        <Text style={styles.userName}>{name}</Text>
        {renderMessageContent()}
      </View>

      <Ionicons
        name="chevron-forward-outline"
        size={24}
        color="#ccc"
        style={styles.rightArrow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  lastMessage: {
    color: "#666",
    fontSize: 14,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkIcon: {
    marginRight: 4,
  },
  rightArrow: {
    marginLeft: 8,
  },
});

export default ConversationUnit;
