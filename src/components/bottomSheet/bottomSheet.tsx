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

interface BottomSheetProps {
  children: React.ReactNode;
  isBottomSheetVisible: boolean;
  onCloseBottomSheet: () => void;
}

const BottomSheet = gestureHandlerRootHOC(
  ({children, isBottomSheetVisible, onCloseBottomSheet}: BottomSheetProps) => {
    const offset = useSharedValue(1000);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateY: offset.value}],
      };
    });

    useEffect(() => {
      offset.value = withTiming(isBottomSheetVisible ? 0 : 1000, {
        duration: 300,
      });
    }, [isBottomSheetVisible]);

    const handleCloseDrawer = () => {
      offset.value = withTiming(1000, {duration: 300}, () => {
        runOnJS(onCloseBottomSheet)();
      });
    };

    const panGesture = Gesture.Pan()
      .onUpdate(event => {
        const newPosition = offset.value + event.translationY;
        if (newPosition < 0) {
          offset.value = 0;
        } else {
          offset.value = event.translationY;
        }
      })
      .onEnd(event => {
        if (event.translationY > 300) {
          runOnJS(handleCloseDrawer)();
        } else {
          offset.value = withTiming(0);
        }
      });

    return (
      <>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            className="absolute flex-1 w-full h-fit bg-white bottom-0 flex flex-col py-6 px-8 z-50 rounded-t-3xl"
            style={animatedStyle}>
            {children}
          </Animated.View>
        </GestureDetector>
        <Backdrop open={isBottomSheetVisible} onPress={handleCloseDrawer} />
      </>
    );
  },
);

export default BottomSheet;
