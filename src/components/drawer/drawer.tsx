import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Modal} from 'react-native';
import {useDrawerContext} from '../../lib/contexts/useDrawerContext';
import {useEffect} from 'react';
import DrawerContent from './drawerContent';

const Drawer = () => {
  const {isDrawerVisible, setIsDrawerVisible} = useDrawerContext();
  const offset = useSharedValue(-1000);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });

  useEffect(() => {
    offset.value = withTiming(isDrawerVisible ? 0 : -1000, {duration: 300});
  }, [isDrawerVisible]);

  const handleCloseDrawer = () => {
    offset.value = withTiming(-1000, {duration: 300}, () =>
      runOnJS(setIsDrawerVisible)(false),
    );
  };

  return (
    <>
      <Modal transparent visible={isDrawerVisible} animationType="none">
        <DrawerContent
          animatedStyle={animatedStyle}
          onClose={handleCloseDrawer}
        />
      </Modal>
    </>
  );
};

export default Drawer;
