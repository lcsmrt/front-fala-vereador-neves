import {Modal, Text, View} from 'react-native';
import {useBottomSheetContext} from '../../lib/contexts/useBottomSheetContext';
import BottomSheet from './bottomSheet';
import Separator from '../separator/separator';
import Input from '../input/input';

const AppBottomSheet = () => {
  const {isBottomSheetVisible, setIsBottomSheetVisible} =
    useBottomSheetContext();

  return (
    <Modal transparent visible={isBottomSheetVisible} animationType="none">
      <BottomSheet
        isBottomSheetVisible={isBottomSheetVisible}
        onCloseBottomSheet={() => setIsBottomSheetVisible(false)}>
        <View className="w-full">
          <Text className="text-center font-semibold text-lg">
            Nova Solicitação
          </Text>
          <Separator orientation="horizontal" classes="mt-5" />
        </View>
        <View className="w-full">
          <Input inputSize="sm" label="Vereador" />
          <Input inputSize="sm" label="Tipo de Solicitação" />
          <Input inputSize="sm" label="Assunto" />
          <Input inputSize="lg" label="Conteúdo" />
        </View>
      </BottomSheet>
    </Modal>
  );
};

export default AppBottomSheet;
