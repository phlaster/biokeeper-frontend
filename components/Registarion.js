import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

import axios from 'axios';

import getData from './getData';
import storeData from './storeData';

const login = async (user, pass) => {
  try {
    const response = await axios.post('http://62.109.17.249:1337/token', new URLSearchParams({
      grant_type: 'password',
      username: user,
      password: pass,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    storeData("access_token", response.data.access_token);
    storeData("refresh_token", response.data.refresh_token);

  } catch (error) {
    console.error('Error logging in:', error);
  }
};


export default function Registration({ navigation }) {
  const [inputLogin, setInputLogin] = useState('');
  const [inputEmail, setEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPassword2, setInputPassword2] = useState('');
  const [storedLogin, setStoredLogin] = useState('');
  const [storedPassword, setStoredPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const login = await getData('username');
      const password = await getData('password');
      if (login && password) {
        setStoredLogin(login);
        setStoredPassword(password);
        navigation.navigate('LK');
      }
    };

    fetchData();
  }, []);


  //работает только если юзер гарантированно есть в дб
  const loadScene = async () => {
    try {
      await login(inputLogin, inputPassword);

      console.log(await getData("access_token"));
      console.log(await getData("refresh_token"));
    } catch (error) {
      console.error('Error:', error);
    }
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.textLast}>Регистрация</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInputLogin}
        value={inputLogin}
        placeholder="Login"
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={inputEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setInputPassword}
        value={inputPassword}
        placeholder="Password"
        secureTextEntry={true}  // Скрытие пароля
      />
      <TextInput
        style={styles.input}
        onChangeText={setInputPassword2}
        value={inputPassword2}
        placeholder="Repeat the password"
        secureTextEntry={true}  // Скрытие пароля
      />
      <Button style={styles.btn} title={'Продолжить'} onPress={loadScene} />
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
