import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../pages/login/login';

const Router = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
