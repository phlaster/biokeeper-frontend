import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera/legacy';
import { theme, Provider as PaperProvider } from 'react-native-paper';
import MainStack from './navigate';
import styles from './styles/style';

const App = () => {
  const [hasCameraPermission, setCameraPermission] = useState(false);
  const [hasLocationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();

      setLocationPermission(locationStatus === 'granted');
      setCameraPermission(cameraStatus === 'granted');
    };

    requestPermissions();
  }, []);

  if (!hasLocationPermission || !hasCameraPermission) {
    return (
      <PaperProvider>
        <View style={styles.container}>
          <Text style={styles.errorText}>
            {!hasLocationPermission && "Location permission denied. "}
            {!hasCameraPermission && "Camera permission denied."}
          </Text>
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <MainStack />
    </PaperProvider>
  );
};

export default App;