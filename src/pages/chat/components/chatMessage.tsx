import {useEffect, useState} from 'react';
import {ChatMessage as ChatMessageType} from '../../../lib/types/solicitation/chatMessage';
import useUser from '../../../lib/hooks/useUser';
import {Text, TouchableOpacity, View} from 'react-native';
import DownloadIcon from '../../../assets/icons/download';
import {saveBase64File} from '../../../lib/utils/download';

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

  useEffect(() => {
    setMessageOrigin(chatMessage.origemVereador ? 'vereador' : 'cidadao');
    setUserType(user?.vereador ? 'vereador' : 'cidadao');
    setMessageType(chatMessage.anexo ? 'file' : 'text');
  }, []);

  return (
    <>
      {userType === messageOrigin ? (
        <>
          {messageType === 'file' ? (
            <TouchableOpacity
              className="flex flex-row items-center justify-end mb-1"
              onPress={
                () => {
                  if (
                    chatMessage.anexo?.doc?.documento?.[0] &&
                    chatMessage.anexo?.doc?.nome &&
                    chatMessage.anexo?.doc?.contentType
                  ) {
                    saveBase64File(
                      chatMessage.anexo?.doc?.documento?.[0],
                      chatMessage.anexo?.doc?.nome,
                      chatMessage.anexo?.doc?.contentType,
                    );
                  }
                }
                // chatMessage.anexo?.doc?.documento?.[0] &&
                // chatMessage.anexo?.doc?.nome &&
                // chatMessage.anexo?.doc?.contentType &&
                // saveBase64File(
                //   chatMessage.anexo?.doc?.documento?.[0],
                //   chatMessage.anexo?.doc?.nome,
                //   chatMessage.anexo?.doc?.contentType,
                // )
              }>
              <View className="bg-sky-200 px-3 py-2 rounded-lg flex flex-row items-center">
                <View className="h-7 w-7 mr-3">
                  <DownloadIcon stroke="#38bdf8" />
                </View>
                <View>
                  <Text>{chatMessage.anexo?.arquivoNome}</Text>
                  <View className="flex flex-row items-center justify-end">
                    <Text className="text-xs text-sky-400">Download</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View className="flex flex-row items-center justify-end mb-1">
              <View className="bg-sky-200 p-2 rounded-lg">
                <Text>{chatMessage.mensagem}</Text>
              </View>
            </View>
          )}
        </>
      ) : (
        <>
          {messageType === 'file' ? (
            <TouchableOpacity
              className="flex flex-row items-center justify-start mb-1"
              onPress={() => {
                if (
                  chatMessage.anexo?.doc?.documento &&
                  chatMessage.anexo?.doc?.nome &&
                  chatMessage.anexo?.doc?.contentType
                ) {
                  saveBase64File(
                    chatMessage.anexo?.doc?.documento,
                    chatMessage.anexo?.doc?.nome,
                    chatMessage.anexo?.doc?.contentType,
                  );
                }
              }}>
              <View className="bg-slate-200 px-3 py-2 rounded-lg flex flex-row items-center">
                <View className="h-7 w-7 mr-3">
                  <DownloadIcon stroke="#38bdf8" />
                </View>
                <View>
                  <Text>{chatMessage.anexo?.arquivoNome}</Text>
                  <View className="flex flex-row items-center justify-end">
                    <Text className="text-xs text-sky-400">Download</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <View className="flex flex-row items-center justify-start mb-1">
              <View className="bg-slate-200 p-2 rounded-lg">
                <Text>{chatMessage.mensagem}</Text>
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default ChatMessage;
