import clsx from 'clsx';
import {Image, Text, TouchableOpacity, View} from 'react-native';

interface AvatarProps {
  src?: string | null;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  touchable?: boolean;
  onPress?: () => void;
}

const Avatar = ({src, fallback, size, touchable, onPress}: AvatarProps) => {
  const avatarStyles = clsx(
    'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white',
    size === 'sm'
      ? 'h-10 w-10'
      : size === 'lg'
      ? 'h-16 w-16'
      : size === 'xl'
      ? 'h-24 w-24'
      : 'h-12 w-12',
  );

  const textStyles = clsx(
    'text-slate-700',
    size === 'sm'
      ? 'text-base'
      : size === 'lg'
      ? 'text-xl'
      : size === 'xl'
      ? 'text-2xl'
      : 'text-lg',
  );

  const imageSource = src ? `data:image/jpeg;base64,${src}` : '';

  return (
    <>
      {touchable ? (
        <TouchableOpacity className={avatarStyles} onPress={onPress}>
          {src && (
            <Image
              source={{uri: imageSource}}
              style={{aspectRatio: 1, width: '100%'}}
            />
          )}
          {fallback && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 9999,
                backgroundColor: '#D1D5DB',
              }}>
              <Text className={textStyles}>{fallback}</Text>
            </View>
          )}
        </TouchableOpacity>
      ) : (
        <View className={avatarStyles}>
          {src && (
            <Image
              source={{uri: imageSource}}
              style={{aspectRatio: 1, width: '100%'}}
            />
          )}
          {fallback && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 9999,
                backgroundColor: '#D1D5DB',
              }}>
              <Text className={textStyles}>{fallback}</Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default Avatar;
