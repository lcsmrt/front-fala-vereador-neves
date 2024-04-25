import {Text, View} from 'react-native';
import Separator from '../../../../../components/separator/separator';
import Input from '../../../../../components/input/input';
import Select from '../../../../../components/input/select';
import DatePicker from '../../../../../components/input/datePicker';
import Button from '../../../../../components/button/button';

interface PersonalDataProps {
  onPressNext: () => void;
}

const PersonalData = ({onPressNext}: PersonalDataProps) => {
  return (
    <View className="flex-1 px-7 py-7">
      <Text className="text-lg font-semibold">Dados pessoais</Text>

      <Separator orientation="horizontal" classes="mt-4 mb-4" />

      <View>
        <Input
          placeholder="Digite seu nome completo"
          classes="mb-4 w-full"
          label="Nome"
        />
        <Input
          placeholder="Informe seu CPF ou CNPJ"
          classes="mb-4 w-full"
          label="CPF/CNPJ"
        />
        <Select
          placeholder="Selecione seu sexo"
          classes="mb-4 w-full"
          label="Sexo"
          options={[]}
          displayKey=""
          onSelect={() => {}}
        />
        <DatePicker label="Nascimento" />
      </View>

      <View className="flex-1 flex justify-end">
        <Button className="w-full" onPress={onPressNext}>
          <Text className="text-slate-50 text-lg">Próximo</Text>
        </Button>
      </View>
    </View>
  );
};

export default PersonalData;
