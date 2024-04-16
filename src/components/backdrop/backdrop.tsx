import {View} from 'react-native';

interface BackdropProps {
  open: boolean;
  children?: React.ReactNode;
}

const Backdrop = ({open, children}: BackdropProps) => {
  return (
    <>
      {open && (
        <View className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-black/70 backdrop-blur-sm">
          {children}
        </View>
      )}
    </>
  );
};

export default Backdrop;