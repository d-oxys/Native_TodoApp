import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import ScreenTask from '../screens/screenTask';
import CompleteScreen from '../screens/CompleteScreen';
import UncompleteScreen from '../screens/UncompleteScreen';
import HistoryScreen from '../screens/HistoryScreen';

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'task', title: 'Task', focusedIcon: 'format-list-bulleted', unfocusedIcon: 'format-list-bulleted' },
    { key: 'complete', title: 'Complete', focusedIcon: 'check', unfocusedIcon: 'check-outline' },
    { key: 'uncomplete', title: 'Uncomplete', focusedIcon: 'close', unfocusedIcon: 'close-outline' },
    { key: 'history', title: 'History', focusedIcon: 'history', unfocusedIcon: 'history' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    task: ScreenTask,
    complete: CompleteScreen,
    uncomplete: UncompleteScreen,
    history: HistoryScreen,
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <BottomNavigation navigationState={{ index, routes }} labelMaxFontSizeMultiplier={2} barStyle={{ backgroundColor: '#FFFFFF' }} activeColor='#FF407D' onIndexChange={setIndex} renderScene={renderScene} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyComponent;
