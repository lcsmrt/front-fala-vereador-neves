import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  EditProfile: undefined;
  Home: undefined;
  Chat: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

export type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Forgot Password'
>;

export type EditProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Edit Profile'
>;

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type ChatScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Chat'
>;

export type NavigationProp = LoginScreenNavigationProp &
  RegisterScreenNavigationProp &
  HomeScreenNavigationProp &
  ChatScreenNavigationProp;
