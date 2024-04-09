import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Router from './src/routes/Router';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Router />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
