import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const MyComponent = () => {
  return (
    <Appbar.Header style={{ height: 80, backgroundColor: '#FFFFFF' }}>
      <Appbar.Content title='My Todo' titleStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 24 }} />
    </Appbar.Header>
  );
};

export default MyComponent;
