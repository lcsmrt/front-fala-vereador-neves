import {Text, View} from 'react-native';
import Input from '../../components/input/input';
import UserIcon from '../../assets/icons/user';
import LockIcon from '../../assets/icons/lock';
import Button from '../../components/button/button';
import {useState} from 'react';
import EyeOpenIcon from '../../assets/icons/eyeOpen';
import EyeClosedIcon from '../../assets/icons/eyeClosed';
import LinearGradient from 'react-native-linear-gradient';
import useUserAuthentication from './hooks/useUserAuthentication';
import {useNavigation} from '@react-navigation/native';
import {LoginScreenNavigationProp} from '../../lib/types/system/navigation';

const Login = () => {
  const navigation: LoginScreenNavigationProp = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {credentials, handleCredentialsChange, credentialErrors, handleLogin} =
    useUserAuthentication();

  return (
    <LinearGradient
      colors={['#0ea5e9', '#082f49']}
      className="h-screen flex items-center justify-center px-6 pt-10 pb-6">
      <View className="flex-1 w-full flex items-center justify-center">
        <Text className="text-3xl font-semibold text-slate-50 mb-10">
          Login
        </Text>

        <Input
          placeholder="E-mail"
          classes="w-full mb-1"
          value={credentials.login || ''}
          onChangeText={(text: string) =>
            handleCredentialsChange('login', text)
          }
          notification={credentialErrors.login || ''}
          leftIcon={
            <View className="h-6 w-6 mr-2">
              <UserIcon stroke="#999" />
            </View>
          }
          keyboardType="email-address"
        />
        <Input
          placeholder="Senha"
          classes="w-full"
          value={credentials.senha || ''}
          onChangeText={(text: string) =>
            handleCredentialsChange('senha', text)
          }
          notification={credentialErrors.senha || ''}
          secureTextEntry={!isPasswordVisible}
          leftIcon={
            <View className="h-6 w-6 mr-2">
              <LockIcon stroke="#999" />
            </View>
          }
          rightIcon={
            <Button
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              variant="ghost"
              size="icon">
              {isPasswordVisible ? (
                <EyeOpenIcon stroke="#999" />
              ) : (
                <EyeClosedIcon stroke="#999" />
              )}
            </Button>
          }
        />

        <Button className="w-full mt-8" onPress={handleLogin}>
          <Text className="text-slate-50 text-base">Entrar</Text>
        </Button>

        <Button
          variant="ghost"
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text className="text-slate-50 text-base">Esqueci minha senha</Text>
        </Button>
      </View>

      <View className="h-fit flex justify-end">
        <Text className="text-slate-50 text-base m-0">
          Não possui uma conta?
        </Text>
        <Button
          variant="ghost"
          className="m-0 p-0"
          onPress={() => navigation.navigate('Register')}>
          <Text className="text-amber-300 text-base m-0">Cadastre-se</Text>
        </Button>
      </View>
    </LinearGradient>
  );
};

export default Login;
