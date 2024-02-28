import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Modal, Button, Text, TouchableOpacity } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';
import { TaskContext } from '../store/taskContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyComponent = () => {
  const { fetchData } = useContext(TaskContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    fetchData();
  }, []); // Menghapus tasks sebagai dependensi

  const storeData = async () => {
    try {
      const newTask = { title, deadline };
      const tasks = JSON.parse(await AsyncStorage.getItem('@tasks')) || [];
      const updatedTasks = [...tasks, newTask];
      await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
      console.log('data berhasil di simpan');
      setTitle('');
      setDeadline('');
      fetchData(); // Memanggil fetchData setelah menyimpan data
    } catch (e) {
      // saving error
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.title}>ADD TASK</Text>
              <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
            </View>
            <TextInput style={styles.input} mode='outlined' label='Title' value={title} onChangeText={setTitle} />
            <TextInput style={styles.input} mode='outlined' label='Deadline' value={deadline} onChangeText={setDeadline} />
            <Button
              color={'#4285F4'}
              title='Submit'
              onPress={() => {
                storeData();
                setModalVisible(!isModalVisible);
              }}
            />
          </View>
        </View>
      </Modal>

      <FAB style={styles.fab} large icon='plus' color='#FFFFFF' onPress={() => setModalVisible(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 0,
    backgroundColor: '#4285F4',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: 285,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    marginBottom: 5, // Menambahkan margin bottom ke TextInput
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyComponent;
