import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Router from './src/routes/router';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {LoadingContextProvider} from './src/lib/contexts/useLoadingContext';
import {DrawerContextProvider} from './src/lib/contexts/useDrawerContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <LoadingContextProvider>
          <DrawerContextProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <Router />
            </GestureHandlerRootView>
          </DrawerContextProvider>
        </LoadingContextProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
