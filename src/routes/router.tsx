import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/login/login';
import Home from '../pages/home/home';
import Chat from '../pages/chat/chat';
import Register from '../pages/register/register';
import EditProfile from '../pages/editProfile/editProfile';
import ForgotPassword from '../pages/forgotPassword/forgotPassword';

const Stack = createNativeStackNavigator();

const Router = () => {
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
          name="Register"
          component={Register}
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

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: false,
            statusBarColor: '#0ea5e9',
          }}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: false,
            statusBarColor: '#0ea5e9',
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default Router;
