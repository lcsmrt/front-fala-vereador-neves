import {Modal} from 'react-native';
import {useBottomSheetContext} from '../../lib/contexts/useBottomSheetContext';
import BottomSheet from './bottomSheet';

const AppBottomSheet = () => {
  const {isBottomSheetVisible, setIsBottomSheetVisible} =
    useBottomSheetContext();
  return (
    <Modal transparent visible={isBottomSheetVisible} animationType="none">
      <BottomSheet
        isBottomSheetVisible={isBottomSheetVisible}
        onCloseBottomSheet={() => setIsBottomSheetVisible(false)}>
        <></>
      </BottomSheet>
    </Modal>
  );
};

export default AppBottomSheet;
