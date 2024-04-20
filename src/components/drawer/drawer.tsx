import Animated from 'react-native-reanimated';
import Button from '../button/button';
import {useDrawerContext} from '../../lib/contexts/useDrawerContext';
import {Text} from 'react-native';

const Drawer = () => {
  const {setIsDrawerVisible} = useDrawerContext();

  return (
    <Animated.View className="absolute w-[85%] h-screen bg-white left-0 flex flex-col p-4 items-start">
      <Button variant="ghost">
        <Text className='text-lg'>Sair</Text>
      </Button>
    </Animated.View>
  );
};

export default Drawer;
