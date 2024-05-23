import {useEffect, useState} from 'react';
import {ChatMessage as ChatMessageType} from '../../../lib/types/solicitation/chatMessage';
import useUser from '../../../lib/hooks/useUser';
import {Text, TouchableOpacity, View} from 'react-native';
import DownloadIcon from '../../../assets/icons/download';
import useDownloadFile from '../../../lib/hooks/useDownloadFile';
import {useActionableGetAttachment} from '../../../lib/api/tanstackQuery/imageRequests';

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
      handleDownload(attachment.documento, attachment.nome ?? 'Anexo');
    }
  }, [isAttachmentSuccess, attachment]);

  const handleGetAttachment = async (attachmentId?: string | number) => {
    if (!attachmentId || isAttachmentPending) return;

    getAttachment(attachmentId);
  };

  const handleDownload = async (base64?: string, fileName?: string) => {
    if (!base64 || !fileName) return;

    saveBase64File(base64, fileName);
  };

  return (
    <>
      {userType === messageOrigin ? (
        <>
          {messageType === 'file' ? (
            <TouchableOpacity
              className="flex flex-row items-center justify-end mb-1"
              onPress={() => handleGetAttachment(chatMessage.anexo?.pk)}>
              <View className="bg-sky-200 px-3 py-2 rounded-lg flex flex-row items-center">
                <View className="h-7 w-7 mr-3">
                  <DownloadIcon stroke="#38bdf8" />
                </View>
                <View>
                  <Text className="text-slate-700">
                    {chatMessage.anexo?.arquivoNome}
                  </Text>
                  <View className="flex flex-row items-center justify-end">
                    <Text className="text-xs text-sky-400">
                      {isAttachmentPending ? 'Baixando...' : 'Download'}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View className="flex flex-row items-center justify-end mb-1">
              <View className="bg-sky-200 p-2 rounded-lg max-w-[70%]">
                <Text className="text-slate-700">{chatMessage.mensagem}</Text>
              </View>
            </View>
          )}
        </>
      ) : (
        <>
          {messageType === 'file' ? (
            <TouchableOpacity
              className="flex flex-row items-center justify-start mb-1"
              onPress={() =>
                handleDownload(
                  chatMessage.anexo?.doc?.documento,
                  chatMessage.anexo?.doc?.nome,
                )
              }>
              <View className="bg-slate-200 px-3 py-2 rounded-lg flex flex-row items-center">
                <View className="h-7 w-7 mr-3">
                  <DownloadIcon stroke="#38bdf8" />
                </View>
                <View>
                  <Text className="text-slate-700">
                    {chatMessage.anexo?.arquivoNome}
                  </Text>
                  <View className="flex flex-row items-center justify-end">
                    <Text className="text-xs text-sky-400">Download</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View className="flex flex-row items-center justify-start mb-1">
              <View className="bg-slate-200 p-2 rounded-lg max-w-[70%]">
                <Text className="text-slate-700">{chatMessage.mensagem}</Text>
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default ChatMessage;
