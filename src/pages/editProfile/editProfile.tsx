import {KeyboardAvoidingView, ScrollView, Text, View} from 'react-native';
import Header from '../../components/header/header';
import Avatar from '../../components/avatar/avatar';
import {
  getFirstAndLastName,
  getNameInitials,
  maskCep,
  maskPhone,
  turnIntoTitleCase,
} from '../../lib/utils/formatters';
import useUser from '../../lib/hooks/useUser';
import Input from '../../components/input/input';
import useEditUserProfileHandler from './hooks/useEditUserProfileHandler';
import {useEffect} from 'react';
import {
  useGetCities,
  useGetStates,
} from '../../lib/api/tanstackQuery/ibge/placesRequests';
import {useGetAddresByCep} from '../../lib/api/tanstackQuery/viaCep/cepRequest';
import ComboBox from '../../components/input/comboBox';
import Button from '../../components/button/button';

const EditProfile = () => {
  const {user} = useUser();

  const {userData, handleUserDataChange, userDataErrors, handleUpdateUser} =
    useEditUserProfileHandler();

  const {data: states} = useGetStates();
  const {data: cities} = useGetCities();
  const {mutate: getAddresByCep, data: address} = useGetAddresByCep();

  useEffect(() => {
    handleUserDataChange('nome', user?.nome ?? '');
    handleUserDataChange('cep', user?.cep ?? '');
    handleUserDataChange('endereco', user?.endereco ?? '');
    handleUserDataChange('numero', user?.numero ?? '');
    handleUserDataChange('complemento', user?.complemento ?? '');
    handleUserDataChange(
      'uf',
      states?.find(state => state.sigla === user?.uf),
    );
    handleUserDataChange(
      'cidade',
      cities?.find(city => city.nome === user?.cidade),
    );
    handleUserDataChange('telefone', user?.telefone ?? '');
  }, [user]);

  useEffect(() => {
    if (user?.cep === userData.cep) return;

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
    <>
      <Header hasBackButton />

      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View className="bg-sky-500 flex items-center justify-center py-6">
            <Avatar fallback={getNameInitials(user?.nome ?? '')} size="xl" />
            <Text className="text-lg font-bold mt-3">
              {turnIntoTitleCase(getFirstAndLastName(user?.nome ?? ''))}
            </Text>
          </View>

          <View className="flex-1 p-7">
            <Input
              placeholder="Digite seu nome completo"
              classes="mb-4 w-full"
              label="Nome"
              value={userData.nome || ''}
              onChangeText={text => handleUserDataChange('nome', text)}
              notification={userDataErrors.nome || ''}
            />

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
              <Button className="w-full" onPress={handleUpdateUser}>
                <Text className="text-slate-50 text-lg">Salvar</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default EditProfile;