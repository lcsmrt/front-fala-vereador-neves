import {Text, View} from 'react-native';
import Separator from '../../../../components/separator/separator';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';
import EyeOpenIcon from '../../../../assets/icons/eyeOpen';
import EyeClosedIcon from '../../../../assets/icons/eyeClosed';
import {useState} from 'react';

interface AccoundProps {
  userData: any;
  handleUserDataChange: (name: string, value: any) => void;
  onFinish: () => void;
  userDataErrors: any;
  validateUserDataField: (name: string, value: any) => string | null;
}

const Account = ({
  userData,
  handleUserDataChange,
  onFinish,
  userDataErrors,
}: AccoundProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);

  return (
    <View className="flex-1 px-7 py-7">
      <Text className="text-lg font-semibold text-slate-700">Dados da conta</Text>

      <Separator orientation="horizontal" classes="mt-4 mb-4" />

      <View>
        <Input
          placeholder="Digite seu e-mail"
          classes="mb-4 w-full"
          label="E-mail"
          keyboardType="email-address"
          onChangeText={text => handleUserDataChange('email', text)}
          value={userData.email}
          notification={userDataErrors.email}
        />
        <Input
          placeholder="Digite sua senha"
          classes="mb-4 w-full"
          label="Senha"
          secureTextEntry={!isPasswordVisible}
          onChangeText={text => handleUserDataChange('senha', text)}
          value={userData.senha}
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
          notification={userDataErrors.senha}
        />
        <Input
          placeholder="Confirme sua senha"
          classes="mb-4 w-full"
          label="Confirmação"
          secureTextEntry={!isPasswordConfirmationVisible}
          onChangeText={text => handleUserDataChange('confirmarSenha', text)}
          value={userData.confirmarSenha}
          rightIcon={
            <Button
              onPress={() =>
                setIsPasswordConfirmationVisible(!isPasswordConfirmationVisible)
              }
              variant="ghost"
              size="icon">
              {isPasswordConfirmationVisible ? (
                <EyeOpenIcon stroke="#999" />
              ) : (
                <EyeClosedIcon stroke="#999" />
              )}
            </Button>
          }
          notification={userDataErrors.confirmarSenha}
        />
      </View>

      <View className="flex-1 flex justify-end">
        <Button className="w-full" onPress={onFinish}>
          <Text className="text-slate-50 text-base">Finalizar</Text>
        </Button>
      </View>
    </View>
  );
};

export default Account;
