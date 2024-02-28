import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TopBar from '../components/topBar';
import StickyButton from '../components/stickButton';
import { TaskContext } from '../store/taskContext';

const ScreenTask = () => {
  const { tasks, fetchData } = useContext(TaskContext);

  const handleComplete = async (index) => {
    const tasks = JSON.parse(await AsyncStorage.getItem('@tasks')) || [];
    const completed = JSON.parse(await AsyncStorage.getItem('@completed')) || [];

    // Menambahkan tugas yang diselesaikan ke array completed
    completed.push(tasks[index]);

    // Menghapus tugas dari array tasks
    tasks.splice(index, 1);

    // Menyimpan kembali array tasks dan completed ke AsyncStorage
    await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    await AsyncStorage.setItem('@completed', JSON.stringify(completed));

    // Memperbarui state lokal
    await fetchData();
  };

  const handleDelete = async (index) => {
    const tasks = JSON.parse(await AsyncStorage.getItem('@tasks')) || [];
    tasks.splice(index, 1);
    await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    await fetchData();
  };

  return (
    <SafeAreaProvider>
      <TopBar />
      <ScrollView style={styles.container}>
        {tasks.map((task, index) => (
          <Card key={index} style={styles.card}>
            <Card.Title title={task.title} subtitle={task.deadline} />
            <Card.Actions>
              <Button onPress={() => handleComplete(index)}>Complete</Button>
              <Button onPress={() => handleDelete(index)}>Delete</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      <StickyButton onPress={fetchData} />
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
