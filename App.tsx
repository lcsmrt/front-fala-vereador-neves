import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Router from './src/routes/router';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {LoadingContextProvider} from './src/lib/contexts/useLoadingContext';
import {DrawerContextProvider} from './src/lib/contexts/useDrawerContext';

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
            <SafeAreaView style={{flex: 1}}>
              <Router />
            </SafeAreaView>
          </DrawerContextProvider>
        </LoadingContextProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
