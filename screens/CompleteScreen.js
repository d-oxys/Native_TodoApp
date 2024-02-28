import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TopBar from '../components/topBar';
import { TaskContext } from '../store/taskContext';

const ScreenTask = () => {
  const { fetchData } = useContext(TaskContext);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const fetchCompleted = async () => {
      const completed = JSON.parse(await AsyncStorage.getItem('@completed')) || [];
      setCompleted(completed);
    };

    fetchCompleted();
  }, [completed]);

  const handleUncomplete = async (index) => {
    const tasks = JSON.parse(await AsyncStorage.getItem('@tasks')) || [];
    const completed = JSON.parse(await AsyncStorage.getItem('@completed')) || [];

    // Menambahkan tugas yang diselesaikan kembali ke array tasks
    tasks.push(completed[index]);

    // Menghapus tugas dari array completed
    completed.splice(index, 1);

    // Menyimpan kembali array tasks dan completed ke AsyncStorage
    await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    await AsyncStorage.setItem('@completed', JSON.stringify(completed));

    // Memperbarui state lokal
    setCompleted(completed);
    fetchData();
  };

  const handleDelete = async (index) => {
    const completed = JSON.parse(await AsyncStorage.getItem('@completed')) || [];

    // Menghapus tugas dari array completed
    completed.splice(index, 1);

    // Menyimpan kembali array completed ke AsyncStorage
    await AsyncStorage.setItem('@completed', JSON.stringify(completed));

    // Memperbarui state lokal
    setCompleted(completed);
  };

  return (
    <SafeAreaProvider>
      <TopBar />
      <View style={styles.container}>
        {completed.map((task, index) => (
          <Card key={index} style={[styles.card, { backgroundColor: '#FFFFFF' }]}>
            <Card.Title title={task.title} subtitle={task.deadline} />
            <Card.Actions>
              <Button onPress={() => handleUncomplete(index)}>Uncomplete</Button>
              <Button onPress={() => handleDelete(index)}>Delete</Button>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  card: {
    marginBottom: 8,
  },
});

export default ScreenTask;
