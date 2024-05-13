import {Text, View} from 'react-native';
import Separator from '../../../../components/separator/separator';
import Input from '../../../../components/input/input';
import Select from '../../../../components/input/select';
import DatePicker from '../../../../components/input/datePicker';
import Button from '../../../../components/button/button';
import {
  formatDate,
  maksCpfCnpj,
  revertDateFormat,
} from '../../../../lib/utils/formatters';

interface PersonalDataProps {
  userData: any;
  handleUserDataChange: (name: string, value: any) => void;
  onPressNext: () => void;
  userDataErrors: any;
  validateUserDataField: (name: string, value: any) => string | null;
}

const PersonalData = ({
  userData,
  handleUserDataChange,
  onPressNext,
  userDataErrors,
  validateUserDataField,
}: PersonalDataProps) => {
  const onSubmit = () => {
    const nameError = validateUserDataField('nome', userData.nome);
    const docError = validateUserDataField('doc', userData.doc);
    const sexoError = validateUserDataField('sexo', userData.sexo);
    const nascimentoError = validateUserDataField(
      'nascimento',
      userData.nascimento,
    );

    if (nameError || docError || sexoError || nascimentoError) return;

    handleUserDataChange(
      'tipoDocumento',
      userData.doc.length === 14 ? 'CPF' : 'CNPJ',
    );

    onPressNext();
  };

  return (
    <View className="flex-1 p-7">
      <Text className="text-lg font-semibold text-slate-700">Dados pessoais</Text>

      <Separator orientation="horizontal" classes="mt-4 mb-4" />

      <View>
        <Input
          placeholder="Digite seu nome completo"
          classes="mb-4 w-full"
          label="Nome"
          value={userData.nome || ''}
          onChangeText={text => handleUserDataChange('nome', text)}
          notification={userDataErrors.nome || ''}
        />
        <Input
          placeholder="Informe seu CPF ou CNPJ"
          classes="mb-4 w-full"
          label="CPF/CNPJ"
          value={userData.doc || ''}
          onChangeText={text => handleUserDataChange('doc', maksCpfCnpj(text))}
          notification={userDataErrors.doc || ''}
          keyboardType="numeric"
        />
        <Select
          placeholder="Selecione seu sexo"
          classes="mb-4 w-full"
          label="Sexo"
          options={[
            {label: 'Masculino', value: 'M'},
            {label: 'Feminino', value: 'F'},
          ]}
          displayKey="label"
          value={userData.sexo}
          onSelect={value => handleUserDataChange('sexo', value)}
          notification={userDataErrors.sexo || ''}
        />
        <DatePicker
          value={userData.nascimento && revertDateFormat(userData.nascimento)}
          label="Nascimento"
          onDateChange={date =>
            handleUserDataChange('nascimento', formatDate(date))
          }
          notification={userDataErrors.nascimento || ''}
        />
      </View>

      <View className="flex-1 flex justify-end">
        <Button className="w-full" onPress={onSubmit}>
          <Text className="text-slate-50 text-base">Próximo</Text>
        </Button>
      </View>
    </View>
  );
};

export default PersonalData;
