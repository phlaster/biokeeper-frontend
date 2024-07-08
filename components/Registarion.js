import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import styles from '../styles/style';
import getData from './getData';
import { reg, auth } from './Authfunc';
import storeData from './storeData';

export default function Registration({ navigation }) {
  const [inputLogin, setInputLogin] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPassword2, setInputPassword2] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegistration = async () => {
    if (inputPassword !== inputPassword2) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await reg({
        username: inputLogin,
        email: inputEmail,
        password: inputPassword,
        password2: inputPassword2
      });

      const authStatus = await getData("authStatus");
      if (authStatus === "400") {
        Alert.alert("Error", "A user with this email is already registered!");
      } else {
        await auth({
          grant_type: 'password',
          username: inputLogin,
          password: inputPassword
        });
        await storeData("login", inputLogin);
        navigation.navigate('LK');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', `An error occurred during registration.\n${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Surface style={styles.authSurface}>
        <Text style={styles.title}>Registration</Text>
        <TextInput
          style={styles.input}
          label="Login"
          mode="outlined"
          value={inputLogin}
          onChangeText={setInputLogin}
        />
        <TextInput
          style={styles.input}
          label="Email"
          mode="outlined"
          value={inputEmail}
          onChangeText={setInputEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          label="Password"
          mode="outlined"
          value={inputPassword}
          onChangeText={setInputPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          label="Repeat Password"
          mode="outlined"
          value={inputPassword2}
          onChangeText={setInputPassword2}
          secureTextEntry
        />
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleRegistration}
          loading={loading}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate('Authorization')}
          style={styles.textButton}
        >
          Already have an account? Log in
        </Button>
      </Surface>
    </View>
  );
}