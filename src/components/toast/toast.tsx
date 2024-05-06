import clsx from 'clsx';
import {useEffect} from 'react';
import {Animated, Text} from 'react-native';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

const Toast = ({message, type, onClose}: ToastProps) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(onClose);
  }, [message]);

  const toastStyle = clsx(
    'absolute bottom-12 left-0 right-0 items-center justify-center p-3 rounded-lg mx-5',
    {
      'bg-green-500': type === 'success',
      'bg-red-500': type === 'error',
      'bg-yellow-500': type === 'warning',
      'bg-blue-500': type === 'info',
    },
  );

  return (
    <Animated.View className={toastStyle}>
      <Text className="text-slate-50">{message}</Text>
    </Animated.View>
  );
};

export default Toast;
