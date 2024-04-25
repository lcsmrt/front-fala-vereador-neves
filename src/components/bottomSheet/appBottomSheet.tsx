import {Modal, Text, View} from 'react-native';
import {useBottomSheetContext} from '../../lib/contexts/useBottomSheetContext';
import BottomSheet from './bottomSheet';
import Separator from '../separator/separator';
import Input from '../input/input';
import Select from '../input/select';
import {useGetAldermans} from '../../lib/api/tanstackQuery/aldermanRequests';
import {useGetSolicitationTypes} from '../../lib/api/tanstackQuery/solicitationTypeRequests';
import useValidation from '../../lib/hooks/useValidation';
import Button from '../button/button';
import Switch from '../input/switch';
import {useOpenSolicitation} from '../../lib/api/tanstackQuery/solicitationRequests';
import {useEffect} from 'react';
import {useLoadingContext} from '../../lib/contexts/useLoadingContext';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const AppBottomSheet = () => {
  const navigation: NavigationProp<any, any> = useNavigation();

  const {isBottomSheetVisible, setIsBottomSheetVisible} =
    useBottomSheetContext();

  const {data: aldermans} = useGetAldermans();
  const {data: solicitationTypes} = useGetSolicitationTypes();

  const {values, handleChange, validateForm} = useValidation({});

  const {
    mutate: openSolicitation,
    isPending: isOpeningSolicitation,
    isSuccess: isSolicitationOpened,
  } = useOpenSolicitation();

  const {setIsLoading} = useLoadingContext();

  const handleOpenSolicitation = () => {
    if (validateForm()) {
      const solicitation = {
        assunto: values.assunto,
        conteudo: values.conteudo,
        topico: values.topico,
        anonimo: values.anonimo,
        vereador: values.vereador || null,
      };

      try {
        openSolicitation(solicitation);
      } catch {
        console.error('Erro ao abrir solicitação');
      }
    }
  };

  useEffect(() => {
    setIsLoading(isOpeningSolicitation);
  }, [isOpeningSolicitation]);

  useEffect(() => {
    if (isSolicitationOpened) {
      setIsBottomSheetVisible(false);
      navigation.navigate('Chat');
    }
  }, [isSolicitationOpened]);

  return (
    <Modal transparent visible={isBottomSheetVisible} animationType="none">
      <BottomSheet
        isBottomSheetVisible={isBottomSheetVisible}
        onCloseBottomSheet={() => setIsBottomSheetVisible(false)}>
        <View className="w-full">
          <Text className="text-center font-semibold text-lg">
            Nova Solicitação
          </Text>
          <Separator orientation="horizontal" classes="mt-4 mb-1" />
        </View>
        <View className="w-full">
          <Select
            options={aldermans || []}
            onSelect={value => handleChange('vereador', value)}
            displayKey="nomePopular"
            label="Vereador"
            placeholder="Selecione o vereador"
            size="sm"
            classes="w-full mb-2"
          />
          <Select
            options={solicitationTypes || []}
            onSelect={value => handleChange('topico', value)}
            displayKey="topico"
            label="Tipo de Solicitação"
            placeholder="Selecione o tipo de solicitação"
            size="sm"
            classes="w-full mb-2"
          />
          <Input
            inputSize="sm"
            label="Assunto"
            value={values.assunto}
            onChangeText={text => handleChange('assunto', text)}
            classes="w-full mb-2"
          />
          <Input
            label="Conteúdo"
            value={values.conteudo}
            onChangeText={text => handleChange('conteudo', text)}
            multiline
            inputSize="multiline"
            classes="w-full"
          />
        </View>

        <View className="flex flex-row items-center justify-between mt-4">
          <View>
            <Text>Anônimo</Text>
            <Text className="text-xs text-slate-400 mt-1">
              Sua identidade será ocultada
            </Text>
          </View>
          <Switch
            value={values.anonimo}
            onToggle={value => handleChange('anonimo', value)}
          />
        </View>

        <View className="flex-1 flex justify-end mt-6">
          <Button className="w-full" onPress={handleOpenSolicitation}>
            <Text className="text-slate-50 text-lg">Enviar</Text>
          </Button>
        </View>
      </BottomSheet>
    </Modal>
  );
};

export default AppBottomSheet;
