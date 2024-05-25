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
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/button/button';
import PlusIcon from '../../assets/icons/plus';
import {useBottomSheetContext} from '../../lib/contexts/useBottomSheetContext';
import {HomeScreenNavigationProp} from '../../lib/types/system/navigation';
import clsx from 'clsx';
import {useSolicitationUpdateContext} from '../../lib/contexts/useSolicitationUpdateContext';
import {useEffect, useState} from 'react';
import {
  CLOSED_SOLICITATION_STATUS,
  IN_PROGRESS_SOLICITATION_STATUS,
  OPEN_SOLICITATION_STATUS,
} from '../../lib/utils/constants';
import { requestPermissions } from '../../lib/utils/permissions';

const Home = () => {
  const navigation: HomeScreenNavigationProp = useNavigation();

  const [selectedStatus, setSelectedStatus] = useState<number | string>('');

  const {setIsBottomSheetVisible} = useBottomSheetContext();
  const {user, userProfileImage, setTrigger} = useUser();
  const {solicitationUpdatesCount} = useSolicitationUpdateContext();
  const {isSolicitationsLoading, getUserSolicitations, solicitations} =
    useUserSolicitations(user, solicitationUpdatesCount, selectedStatus);
  const {
    isSolicitationsKpisLoading,
    getUserSolicitationsKpis,
    solicitationsKpis,
  } = useUserSolicitationsKpis(user, solicitationUpdatesCount);

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <>
      <Header hasHambugerMenu />

      <View className="flex-1">
        <View className="absolute inset-0 w-full h-48 bg-sky-500 z-[-1]" />

        <View className="p-4 w-full">
          <View className="flex flex-row items-center">
            <Avatar
              src={userProfileImage}
              fallback={getNameInitials(user?.nome ?? '')}
              size="lg"
            />
            <View className="ml-5">
              <Text className="text-lg text-slate-700">{`Bem vind${
                user?.sexo === 'F' ? 'a' : user?.sexo === 'M' ? 'o' : 'o(a)'
              },`}</Text>
              <Text className="text-lg font-bold text-slate-700">
                {turnIntoTitleCase(getFirstAndLastName(user?.nome ?? ''))}
              </Text>
            </View>
          </View>
          <Text className="text-lg font-bold mt-6 text-slate-700">
            Solicitações
          </Text>
        </View>

        <View className="w-full flex flex-row justify-between px-4">
          <Card
            touchable
            hasShadow
            classes={`items-center px-2 py-4 w-[32%] ${
              selectedStatus === OPEN_SOLICITATION_STATUS ? 'bg-slate-200' : ''
            }`}
            onPress={() => {
              selectedStatus === OPEN_SOLICITATION_STATUS
                ? setSelectedStatus('')
                : setSelectedStatus(OPEN_SOLICITATION_STATUS);
            }}>
            <Text className="text-xl text-green-700 font-semibold">
              {solicitationsKpis?.abertas}
            </Text>
            <Text className="text-slate-700">Abertas</Text>
          </Card>
          <Card
            touchable
            hasShadow
            classes={`items-center px-2 py-4 w-[32%]
            ${
              selectedStatus === IN_PROGRESS_SOLICITATION_STATUS
                ? 'bg-slate-200'
                : ''
            }
            `}
            onPress={() => {
              selectedStatus === IN_PROGRESS_SOLICITATION_STATUS
                ? setSelectedStatus('')
                : setSelectedStatus(IN_PROGRESS_SOLICITATION_STATUS);
            }}>
            <Text className="text-xl text-yellow-600 font-semibold">
              {solicitationsKpis?.emAndamento}
            </Text>
            <Text className="text-slate-700">Andamento</Text>
          </Card>
          <Card
            touchable
            hasShadow
            classes={`items-center px-2 py-4 w-[32%]
            ${
              selectedStatus === CLOSED_SOLICITATION_STATUS
                ? 'bg-slate-200'
                : ''
            }
            
            `}
            onPress={() => {
              selectedStatus === CLOSED_SOLICITATION_STATUS
                ? setSelectedStatus('')
                : setSelectedStatus(CLOSED_SOLICITATION_STATUS);
            }}>
            <Text className="text-xl text-red-700 font-semibold">
              {solicitationsKpis?.encerradas}
            </Text>
            <Text className="text-slate-700">Encerradas</Text>
          </Card>
        </View>

        <FlatList
          className="w-full mt-4 flex-1 px-4"
          data={solicitations}
          renderItem={({item}) => (
            <Card
              touchable
              hasShadow
              classes="w-full mb-4 p-4 flex flex-row items-center"
              onPress={() => navigation.navigate('Chat', {solicitation: item})}>
              <View
                className={clsx(
                  'h-full w-2 rounded-lg',
                  item.statusSolicitacao?.pk === 1 && 'bg-green-700',
                  item.statusSolicitacao?.pk === 2 && 'bg-yellow-600',
                  item.statusSolicitacao?.pk === 3 && 'bg-red-700',
                )}
              />
              <View className="ml-4">
                {!user?.vereador ? (
                  <Text className="font-semibold mb-1 text-slate-700">
                    {item.vereador?.nomePopular ?? ''}
                  </Text>
                ) : item.anonimo === '1' ? (
                  <Text className="font-semibold mb-1 text-slate-700">
                    Anônimo
                  </Text>
                ) : (
                  <Text className="font-semibold mb-1 text-slate-700">
                    {turnIntoTitleCase(
                      getFirstAndLastName(item.usuarioAbertura?.nome ?? ''),
                    )}
                  </Text>
                )}
                <Text className="font-medium text-xs mb-1 text-slate-700">{`Protocolo: ${
                  item.protocolo ?? ''
                }`}</Text>
                <Text className="font-semibold text-xs text-slate-700">
                  {item.statusSolicitacao?.descricao ?? ''}
                </Text>
              </View>
            </Card>
          )}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center mt-20">
              <Text className="text-base text-center text-slate-700">
                Nenhuma solicitação encontrada.
              </Text>
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={isSolicitationsLoading || isSolicitationsKpisLoading}
              onRefresh={() => {
                getUserSolicitations();
                getUserSolicitationsKpis();
                setTrigger(prev => prev + 1);
              }}
            />
          }
        />
      </View>

      {!user?.vereador && (
        <View className="absolute bottom-0 right-0 mr-4 mb-4">
          <Button
            className="rounded-full h-20 w-20"
            onPress={() => setIsBottomSheetVisible(true)}>
            <PlusIcon stroke="#fff" />
          </Button>
        </View>
      )}
    </>
  );
};

export default Home;
