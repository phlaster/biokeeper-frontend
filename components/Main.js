import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { View, Image } from 'react-native';
import { Button, Text, Surface } from 'react-native-paper';

import styles from '../styles/style';

export default function Main({ navigation }) {
  const handleStart = () => {
    navigation.navigate('Authorization');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Surface style={styles.mainSurface}>
        <Image
          style={styles.logo}
          source={require('../assets/Biokepper.png')}
          resizeMode="contain"
        />
        <Text style={styles.mainTitle}>Biokepper</Text>
        <Text style={styles.mainText}>
          Здравствуйте, это приложение для сбора метаданных биологических образцов, проект студентов политеха
        </Text>
        <Button
          mode="contained"
          icon={({ color }) => <MaterialIcons name="arrow-forward" size={24} color={color} />}
          onPress={handleStart}
          style={styles.mainButton}
          contentStyle={styles.mainButtonContent}
        >
          Начать
        </Button>
      </Surface>
    </View>
  );
}