import clsx from 'clsx';
import {Image, Text, View} from 'react-native';

interface AvatarProps {
  src?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar = ({src, fallback, size}: AvatarProps) => {
  const avatarStyles = clsx(
    'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white',
    size === 'sm' ? 'h-10 w-10' : size === 'lg' ? 'h-16 w-16' : size === 'xl' ? 'h-24 w-24' : 'h-12 w-12',
  );

  const textStyles = clsx(
    size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg',
  );

  return (
    <View className={avatarStyles}>
      {src && (
        <Image source={{uri: src}} className="aspect-square h-full w-full" />
      )}
      {fallback && (
        <View className="flex h-full w-full items-center justify-center rounded-full bg-slate-200">
          <Text className={textStyles}>{fallback}</Text>
        </View>
      )}
    </View>
  );
};

export default Avatar;
