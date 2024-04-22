import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Backdrop from '../backdrop/backdrop';
import {
  Gesture,
  GestureDetector,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import {useEffect} from 'react';

interface DrawerProps {
  children: React.ReactNode;
  isDrawerVisible: boolean;
  onCloseDrawer: () => void;
}

const Drawer = gestureHandlerRootHOC(
  ({children, isDrawerVisible, onCloseDrawer}: DrawerProps) => {
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
      offset.value = withTiming(-1000, {duration: 300}, () => {
        runOnJS(onCloseDrawer)();
      });
    };

    const panGesture = Gesture.Pan()
      .onUpdate(event => {
        const newPosition = offset.value + event.translationX;
        if (newPosition >= 0) {
          offset.value = 0;
        } else if (newPosition <= -1000) {
          offset.value = -1000;
        } else {
          offset.value = event.translationX;
        }
      })
      .onEnd(event => {
        if (event.translationX < -100) {
          runOnJS(handleCloseDrawer)();
        } else {
          offset.value = withTiming(0);
        }
      });

    return (
      <>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            className="absolute w-[80%] h-screen bg-white left-0 flex flex-col py-7 z-50"
            style={animatedStyle}>
            {children}
          </Animated.View>
        </GestureDetector>
        <Backdrop open={isDrawerVisible} onPress={handleCloseDrawer} />
      </>
    );
  },
);

export default Drawer;
