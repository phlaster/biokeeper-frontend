import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

import getData from './getData';
import auth from './Authfunc';


export default function Authorization({ navigation }) {
  const [inputLogin, setInputLogin] = useState('');
  const [inputPassword, setInputPassword] = useState('');

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



  const loadScene = async () => {
    try {
      await auth('token', {
        grant_type: 'password',
        username: inputLogin,
        password: inputLogin,
      });

      storeData('username', inputLogin);
      storeData('parrword', inputPassword);

      console.log(await getData("access_token"));
      console.log(await getData("refresh_token"));
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const registration = async () => {
    navigation.navigate('Registration')
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
        secureTextEntry={true}  // Скрытие пароля
      />
      <Button style={styles.btn} title={'Продолжить'} onPress={loadScene} />
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
