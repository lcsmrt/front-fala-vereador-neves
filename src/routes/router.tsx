import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/login/login';
import Home from '../pages/home/home';
import Loading from '../components/loading/loading';
import Chat from '../pages/chat/chat';

const Router = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            statusBarColor: '#0ea5e9',
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            statusBarColor: '#0ea5e9',
          }}
        />

        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{
            headerShown: false,
            statusBarColor: '#0ea5e9',
          }}
        />
      </Stack.Navigator>
      <Loading />
    </>
  );
};

export default Router;
