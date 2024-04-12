import {Text, View} from 'react-native';
import Button from '../button/button';
import {useNavigation} from '@react-navigation/native';

interface HeaderProps {
  hasBackButton?: boolean;
}

const Header = ({hasBackButton}: HeaderProps) => {
  const navigation = useNavigation();
  
  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <View className="flex h-14 flex-row items-center justify-between p-4 bg-sky-500 shadow-lg">
        {hasBackButton && (
          <View>
            <Button variant="ghost" onPress={onBackPress}>
              <Text className="text-slate-50">Voltar</Text>
            </Button>
          </View>
        )}
      </View>
    </>
  );
};

export default Header;
