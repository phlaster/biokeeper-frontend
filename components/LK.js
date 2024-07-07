import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import getData from './getData';
import storeData from './storeData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LK({ navigation }) {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [stats, setStats] = useState({ totalScans: 10, researches: 5, kits: 3, qrs: 20 });

  const exit = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      await AsyncStorage.removeItem('username'); // Remove username from local storage
      navigation.navigate('Autorization');
    } catch (e) {
      console.error("Ошибка при удалении данных", e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const access_token = await getData('access_token');
      const username = await getData('login'); // Retrieve username from local storage
      if (!access_token) {
        Alert.alert("Invalid Login or Password");
      } else {
        setUserData({ ...userData, name: username }); // Set username in state
      }
    };

    fetchData();
  }, []);

  const Scan = () => {
    navigation.navigate('Qr_screen');
  };
  const MyScan = () => {
    navigation.navigate('MyScans');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image style={styles.userpic} source={require('../assets/LK.png')} />
        <View style={styles.userInfo}>
          <Text>{userData.name}</Text>
          <Text>{userData.email}</Text>
        </View>
        <Button title="Log Out" onPress={exit} />
      </View>

      <View style={styles.buttonSection}>
        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <Button title="Scan" onPress={Scan} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="My Scans" onPress={MyScan} />
          </View>
        </View>
        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <Button title="Activate KIT" onPress={() => {}} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="My Kits" onPress={() => {}} />
          </View>
        </View>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Text>Total scans:</Text>
          <Text>{stats.totalScans}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>Researches:</Text>
          <Text>{stats.researches}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>Kits:</Text>
          <Text>{stats.kits}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>QRs:</Text>
          <Text>{stats.qrs}</Text>
        </View>
      </View>

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
  topSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
  userpic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  buttonSection: {
    flex: 2,
    width: '100%',
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  infoBox: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});