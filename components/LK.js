import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import getData from './getData';
import storeData from './storeData';
import { RadioButtons } from 'react-native-radio-buttons';


const Request = async (method, url, data) => {
  try {
    const response = await fetch(url + "?" + new URLSearchParams(data).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const resp = await response.json();
    
    return resp;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
}

export default function LK({ navigation }) {
  const [Options, setOptions] = useState([]);
  const [Comments, setComments] = useState([]);
  const [SelectedOption, setSelectedOption] = useState('');
  const [Index, setIndex] = useState(0);

  const loadscene = () => {
    storeData("research", Comments[Index]);
    navigation.navigate('ResearchComment', { data: Comments[Index] });
  }

  const exit = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      
      navigation.navigate('Autorization');
    } catch (e) {
      console.error("Ошибка при удалении данных", e);
    }
  };

  function renderOption(option, selected, onSelect, index) {
    const style = selected ? { fontWeight: 'bold' } : {};

    
    if (selected) {
      setIndex(index);
    }

    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <Text style={style}>{option}</Text>
      </TouchableWithoutFeedback>
    );
  }

  

  useEffect(() => {
    const fetchData = async () => {
      const access_token = await getData('access_token');
      if (access_token) {
        try {
          //делаем запрос на ресёрчи
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        Alert.alert("Invalid Login or Password");
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Выберите Исследование</Text>
      <Text>{ Options.length > 0 ? '' : 'Здесь пока пусто'}</Text>
      <View style={{ margin: 20 }}>
        <RadioButtons
          options={Options}
          onSelection={setSelectedOption}
          renderOption={renderOption}
          renderContainer={(optionNodes) => <View>{optionNodes}</View>}
        />
      </View>

      { SelectedOption == '' ? '' : <Button style={styles.btn} title={'Выбрать и продолжить'} onPress={loadscene} /> }

      <Button style={styles.btn} title={'выйти из аккаунта'} onPress={exit} />
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
  text: {
    color:'green', 
    marginBottom: 10
  },
  textLast:
  {
    color:'green', 
    marginTop: 50,
    marginBottom: 10
  },
  btn:{
    position:'relative',
    bottom:0
  }
});
