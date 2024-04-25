import {Text, View} from 'react-native';
import Separator from '../../../../../components/separator/separator';
import Input from '../../../../../components/input/input';
import Button from '../../../../../components/button/button';
import EyeOpenIcon from '../../../../../assets/icons/eyeOpen';
import EyeClosedIcon from '../../../../../assets/icons/eyeClosed';
import {useState} from 'react';

interface AccoundProps {
  onFinish: () => void;
}

const Account = ({onFinish}: AccoundProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);

  return (
    <View className="flex-1 px-7 py-7">
      <Text className="text-lg font-semibold">Dados da conta</Text>

      <Separator orientation="horizontal" classes="mt-4 mb-4" />

      <View>
        <Input
          placeholder="Digite seu e-mail"
          classes="mb-4 w-full"
          label="E-mail"
        />
        <Input
          placeholder="Digite sua senha"
          classes="mb-4 w-full"
          label="Senha"
          secureTextEntry={!isPasswordVisible}
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
        <Input
          placeholder="Confirme sua senha"
          classes="mb-4 w-full"
          label="Confirmação"
          secureTextEntry={!isPasswordConfirmationVisible}
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
        />
      </View>

      <View className="flex-1 flex justify-end">
        <Button className="w-full" onPress={onFinish}>
          <Text className="text-slate-50 text-lg">Finalizar</Text>
        </Button>
      </View>
    </View>
  );
};

export default Account;
