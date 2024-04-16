import {Text, View} from 'react-native';
import Header from '../../components/header/header';
import Avatar from '../../components/avatar/avatar';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {User} from '../../lib/types/user';
import {
  getFirstAndLastName,
  getNameInitials,
  turnIntoTitleCase,
} from '../../lib/utils/formatters';
import Card from '../../components/card/card';

const Home = () => {
  const [user, setUser] = useState<User>({} as User);

  useFocusEffect(
    useCallback(() => {
      const getUser = async () => {
        try {
          const user = await EncryptedStorage.getItem('user');
          user && setUser(JSON.parse(user));
          console.log('Usuário: ', user);
        } catch (error) {
          console.error('Erro ao acessar os dados do usuário: ', error);
        }
      };

      getUser();
    }, []),
  );

  return (
    <>
      <Header hasBackButton hasHambugerMenu />

      <View className="flex-1">
        <View className="absolute inset-0 w-full h-48 bg-sky-500 z-[-1]" />

        <View className="p-4 w-full">
          <View className="flex flex-row items-center">
            <Avatar fallback={getNameInitials(user.nome ?? '')} size="lg" />
            <View className="ml-5">
              <Text className="text-lg">{`Bem vind${
                user?.sexo === 'F' ? 'a' : user?.sexo === 'M' ? 'o' : 'o(a)'
              },`}</Text>
              <Text className="text-lg font-bold">
                {turnIntoTitleCase(getFirstAndLastName(user.nome ?? ''))}
              </Text>
            </View>
          </View>
          <Text className="text-lg font-bold mt-6">Solicitações</Text>
        </View>

        <View className="w-full flex flex-row justify-between px-4">
          <Card touchable hasShadow classes="items-center px-2 py-4 w-[32%]">
            <Text className="text-xl text-green-700 font-semibold">0</Text>
            <Text>Abertas</Text>
          </Card>
          <Card touchable hasShadow classes="items-center px-2 py-4 w-[32%]">
            <Text className="text-xl text-yellow-600 font-semibold">0</Text>
            <Text>Andamento</Text>
          </Card>
          <Card touchable hasShadow classes="items-center px-2 py-4 w-[32%]">
            <Text className="text-xl text-red-700 font-semibold">0</Text>
            <Text>Encerradas</Text>
          </Card>
        </View>

        <View className="flex justify-center items-center flex-1">
          {false ? (
            <></>
          ) : (
            <Text className="text-base text-center mb-20">
              Nenhuma solicitação encontrada.
            </Text>
          )}
        </View>
      </View>
    </>
  );
};

export default Home;
