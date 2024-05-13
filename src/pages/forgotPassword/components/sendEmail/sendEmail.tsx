import {Text, View} from 'react-native';
import Separator from '../../../../components/separator/separator';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';

interface SendEmailProps {
  email: any;
  handlePasswordResetDataChange: (name: string, value: any) => void;
  emailErrors: any;
  handleSendEmail: () => void;
}

const SendEmail = ({
  email,
  handlePasswordResetDataChange,
  emailErrors,
  handleSendEmail,
}: SendEmailProps) => {
  return (
    <View className="flex-1 p-7">
      <Text className="text-lg font-semibold text-slate-700">Esqueceu a senha</Text>

      <Separator orientation="horizontal" classes="mt-4 mb-4" />

      <Text className="text-base mb-6 text-slate-700">
        Informe o e-mail que você utiliza para realizar login em sua conta
      </Text>

      <Input
        placeholder="Digite seu e-mail"
        classes="mb-8 w-full"
        label="E-mail"
        value={email || ''}
        onChangeText={text => handlePasswordResetDataChange('email', text)}
        notification={emailErrors || ''}
        keyboardType="email-address"
      />

      <Button className="w-full" onPress={handleSendEmail}>
        <Text className="text-slate-50 text-base">
          Enviar e-mail de recuperação
        </Text>
      </Button>
    </View>
  );
};

export default SendEmail;
