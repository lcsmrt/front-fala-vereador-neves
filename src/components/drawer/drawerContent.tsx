import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated';
import {Text, View} from 'react-native';
import Avatar from '../avatar/avatar';
import Separator from '../separator/separator';
import Button from '../button/button';
import Backdrop from '../backdrop/backdrop';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useUser from '../../lib/hooks/useUser';
import {
  getFirstAndLastName,
  getNameInitials,
  turnIntoTitleCase,
} from '../../lib/utils/formatters';
import {useDrawerContext} from '../../lib/contexts/useDrawerContext';

interface DrawerContentProps {
  animatedStyle: {
    transform: {
      translateX: number;
    }[];
  };
  onClose: () => void;
}

const DrawerContent = ({animatedStyle, onClose}: DrawerContentProps) => {
  const {isDrawerVisible} = useDrawerContext();
  const navigation = useNavigation();
  const {user} = useUser();

  // const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
  //   onStart: (_, context) => {
  //     context.startX = translateX.value;
  //   },
  //   onActive: (event, context) => {
  //     translateX.value = context.startX + event.translationX;
  //   },
  //   onEnd: (event) => {
  //     if (translateX.value < -100) { // Drawer swipe threshold
  //       translateX.value = withTiming(-1000, { duration: 500 }, () => {
  //         runOnJS(onClose)();
  //       });
  //     } else {
  //       translateX.value = withSpring(0);
  //     }
  //   },
  // });

  return (
    <>
      <PanGestureHandler onGestureEvent={() => {}}>
        <Animated.View
          className="absolute w-[80%] h-screen bg-white left-0 flex flex-col py-7 z-50"
          style={animatedStyle}>
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
                (navigation as NavigationProp<any, any>).navigate('Login');
                onClose();
              }}>
              <Text className="text-lg">Sair</Text>
            </Button>
          </View>
        </Animated.View>
      </PanGestureHandler>
      <Backdrop open={isDrawerVisible} onPress={onClose} />
    </>
  );
};

export default DrawerContent;
