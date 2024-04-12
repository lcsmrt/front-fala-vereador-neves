import {Image, Text, View} from 'react-native';

interface AvatarProps {
  src?: string;
  fallback?: string;
}

const Avatar = ({src, fallback}: AvatarProps) => {
  return (
    <View className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white">
      {src && (
        <Image source={{uri: src}} className="aspect-square h-full w-full" />
      )}
      {fallback && (
        <View className="flex h-full w-full items-center justify-center rounded-full bg-slate-200">
          <Text className="">{fallback}</Text>
        </View>
      )}
    </View>
  );
};

export default Avatar;
