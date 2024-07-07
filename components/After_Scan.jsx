import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Alert, View, Button, TextInput } from 'react-native';
import * as Location from 'expo-location';
import storeData from './storeData';
import getData from './getData';

const getLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return false;
  }
  return true;
};

export default function After_Scan({ route, navigation }) {
  const [location, setLocation] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [scanId, setScanId] = useState(Date.now().toString()); // Generate a unique ID using timestamp

  useEffect(() => {
    const getLocation = async () => {
      
      const permissionGranted = await getLocationPermission();
      if (permissionGranted) {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
      }
    };

    getLocation();
  }, []); // Run only once on component mount

  const { data } = route.params;

  const loadscene = () => {
    Alert.alert("Теперь можно сфотографировать местность");
    navigation.navigate('Take_photo');
  };

  const handleSave = async () => {
    const scanData = {
      id: scanId,
      qr: data,
      comment: inputValue,
      latitude: location ? location.latitude : null,
      longitude: location ? location.longitude : null,
    };
    const username = await getData('login'); // Retrieve username from local storage
    await storeData(`scan_${username}_${scanId}`, JSON.stringify(scanData));
    Alert.alert('Данные сохранены');
    navigation.navigate('LK');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder="Введите комментарий"
      />
      <Text>Latitude: {location ? location.latitude : 'Loading...'}</Text>
      <Text>Longitude: {location ? location.longitude : 'Loading...'}</Text>
      <Text>Comment: {inputValue ? inputValue : 'Loading...'}</Text>
      <Text>qr: {data}</Text>
      <Button title={'Фото'} onPress={loadscene} />
      <Button title="Сохранить данные" onPress={handleSave} />
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
    color: 'green',
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 250,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});