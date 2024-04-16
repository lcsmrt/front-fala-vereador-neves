import {View} from 'react-native';
import Button from '../button/button';
import {useNavigation} from '@react-navigation/native';
import ArrowLeftIcon from '../../assets/icons/arrowLeft';
import MenuIcon from '../../assets/icons/menu';

interface HeaderProps {
  hasBackButton?: boolean;
  hasHambugerMenu?: boolean;
}

const Header = ({hasBackButton, hasHambugerMenu}: HeaderProps) => {
  const navigation = useNavigation();
  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <View className="flex h-14 flex-row items-center justify-between p-4 bg-sky-500 shadow-lg">
        {hasBackButton ? (
          <View>
            <Button variant="ghost" size="icon" onPress={onBackPress}>
              <ArrowLeftIcon stroke="#fff" />
            </Button>
          </View>
        ) : (
          <View />
        )}
        {hasHambugerMenu ? (
          <View>
            <Button variant="ghost" size="icon">
              <MenuIcon stroke="#fff" />
            </Button>
          </View>
        ) : (
          <View />
        )}
      </View>
    </>
  );
};

export default Header;
