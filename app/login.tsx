import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const LoginScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login Page</Text>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back to Home</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  backText: {
    fontSize: 16,
    color: '#333',
  },
});
