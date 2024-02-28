import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TaskContext } from './taskContext';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const tasks = JSON.parse(await AsyncStorage.getItem('@tasks')) || [];
    setTasks(tasks);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <TaskContext.Provider value={{ tasks, fetchData }}>{children}</TaskContext.Provider>;
};
