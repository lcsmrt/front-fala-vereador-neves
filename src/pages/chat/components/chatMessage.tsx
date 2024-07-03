import {useEffect, useState} from 'react';
import {ChatMessage as ChatMessageType} from '../../../lib/types/solicitation/chatMessage';
import useUser from '../../../lib/hooks/useUser';
import {Text, TouchableOpacity, View} from 'react-native';
import DownloadIcon from '../../../assets/icons/download';
import useDownloadFile from '../../../lib/hooks/useDownloadFile';
import {useActionableGetAttachment} from '../../../lib/api/tanstackQuery/imageRequests';
import {isoDateToTime} from '../../../lib/utils/formatters';

interface ChatMessageProps {
  chatMessage: ChatMessageType;
}

const ChatMessage = ({chatMessage}: ChatMessageProps) => {
  const {user} = useUser();
  const [messageOrigin, setMessageOrigin] = useState<'vereador' | 'cidadao'>(
    'cidadao',
  );
  const [userType, setUserType] = useState<'vereador' | 'cidadao'>('cidadao');
  const [messageType, setMessageType] = useState<'text' | 'file'>('text');

  const {saveBase64File} = useDownloadFile();

  const {
    mutate: getAttachment,
    data: attachment,
    isPending: isAttachmentPending,
    isSuccess: isAttachmentSuccess,
  } = useActionableGetAttachment();

  useEffect(() => {
    setUserType(user?.vereador ? 'vereador' : 'cidadao');
    setMessageOrigin(chatMessage.origemVereador ? 'vereador' : 'cidadao');
    setMessageType(chatMessage.anexo ? 'file' : 'text');
  }, [user, chatMessage]);

  useEffect(() => {
    if (isAttachmentSuccess && attachment?.documento) {
      handleDownload(attachment.documento, attachment.nome ?? 'Anexo', attachment.contentType ?? '');
    }
  }, [isAttachmentSuccess, attachment]);

  const handleGetAttachment = async (imagePath?: string) => {
    if (!imagePath || isAttachmentPending) return;

    getAttachment(imagePath);
  };

  const handleDownload = async (base64?: string, fileName?: string, fileType?: string) => {
    if (!base64 || !fileName || !fileType) return;

    saveBase64File(base64, fileName, fileType);
  };

  return (
    <>
      {userType === messageOrigin ? (
        <>
          {messageType === 'file' ? (
            <TouchableOpacity
              className="flex flex-row items-center justify-end mb-1"
              // AJUSTAR AQUI
              onPress={() => handleGetAttachment(chatMessage.anexo?.pk)}>
              <View className="bg-sky-200 px-3 py-2 rounded-lg flex flex-row items-center max-w-[70%]">
                <View className="h-7 w-7 mr-2">
                  <DownloadIcon stroke="#38bdf8" />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-slate-700"
                    numberOfLines={1}
                    ellipsizeMode="middle">
                    {chatMessage.anexo?.arquivoNome}
                  </Text>
                  <View className="flex flex-row items-center justify-between mt-1">
                    <Text className="text-xs text-sky-400">
                      {isAttachmentPending ? 'Baixando...' : 'Download'}
                    </Text>
                    <Text className="text-xs text-slate-500">
                      {isoDateToTime(chatMessage.dataHora ?? '')}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View className="flex flex-row items-center justify-end mb-1">
              <View className="bg-sky-200 p-2 rounded-lg max-w-[70%]">
                <Text className="text-slate-700">{chatMessage.mensagem}</Text>
                <View className="flex-1 flex flex-row justify-end">
                  <Text className="text-xs text-slate-500">
                    {isoDateToTime(chatMessage.dataHora ?? '')}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </>
      ) : (
        <>
          {messageType === 'file' ? (
            <TouchableOpacity
              className="flex flex-row items-center justify-start mb-1"
              onPress={() => handleGetAttachment(chatMessage.anexo?.pk)}>
              <View className="bg-slate-200 px-3 py-2 rounded-lg flex flex-row items-center max-w-[70%]">
                <View className="h-7 w-7 mr-2">
                  <DownloadIcon stroke="#38bdf8" />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-slate-700"
                    numberOfLines={1}
                    ellipsizeMode="middle">
                    {chatMessage.anexo?.arquivoNome}
                  </Text>
                  <View className="flex flex-row items-center justify-between mt-1">
                    <Text className="text-xs text-sky-400">
                      {isAttachmentPending ? 'Baixando...' : 'Download'}
                    </Text>
                    <Text className="text-xs text-slate-500">
                      {isoDateToTime(chatMessage.dataHora ?? '')}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View className="flex flex-row items-center justify-start mb-1">
              <View className="bg-slate-200 p-2 rounded-lg max-w-[70%]">
                <Text className="text-slate-700">{chatMessage.mensagem}</Text>
                <View className="flex-1 flex flex-row justify-end">
                  <Text className="text-xs text-slate-500">
                    {isoDateToTime(chatMessage.dataHora ?? '')}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default ChatMessage;
