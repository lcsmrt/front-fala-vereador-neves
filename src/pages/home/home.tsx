import {FlatList, RefreshControl, Text, View} from 'react-native';
import Header from '../../components/header/header';
import Avatar from '../../components/avatar/avatar';
import {
  getFirstAndLastName,
  getNameInitials,
  turnIntoTitleCase,
} from '../../lib/utils/formatters';
import Card from '../../components/card/card';
import useUser from '../../lib/hooks/useUser';
import useUserSolicitations from './hooks/useUserSolicitations';
import useUserSolicitationsKpis from './hooks/useUseSolicitationsKpis';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation: NavigationProp<any, any> = useNavigation();

  const {user} = useUser();
  const {isSolicitationsLoading, getUserSolicitations, solicitations} =
    useUserSolicitations(user);
  const {
    isSolicitationsKpisLoading,
    getUserSolicitationsKpis,
    solicitationsKpis,
  } = useUserSolicitationsKpis(user);

  return (
    <>
      <Header hasBackButton hasHambugerMenu />

      <View className="flex-1">
        <View className="absolute inset-0 w-full h-48 bg-sky-500 z-[-1]" />

        <View className="p-4 w-full">
          <View className="flex flex-row items-center">
            <Avatar fallback={getNameInitials(user?.nome ?? '')} size="lg" />
            <View className="ml-5">
              <Text className="text-lg">{`Bem vind${
                user?.sexo === 'F' ? 'a' : user?.sexo === 'M' ? 'o' : 'o(a)'
              },`}</Text>
              <Text className="text-lg font-bold">
                {turnIntoTitleCase(getFirstAndLastName(user?.nome ?? ''))}
              </Text>
            </View>
          </View>
          <Text className="text-lg font-bold mt-6">Solicitações</Text>
        </View>

        <View className="w-full flex flex-row justify-between px-4">
          <Card touchable hasShadow classes="items-center px-2 py-4 w-[32%]">
            <Text className="text-xl text-green-700 font-semibold">
              {solicitationsKpis?.abertas}
            </Text>
            <Text>Abertas</Text>
          </Card>
          <Card touchable hasShadow classes="items-center px-2 py-4 w-[32%]">
            <Text className="text-xl text-yellow-600 font-semibold">
              {solicitationsKpis?.emAndamento}
            </Text>
            <Text>Andamento</Text>
          </Card>
          <Card touchable hasShadow classes="items-center px-2 py-4 w-[32%]">
            <Text className="text-xl text-red-700 font-semibold">
              {solicitationsKpis?.encerradas}
            </Text>
            <Text>Encerradas</Text>
          </Card>
        </View>

        <View className="flex justify-center items-center flex-1 px-4">
          {solicitations?.length ? (
            <FlatList
              className="w-full mt-4"
              data={solicitations}
              renderItem={({item}) => (
                <Card
                  touchable
                  hasShadow
                  classes="w-full mb-4 p-4 flex flex-row items-center"
                  onPress={() =>
                    navigation.navigate('Chat', {solicitation: item})
                  }>
                  <Avatar
                    size="lg"
                    fallback={getNameInitials(item.vereador?.nomeCivil ?? '')}
                  />
                  <View className="ml-4">
                    <Text className="font-semibold mb-1">
                      {item.vereador?.nomePopular ?? ''}
                    </Text>
                    <Text className="font-medium text-xs mb-1">{`Protocolo: ${
                      item.protocolo ?? ''
                    }`}</Text>
                    <Text className="font-semibold text-xs">
                      {item.statusSolicitacao?.descricao ?? ''}
                    </Text>
                  </View>
                </Card>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={
                    isSolicitationsLoading || isSolicitationsKpisLoading
                  }
                  onRefresh={() => {
                    getUserSolicitations();
                    getUserSolicitationsKpis();
                  }}
                />
              }
            />
          ) : (
            <>
              {!isSolicitationsLoading && (
                <Text className="text-base text-center mb-20">
                  Nenhuma solicitação encontrada.
                </Text>
              )}
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default Home;
