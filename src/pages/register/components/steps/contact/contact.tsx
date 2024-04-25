import {Text, View} from 'react-native';
import Separator from '../../../../../components/separator/separator';
import Input from '../../../../../components/input/input';
import Select from '../../../../../components/input/select';
import Button from '../../../../../components/button/button';

interface ContactProps {
  onPressNext: () => void;
}

const Contact = ({onPressNext}: ContactProps) => {
  return (
    <View className="flex-1 px-7 py-7">
      <Text className="text-lg font-semibold">Contato</Text>

      <Separator orientation="horizontal" classes="mt-4 mb-4" />

      <View>
        <Input
          placeholder="Informe seu CEP"
          classes="mb-4 w-full"
          label="CEP"
        />
        <Input
          placeholder="Digite seu endereço"
          classes="mb-4 w-full"
          label="Endereço"
        />
        <View className="flex flex-row mb-4">
          <Input placeholder="Nº" classes="w-[25%] mr-4" label="Número" />
          <Input
            placeholder="Complemento"
            classes="w-[70%]"
            label="Complemento"
          />
        </View>
        <View className="flex flex-row mb-4">
          <Select
            placeholder="UF"
            classes="w-[25%] mr-4"
            label="UF"
            options={[]}
            displayKey=""
            onSelect={() => {}}
          />

          <Select
            placeholder="Cidade"
            classes="w-[70%]"
            label="Cidade"
            options={[]}
            displayKey=""
            onSelect={() => {}}
          />
        </View>
        <Input
          placeholder="Digite seu telefone"
          classes="mb-4 w-full"
          label="Telefone"
        />
      </View>

      <View className="flex-1 flex justify-end">
        <Button className="w-full" onPress={onPressNext}>
          <Text className="text-slate-50 text-lg">Próximo</Text>
        </Button>
      </View>
    </View>
  );
};

export default Contact;
