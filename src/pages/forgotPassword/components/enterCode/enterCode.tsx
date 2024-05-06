import {Text, View} from 'react-native';
import Separator from '../../../../components/separator/separator';
import CodeInput from '../../../../components/input/codeInput';
import Button from '../../../../components/button/button';

interface EnterCodeProps {
  passwordResetData: any;
  handlePasswordResetDataChange: (name: string, value: any) => void;
  handleResendEmail: () => void;
}

const EnterCode = ({
  passwordResetData,
  handlePasswordResetDataChange,
  handleResendEmail,
}: EnterCodeProps) => {
  return (
    <View className="flex-1 p-7">
      <Text className="text-lg font-semibold">Verifique seu e-mail</Text>

      <Separator orientation="horizontal" classes="mt-4 mb-4" />

      <Text className="text-base mb-10">
        Por favor, insira o código que enviamos para o seu e-mail{' '}
        {passwordResetData.email}
      </Text>

      <Button variant="ghost" className="mb-6 p-0" onPress={handleResendEmail}>
        <Text className="text-sm text-center text-slate-400 m-0">
          Re-enviar código
        </Text>
      </Button>

      <View className="w-4/5 mx-auto">
        <CodeInput
          onComplete={code => handlePasswordResetDataChange('codigo', code)}
        />
      </View>
    </View>
  );
};

export default EnterCode;
