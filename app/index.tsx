import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const LandingScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to ChatApp</Text>
      <Text style={styles.subheading}>Watch. Create. Connect.</Text>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.loginButton} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable style={styles.signupButton} onPress={() => router.push('/signup')}>
          <Text style={[styles.buttonText, { color: '#333' }]}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    backgroundColor: '#fff', // Ensure white background
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  subheading: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
    gap: 16,
  },
  loginButton: {
    backgroundColor: '#1DA1F2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  signupButton: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
