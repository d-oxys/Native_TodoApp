import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TopBar from '../components/topBar';

const ScreenTask = () => {
  return (
    <SafeAreaProvider>
      <TopBar />
      <View style={styles.container}>
        <Text style={styles.title}>History Screen</Text>
        {/* Tambahkan komponen task Anda di sini */}
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFFFF',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ScreenTask;
