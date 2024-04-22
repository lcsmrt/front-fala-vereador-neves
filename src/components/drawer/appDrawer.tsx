import {Modal, Text, View} from 'react-native';
import Drawer from './drawer';
import Avatar from '../avatar/avatar';
import {
  getFirstAndLastName,
  getNameInitials,
  turnIntoTitleCase,
} from '../../lib/utils/formatters';
import useUser from '../../lib/hooks/useUser';
import Separator from '../separator/separator';
import Button from '../button/button';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDrawerContext} from '../../lib/contexts/useDrawerContext';

const AppDrawer = () => {
  const navigation: NavigationProp<any, any> = useNavigation();
  const {user} = useUser();
  const {isDrawerVisible, setIsDrawerVisible} = useDrawerContext();

  return (
    <Modal transparent visible={isDrawerVisible} animationType="none">
      <Drawer
        isDrawerVisible={isDrawerVisible}
        onCloseDrawer={() => setIsDrawerVisible(false)}>
        <>
          <View className="px-8 w-full">
            <View className="flex flex-row items-center">
              <Avatar fallback={getNameInitials(user?.nome ?? '')} size="lg" />
              <Text className="text-lg font-bold ml-3">
                {turnIntoTitleCase(getFirstAndLastName(user?.nome ?? ''))}
              </Text>
            </View>
            <Separator orientation="horizontal" classes="mt-6" />
          </View>
          <View className="flex-1 w-full px-8 mt-6">
            <Button variant="ghost" className="w-full items-start">
              <Text className="text-lg">Editar Perfil</Text>
            </Button>
            <Button variant="ghost" className="w-full items-start">
              <Text className="text-lg">Tema</Text>
            </Button>
          </View>
          <View className="w-full px-8">
            <Separator orientation="horizontal" classes="mb-6" />
            <Button
              variant="ghost"
              className="w-full items-start"
              onPress={() => {
                setIsDrawerVisible(false);
                navigation.navigate('Login');
              }}>
              <Text className="text-lg">Sair</Text>
            </Button>
          </View>
        </>
      </Drawer>
    </Modal>
  );
};

export default AppDrawer;
