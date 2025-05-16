import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const SignUpScreen = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !fullName) {
      Alert.alert('Missing fields', 'Please fill all fields');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back to Home</Text>
      </Pressable>
    </View>
  );
};

export default SignUpScreen;

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
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    fontSize: 16,
  },
  signUpButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
  },
  backText: {
    fontSize: 16,
    color: '#333',
  },
});
