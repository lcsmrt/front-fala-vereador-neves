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
import {useToastContext} from '../../lib/contexts/useToastContext';

const AppBottomSheet = () => {
  const {isBottomSheetVisible, setIsBottomSheetVisible} =
    useBottomSheetContext();

  const {data: aldermans} = useGetAldermans();
  const {data: solicitationTypes} = useGetSolicitationTypes();

  const {values, handleChange, errors, validateForm} = useValidation(
    {
      assunto: value => (value ? null : 'É preciso informar o assunto'),
      conteudo: value => (value ? null : 'A solicitação não pode estar vazia'),
      topico: value =>
        value ? null : 'É preciso selecionar um tipo de solicitação',
      vereador: value => (value ? null : 'É preciso selecionar um vereador'),
    },
    {
      assunto: '',
      conteudo: '',
      topico: null,
      vereador: null,
      anonimo: false,
    },
  );

  const {
    mutate: openSolicitation,
    isPending: isOpeningSolicitation,
    isSuccess: isSolicitationOpened,
  } = useOpenSolicitation();

  const {setIsLoading} = useLoadingContext();
  const {showToast} = useToastContext();

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
        console.log(solicitation);
        openSolicitation(solicitation);
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        showToast(errorMessage, 'error');
      }
    }
  };

  useEffect(() => {
    setIsLoading(isOpeningSolicitation);
  }, [isOpeningSolicitation]);

  useEffect(() => {
    if (isSolicitationOpened) {
      setIsBottomSheetVisible(false);
      showToast('Solicitação enviada com sucesso', 'success');
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
            notification={errors.vereador || ''}
          />
          <Select
            options={solicitationTypes || []}
            onSelect={value => handleChange('topico', value)}
            displayKey="topico"
            label="Tipo de Solicitação"
            placeholder="Selecione o tipo de solicitação"
            size="sm"
            classes="w-full mb-2"
            notification={errors.topico || ''}
          />
          <Input
            inputSize="sm"
            label="Assunto"
            value={values.assunto}
            onChangeText={text => handleChange('assunto', text)}
            classes="w-full mb-2"
            notification={errors.assunto || ''}
          />
          <Input
            label="Conteúdo"
            value={values.conteudo}
            onChangeText={text => handleChange('conteudo', text)}
            multiline
            inputSize="multiline"
            classes="w-full"
            notification={errors.conteudo || ''}
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
