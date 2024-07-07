import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';


import getData from './getData';
import { reg, auth } from './Authfunc';


export default function Registration({ navigation }) {
  const [inputLogin, setInputLogin] = useState('');
  const [inputEmail, setEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPassword2, setInputPassword2] = useState('');


  const loadScene = async () => {
    try {
      await reg({
        username: inputLogin,
        email: inputEmail,
        password: inputPassword,
        password2: inputPassword2
      });

      if (await getData("authStatus") == "400") {
        alert("Пользователь с таким Email уже зарегистрирован!");
      } else {
        await auth({
          grant_type: 'password',
          username: inputLogin,
          password: inputPassword
        });

        console.log(await getData("access_token"));
        console.log(await getData("refresh_token"));

        navigation.navigate('LK');
      }
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
