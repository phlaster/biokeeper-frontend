import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text ,Image} from 'react-native';
import * as Location from 'expo-location';
import MainStack from './navigate';
import { Camera} from 'expo-camera/legacy'; // Импортируем CameraType

const App = () => {

  const [hasCameraPermission, setCameraPermission] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setPermissionGranted(false);
      } else {
        setPermissionGranted(true);
      }
    };

    getLocationPermission();
  }, []); // Run only once on component mount


  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();

      setCameraPermission(cameraPermission.status === "granted");
    };

    requestPermissions();
  }, []);

  

  if (!permissionGranted && !hasCameraPermission) {
    return (
      <View style={styles.container}>
        <Text>Permission to access location was denied</Text>
      </View>
    );
  }

  return <MainStack />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 240,
  },
});

export default App;