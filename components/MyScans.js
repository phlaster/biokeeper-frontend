import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function MyScans({ navigation }) {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const scanKeys = keys.filter(key => key.startsWith('scan_'));
        const scanData = await AsyncStorage.multiGet(scanKeys);
        const parsedScans = scanData.map(([key, value], index) => {
          const scan = JSON.parse(value);
          return {
            id: scan.id,
            time: new Date(parseInt(scan.id)).toLocaleString(),
            comment: scan.comment ? scan.comment.slice(0, 15) + (scan.comment.length > 15 ? '...' : '') : '',
            sendStatus: 'Not Sent', // Placeholder for future implementation
          };
        });
        setScans(parsedScans);
      } catch (error) {
        console.error('Error fetching scans:', error);
      }
    };

    fetchScans();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.indexCell]}>{index + 1}</Text>
      <Text style={[styles.cell, styles.timeCell]}>{item.time}</Text>
      <Text style={[styles.cell, styles.commentCell]}>{item.comment}</Text>
      <Text style={[styles.cell, styles.statusCell]}>{item.sendStatus}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={scans}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={[styles.headerCell, styles.indexCell]}>No</Text>
            <Text style={[styles.headerCell, styles.timeCell]}>Time</Text>
            <Text style={[styles.headerCell, styles.commentCell]}>Comment</Text>
            <Text style={[styles.headerCell, styles.statusCell]}>Status</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('LK')}>
        <Text style={styles.homeButtonText}>Home</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  cell: {
    fontSize: 14,
    color: '#444',
  },
  indexCell: {
    width: width * 0.1,
    textAlign: 'center',
  },
  timeCell: {
    width: width * 0.35,
  },
  commentCell: {
    width: width * 0.35,
  },
  statusCell: {
    width: width * 0.2,
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});