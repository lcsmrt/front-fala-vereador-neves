import {ActivityIndicator, Modal} from 'react-native';
import {useLoadingContext} from '../../lib/contexts/useLoadingContext';
import Backdrop from '../backdrop/backdrop';

const Loading = () => {
  const {isLoading} = useLoadingContext();

  if (!isLoading) return null;

  return (
    <Modal transparent visible={isLoading} animationType="none">
      <Backdrop open={isLoading}>
        <ActivityIndicator size="large" color="#fff" />
      </Backdrop>
    </Modal>
  );
};

export default Loading;
