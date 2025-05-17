import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Pressable,
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
} from "react-native";

interface SearchInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = "Search...",
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
      {value.length > 0 && (
        <Pressable onPress={onClear}>
          <Ionicons name="close-circle" size={20} color="#888" style={styles.icon} />
        </Pressable>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    margin: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  icon: {
    marginHorizontal: 4,
  },
});
