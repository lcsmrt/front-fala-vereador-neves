import {KeyboardAvoidingView, ScrollView, Text, View} from 'react-native';
import Separator from '../../../../components/separator/separator';
import Input from '../../../../components/input/input';
import Button from '../../../../components/button/button';
import ComboBox from '../../../../components/input/comboBox';
import {
  useGetCities,
  useGetStates,
} from '../../../../lib/api/tanstackQuery/ibge/placesRequests';
import {useEffect} from 'react';
import {maskCep, maskPhone} from '../../../../lib/utils/formatters';
import {useGetAddresByCep} from '../../../../lib/api/tanstackQuery/viaCep/cepRequest';

interface ContactProps {
  userData: any;
  handleUserDataChange: (name: string, value: any) => void;
  onPressNext: () => void;
  userDataErrors: any;
  validateUserDataField: (name: string, value: any) => string | null;
}

const Contact = ({
  userData,
  handleUserDataChange,
  onPressNext,
}: ContactProps) => {
  const {data: states} = useGetStates();
  const {data: cities} = useGetCities();
  const {mutate: getAddresByCep, data: address} = useGetAddresByCep();

  useEffect(() => {
    if (userData.cep?.length === 9) {
      const cep = userData.cep.replace('-', '');
      getAddresByCep(cep);
    } else {
      handleUserDataChange('uf', null);
      handleUserDataChange('cidade', null);
      handleUserDataChange('endereco', '');
      handleUserDataChange('complemento', '');
    }
  }, [userData.cep]);

  useEffect(() => {
    if (address) {
      handleUserDataChange(
        'uf',
        states?.find(state => state.sigla === address.uf),
      );
      handleUserDataChange(
        'cidade',
        cities?.find(city => city.nome === address.localidade),
      );
      handleUserDataChange(
        'endereco',
        `${address.logradouro}, ${address.bairro}`,
      );
      handleUserDataChange('complemento', address.complemento);
    }
  }, [address]);

  return (
    <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        className="p-7">
        <Text className="text-lg font-semibold text-slate-700">Contato</Text>

        <Separator orientation="horizontal" classes="mt-4 mb-4" />

        <Input
          placeholder="Informe seu CEP"
          classes="mb-4 w-full"
          label="CEP"
          keyboardType="numeric"
          onChangeText={text => handleUserDataChange('cep', maskCep(text))}
          value={userData.cep}
        />
        <Input
          placeholder="Digite seu endereço"
          classes="mb-4 w-full"
          label="Endereço"
          onChangeText={text => handleUserDataChange('endereco', text)}
          value={userData.endereco}
        />
        <View className="flex flex-row mb-4">
          <Input
            placeholder="Nº"
            classes="w-[25%] mr-4"
            label="Número"
            keyboardType="numeric"
            onChangeText={text => handleUserDataChange('numero', text)}
            value={userData.numero}
          />
          <Input
            placeholder="Complemento"
            classes="w-[70%]"
            label="Complemento"
            onChangeText={text => handleUserDataChange('complemento', text)}
            value={userData.complemento}
          />
        </View>
        <View className="flex flex-row mb-4">
          <ComboBox
            placeholder="UF"
            classes="w-[25%] mr-4"
            label="UF"
            options={states || []}
            displayKey="nome"
            textKey="sigla"
            onSelect={value => handleUserDataChange('uf', value)}
            value={userData.uf}
          />
          <ComboBox
            placeholder="Cidade"
            classes="w-[70%]"
            label="Cidade"
            options={cities || []}
            displayKey="nome"
            onSelect={value => handleUserDataChange('cidade', value)}
            value={userData.cidade}
          />
        </View>
        <Input
          placeholder="Digite seu telefone"
          classes="mb-4 w-full"
          label="Telefone"
          keyboardType="numeric"
          onChangeText={text =>
            handleUserDataChange('telefone', maskPhone(text))
          }
          value={userData.telefone}
        />

        <View className="flex flex-1 justify-end">
          <Button className="w-full" onPress={onPressNext}>
            <Text className="text-slate-50 text-base">Próximo</Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Contact;
