import {TouchableOpacity} from 'react-native';

interface BackdropProps {
  open: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
}

const Backdrop = ({open, children, onPress}: BackdropProps) => {
  return (
    <>
      {open && (
        <TouchableOpacity
          className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onPress={onPress}
          activeOpacity={1}>
          {children}
        </TouchableOpacity>
      )}
    </>
  );
};

export default Backdrop;
