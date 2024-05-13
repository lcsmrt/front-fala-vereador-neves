import {Text, View} from 'react-native';
import Separator from '../../../../components/separator/separator';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';
import {useState} from 'react';
import EyeOpenIcon from '../../../../assets/icons/eyeOpen';
import EyeClosedIcon from '../../../../assets/icons/eyeClosed';

interface ResetPasswordProps {
  passwordResetData: any;
  handlePasswordResetDataChange: (name: string, value: any) => void;
  handleResetPassword: () => void;
  passwordResetErrors: any;
}

const ResetPassword = ({
  passwordResetData,
  handlePasswordResetDataChange,
  handleResetPassword,
  passwordResetErrors,
}: ResetPasswordProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState(false);
  return (
    <View className="flex-1 p-7">
      <Text className="text-lg font-semibold text-slate-700">Redefinir senha</Text>

      <Separator orientation="horizontal" classes="mt-4 mb-4" />

      <Text className="text-base mb-6 text-slate-700">
        Informe a nova senha que você deseja utilizar
      </Text>

      <Input
        placeholder="Digite sua nova senha"
        classes="mb-4 w-full"
        label="Nova senha"
        value={passwordResetData?.novaSenha || ''}
        onChangeText={text => handlePasswordResetDataChange('novaSenha', text)}
        notification={passwordResetErrors?.novaSenha || ''}
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
        placeholder="Confirme sua nova senha"
        classes="mb-8 w-full"
        label="Confirmar senha"
        value={passwordResetData?.confirmarSenha || ''}
        onChangeText={text =>
          handlePasswordResetDataChange('confirmarSenha', text)
        }
        notification={passwordResetErrors?.confirmarSenha || ''}
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

      <View className="w-full">
        <Button className="w-full" onPress={handleResetPassword}>
          <Text className="text-slate-50 text-base">Redefinir</Text>
        </Button>
      </View>
    </View>
  );
};

export default ResetPassword;
