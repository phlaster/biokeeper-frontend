import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

import getData from './getData';
import { auth } from './Authfunc';
import storeData from './storeData';

export default function Authorization({ navigation }) {
  const [inputLogin, setInputLogin] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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

    checkAuth();
  }, []);

  const loadScene = async () => {
    setLoading(true);
    try {
      

      const authStatus = await auth({
        grant_type: 'password',
        username: inputLogin,
        password: inputPassword
      });
      if (authStatus === 401) {
        Alert.alert('Error', 'Неправильный логин или пароль!');
      } else {
        
        console.log(await getData("access_token"));
        console.log(await getData("refresh_token"));
        navigation.navigate('LK');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const registration = () => {
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textLast}>Вход</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInputLogin}
        value={inputLogin}
        placeholder="Login"
      />
      <TextInput
        style={styles.input}
        onChangeText={setInputPassword}
        value={inputPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button style={styles.btn} title={loading ? 'Loading...' : 'Продолжить'} onPress={loadScene} disabled={loading} />
      <Button style={styles.btn} title={'у меня нет аккаунта'} onPress={registration} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLast: {
    color: 'green',
    marginTop: 50,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    width: '80%',
  },
});