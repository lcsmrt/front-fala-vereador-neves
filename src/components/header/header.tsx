import {View} from 'react-native';
import Button from '../button/button';
import {useNavigation} from '@react-navigation/native';
import ArrowLeftIcon from '../../assets/icons/arrowLeft';
import MenuIcon from '../../assets/icons/menu';
import {useDrawerContext} from '../../lib/contexts/useDrawerContext';

interface HeaderProps {
  hasBackButton?: boolean;
  hasHambugerMenu?: boolean;
  children?: React.ReactNode;
}

const Header = ({hasBackButton, hasHambugerMenu, children}: HeaderProps) => {
  const navigation = useNavigation();

  const {setIsDrawerVisible} = useDrawerContext();
  const onBackPress = () => {
    navigation.goBack();
  };
  const onMenuPress = () => {
    setIsDrawerVisible(true);
  };

  return (
    <>
      <View className="flex h-14 flex-row items-center justify-between p-4 bg-sky-500 shadow-lg">
        {children ? (
          children
        ) : (
          <>
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
                <Button variant="ghost" size="icon" onPress={onMenuPress}>
                  <MenuIcon stroke="#fff" />
                </Button>
              </View>
            ) : (
              <View />
            )}
          </>
        )}
      </View>
    </>
  );
};

export default Header;
