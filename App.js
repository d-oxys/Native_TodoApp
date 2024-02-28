import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import BottomNavigation from './components/bottonNavigation';
import { TaskProvider } from './store/taskProvider';

export default function App() {
  return (
    <>
      <TaskProvider>
        <BottomNavigation />
      </TaskProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
