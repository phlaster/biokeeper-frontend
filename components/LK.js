import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, ScrollView, BackHandler } from 'react-native';
import { Text, Button, Surface, Avatar, useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import styles from '../styles/style';
import getData from './getData';

export default function LK({ navigation }) {
  const [userData, setUserData] = useState({ name: '', email: 'some@email.com' });
  const [stats, setStats] = useState({ totalScans: 10, researches: 5, kits: 3, qrs: 20 });
  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerLeft: null,
        gestureEnabled: false,
      });
    }, [navigation])
  );


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
      return () => backHandler.remove();
    }, []);

  const fetchData = async () => {
    const access_token = await getData('access_token');
    const username = await getData('login');
    if (!access_token) {
      navigation.replace('Authorization');
    } else {
      setUserData({ ...userData, name: username });
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'login']);
      navigation.replace('Authorization');
    } catch (error) {
      console.error("Error removing data upon logout", error);
      Alert.alert('Error', `Error removing data upon logout.\n${error}`, [{ text: 'OK' }]);
    }
  };

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.statusBar}>
          <Avatar.Image size={80} source={require('../assets/LK.png')} />
          <View style={styles.statusBarUserInfo}>
            <Text style={styles.statusBarUsername}>{userData.name}</Text>
            <Text style={styles.statusBarEmail}>{userData.email}</Text>
          </View>
          <Button mode="outlined" onPress={handleLogout}>
            Log Out
          </Button>
        </View>

        <View style={styles.buttonGrid}>
          <Button mode="contained" onPress={() => navigateTo('Qr_screen')} style={styles.gridButton}>
            Scan
          </Button>
          <Button mode="contained" onPress={() => navigateTo('MyScans')} style={styles.gridButton}>
            My Scans
          </Button>
          <Button mode="contained" onPress={() => { }} style={styles.gridButton}>
            Activate KIT
          </Button>
          <Button mode="contained" onPress={() => { }} style={styles.gridButton}>
            My Kits
          </Button>
        </View>

        <Surface style={styles.statsSurface}>
          <Text style={styles.statsTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.totalScans}</Text>
              <Text style={styles.statLabel}>Total scans</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.researches}</Text>
              <Text style={styles.statLabel}>Researches</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.kits}</Text>
              <Text style={styles.statLabel}>Kits</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.qrs}</Text>
              <Text style={styles.statLabel}>QRs</Text>
            </View>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
}
