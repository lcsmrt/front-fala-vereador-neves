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
import ImageCropPicker from 'react-native-image-crop-picker';
import {Document} from '../../lib/types/system/document';

const EditProfile = () => {
  const {user, userProfileImage } = useUser();

  const {
    userData,
    handleUserDataChange,
    file,
    setFile,
    userDataErrors,
    handleUpdateUser,
  } = useEditUserProfileHandler();

  const {data: states} = useGetStates();
  const {data: cities} = useGetCities();
  const {mutate: getAddresByCep, data: address} = useGetAddresByCep();

  useEffect(() => {
    handleUserDataChange('nome', user?.nome ?? '');
    handleUserDataChange('cep', user?.cep ?? '');
    handleUserDataChange('endereco', user?.endereco ?? '');
    handleUserDataChange(
      'numero',
      user?.numero
        ? typeof user?.numero === 'number'
          ? String(user?.numero)
          : user?.numero
        : '',
    );
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
    handleUserDataChange('profileImage', userProfileImage);
  }, [user, userProfileImage]);

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

  const handleSelectImage = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then(image => {
        if (image?.data) {
          setFile({
            nome: image.filename ?? 'profile-image',
            contentType: image.mime,
            documento: image.data,
          });
        }
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          console.log('User canceled the image picker');
        } else {
          console.log('Error selecting image:', error.message);
        }
      });
  };

  return (
    <>
      <Header hasBackButton />

      <KeyboardAvoidingView behavior={'padding'} style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View className="bg-sky-500 flex items-center justify-center py-6">
            <Avatar
              touchable
              onPress={handleSelectImage}
              src={file?.documento ?? userData.profileImage}
              fallback={getNameInitials(user?.nome ?? '')}
              size="xl"
            />
            <Text className="text-lg font-bold mt-3 text-slate-700">
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
