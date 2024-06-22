import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/header/header';
import Avatar from '../../components/avatar/avatar';
import {useRoute} from '@react-navigation/native';
import {
  getFirstAndLastName,
  getNameInitials,
  turnIntoTitleCase,
} from '../../lib/utils/formatters';
import {Solicitation} from '../../lib/types/solicitation/solicitation';
import Separator from '../../components/separator/separator';
import useChatMessages from './hooks/useChatMessages';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import SendIcon from '../../assets/icons/send';
import PaperclipIcon from '../../assets/icons/paperclip';
import useHandleSendMessage from './hooks/useSendMessage';
import {useEffect, useRef, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import CrossIcon from '../../assets/icons/cross';
import ChatMessage from './components/chatMessage';
import useUser from '../../lib/hooks/useUser';
import {
  useFinishSolicitation,
  useReopenSolicitation,
} from '../../lib/api/tanstackQuery/solicitationRequests';
import {useLoadingContext} from '../../lib/contexts/useLoadingContext';
import {useToastContext} from '../../lib/contexts/useToastContext';
import {useSolicitationUpdateContext} from '../../lib/contexts/useSolicitationUpdateContext';
import {CLOSED_SOLICITATION_STATUS} from '../../lib/utils/constants';
import useUpdateSolicitation from './hooks/useUpdateSolicitation';
import clsx from 'clsx';
import {requestPermissions} from '../../lib/utils/permissions';

const Chat = () => {
  const route = useRoute();
  const {solicitation} = route.params as {solicitation: Solicitation};
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const flatListRef = useRef<FlatList>(null);

  const {user} = useUser();
  const {
    message,
    setMessage,
    file,
    setFile,
    handleSendMessage,
    isSendMessagePending,
    isSendMessageSuccess,
  } = useHandleSendMessage(solicitation.pk ?? 0, solicitation.anonimo === '1');
  const {
    chatMessages,
    isChatMessagesLoading,
    isChatMessagesSuccess,
    aldermanImage,
    isAldermanImageLoading,
  } = useChatMessages(
    solicitation?.pk,
    solicitation?.vereador?.foto,
    isSendMessageSuccess,
  );
  const {
    mutate: finishSolicitation,
    isPending: isFinishingSolicitation,
    isSuccess: isFinishingSolicitationSuccess,
  } = useFinishSolicitation();
  const {
    mutate: reopenSolicitation,
    isPending: isReopeningSolicitation,
    isSuccess: isReopeningSolicitationSuccess,
  } = useReopenSolicitation();
  const {solicitationData, isGetSolicitationSuccess, handleUpdateSolicitation} =
    useUpdateSolicitation(solicitation?.pk);
  const {showToast} = useToastContext();
  const {setIsLoading} = useLoadingContext();
  const {setSolicitationUpdatesCount} = useSolicitationUpdateContext();

  const [updatedSolicitation, setUpdatedSolicitation] =
    useState<Solicitation>(solicitation);

  useEffect(() => {
    setIsLoading(isFinishingSolicitation || isReopeningSolicitation);
  }, [isFinishingSolicitation, isReopeningSolicitation]);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: true});
    }, 150);
  }, [chatMessages]);

  useEffect(() => {
    if (isChatMessagesSuccess) setIsFirstLoad(false);
  }, [isChatMessagesSuccess]);

  useEffect(() => {
    if (isFinishingSolicitationSuccess) {
      showToast('Solicitação finalizada com sucesso', 'success');
      setSolicitationUpdatesCount(prev => prev + 1);
    }
  }, [isFinishingSolicitationSuccess]);

  useEffect(() => {
    if (isReopeningSolicitationSuccess) {
      showToast('Solicitação reaberta com sucesso', 'success');
      setSolicitationUpdatesCount(prev => prev + 1);
    }
  }, [isReopeningSolicitationSuccess]);

  useEffect(() => {
    if (
      (updatedSolicitation?.statusSolicitacao?.pk ===
        CLOSED_SOLICITATION_STATUS &&
        isChatMessagesSuccess) ||
      isFinishingSolicitationSuccess ||
      isReopeningSolicitationSuccess
    ) {
      handleUpdateSolicitation();
    }
  }, [
    isChatMessagesSuccess,
    isFinishingSolicitationSuccess,
    isReopeningSolicitationSuccess,
  ]);

  useEffect(() => {
    if (isGetSolicitationSuccess && solicitationData) {
      setUpdatedSolicitation(solicitationData);
      setSolicitationUpdatesCount(prev => prev + 1);
    }
  }, [solicitationData, isGetSolicitationSuccess]);

  const selectFile = async () => {
    try {
      const granted = await requestPermissions();

      if (!granted) {
        showToast(
          'O aplicativo não tem permissão para acessar os arquivos deste dispositivo',
          'error',
        );
        return;
      }

      const result = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.images,
          DocumentPicker.types.plainText,
          DocumentPicker.types.pdf,
          DocumentPicker.types.ppt,
          DocumentPicker.types.pptx,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
        ],
        allowMultiSelection: false,
      });

      const fileName = result[0]?.name || undefined;
      const fileType = result[0]?.type || undefined;
      const filePath = result[0]?.uri;
      const fileSize = result[0]?.size;

      if (fileSize && fileSize > 160000000) {
        showToast('Arquivo muito grande. O tamanho máximo é 16MB', 'error');
        return;
      }

      const fileData = await RNFS.readFile(filePath, 'base64');

      setFile({
        nome: fileName,
        contentType: fileType,
        documento: fileData,
      });
    } catch (err) {
      console.error(err);
      if (!DocumentPicker.isCancel(err)) {
        showToast('Erro ao selecionar arquivo', 'error');
      }
    }
  };

  return (
    <>
      <Header hasBackButton hasHambugerMenu />

      <View className="flex-1 px-4 pt-4 pb-8">
        <View className="w-full flex flex-row items-end justify-between mb-4">
          <View>
            {!user?.vereador ? (
              <Text className="font-semibold mb-1 text-slate-700">
                {updatedSolicitation?.vereador?.nomePopular ?? ''}
              </Text>
            ) : updatedSolicitation?.anonimo === '1' ? (
              <Text className="font-semibold mb-1 text-slate-700">Anônimo</Text>
            ) : (
              <Text className="font-semibold mb-1 text-slate-700">
                {getFirstAndLastName(
                  updatedSolicitation?.usuarioAbertura?.nome ?? '',
                )}
              </Text>
            )}
            <Text className="font-medium mb-1 text-slate-700">
              <Text className="font-semibold">Protocolo: </Text>
              {updatedSolicitation?.protocolo ?? ''}
            </Text>
            <Text className="font-medium text-slate-700">
              <Text className="font-semibold">Assunto: </Text>
              {updatedSolicitation?.assunto ?? ''}
            </Text>
          </View>
          {user?.vereador ? (
            <>
              {updatedSolicitation?.statusSolicitacao?.pk !==
              CLOSED_SOLICITATION_STATUS ? (
                <Button
                  size="sm"
                  onPress={() =>
                    updatedSolicitation.pk &&
                    finishSolicitation(updatedSolicitation.pk)
                  }>
                  <Text className="text-slate-50">Finalizar</Text>
                </Button>
              ) : (
                <Button
                  className="bg-slate-500"
                  size="sm"
                  onPress={() =>
                    updatedSolicitation.pk &&
                    reopenSolicitation(updatedSolicitation.pk)
                  }>
                  <Text className="text-slate-50">Reabrir</Text>
                </Button>
              )}
            </>
          ) : (
            <Avatar
              src={isAldermanImageLoading ? '' : aldermanImage}
              size="lg"
              fallback={getNameInitials(
                updatedSolicitation?.vereador?.nomePopular ?? '',
              )}
            />
          )}
        </View>

        <Separator orientation="horizontal" classes="mb-4" />

        <View className="flex-1">
          {(!isChatMessagesLoading || !isFirstLoad) && (
            <FlatList
              ref={flatListRef}
              showsVerticalScrollIndicator={false}
              data={chatMessages}
              renderItem={({item}) => <ChatMessage chatMessage={item} />}
            />
          )}
        </View>

        {file && (
          <View className="p-3 mb-3 bg-gray-200 rounded-lg flex-row justify-between items-center">
            <Text className="flex-1 mr-2 text-slate-700">{file.nome}</Text>
            <TouchableOpacity onPress={() => setFile(undefined)}>
              <View className="h-5 w-5">
                <CrossIcon stroke="#777" />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {updatedSolicitation?.statusSolicitacao?.pk ===
          CLOSED_SOLICITATION_STATUS && (
          <View className="p-3 mb-3 bg-gray-200 rounded-lg flex-row justify-between items-center">
            <Text className="text-slate-700 text-center w-full">
              {`${turnIntoTitleCase(
                updatedSolicitation?.vereador?.nomePopular ?? '',
              )} finalizou esta solicitação`}
            </Text>
          </View>
        )}

        <View className="flex flex-row w-full justify-between items-end">
          <Input
            placeholder={isSendMessagePending ? 'Enviando...' : 'Mensagem'}
            classes="flex-1"
            value={message}
            onChangeText={(text: string) => setMessage(text)}
            rightIcon={
              <Button
                size="icon"
                variant="ghost"
                onPress={selectFile}
                disabled={isSendMessagePending}>
                <PaperclipIcon stroke="#999" />
              </Button>
            }
            maxLength={2000}
            readOnly={isSendMessagePending}
          />
          <Button
            className={clsx(
              'w-14 ml-4 rounded-full',
              isSendMessagePending ? 'bg-slate-500' : 'bg-sky-500',
            )}
            onPress={handleSendMessage}
            disabled={isSendMessagePending}>
            <SendIcon stroke="#fff" />
          </Button>
        </View>
      </View>
    </>
  );
};

export default Chat;
