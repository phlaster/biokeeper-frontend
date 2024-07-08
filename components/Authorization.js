import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text, Surface } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'react-native-paper';
import styles from '../styles/style';
import getData from './getData';
import { auth } from './Authfunc';
import storeData from './storeData';

export default function Authorization({ navigation }) {
  const [inputLogin, setInputLogin] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getData('access_token');
      if (token) {
        navigation.navigate('LK');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const authStatus = await auth({
        grant_type: 'password',
        username: inputLogin,
        password: inputPassword,
      });
      if (authStatus === 401) {
        Alert.alert('Error', 'Incorrect login or password!');
      } else {
        await storeData("login", inputLogin);
        navigation.navigate('LK');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred during Authorization.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Surface style={styles.authSurface}>
        <Text style={styles.title}>Welcome Back</Text>
        <TextInput
          style={styles.input}
          label="Login"
          mode="outlined"
          value={inputLogin}
          onChangeText={setInputLogin}
        />
        <TextInput
          style={styles.input}
          label="Password"
          mode="outlined"
          value={inputPassword}
          onChangeText={setInputPassword}
          secureTextEntry
        />
        <Button
          mode="contained"
          style={styles.button}
          loading={loading}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </Button>
        <Button
          mode="text"
          onPress={() => navigation.navigate('Registration')}
          style={styles.textButton}
        >
          Don't have an account? Sign up
        </Button>
      </Surface>
    </View>
  );
}