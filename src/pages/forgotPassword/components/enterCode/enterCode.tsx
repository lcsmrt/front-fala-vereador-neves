import {Text, View} from 'react-native';
import Separator from '../../../../components/separator/separator';

interface EnterCodeProps {
  email: any;
}

const EnterCode = ({email}: EnterCodeProps) => {
  return (
    <View className="flex-1 p-7">
      <Text className="text-lg font-semibold">Verifique seu e-mail</Text>

      <Separator orientation="horizontal" classes="mt-4 mb-4" />

      <Text className="text-base mb-6">
        Enviamos um código de verificação para o e-mail {email.email}, insira-o
        abaixo para redefinir sua senha.
      </Text>
    </View>
  );
};

export default EnterCode;
