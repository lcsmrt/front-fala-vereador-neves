import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Header from '../../components/header/header';
import Avatar from '../../components/avatar/avatar';
import {useRoute} from '@react-navigation/native';
import {getNameInitials} from '../../lib/utils/formatters';
import {Solicitation} from '../../lib/types/solicitation/solicitation';
import Separator from '../../components/separator/separator';
import useChatMessages from './hooks/useChatMessages';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import SendIcon from '../../assets/icons/send';
import PaperclipIcon from '../../assets/icons/paperclip';
import useHandleSendMessage from './hooks/useSendMessage';
import {useEffect, useRef} from 'react';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import CrossIcon from '../../assets/icons/cross';
import ChatMessage from './components/chatMessage';
import useUser from '../../lib/hooks/useUser';

const Chat = () => {
  const route = useRoute();
  const {solicitation} = route.params as {solicitation: Solicitation};

  const flatListRef = useRef<FlatList>(null);

  const {user} = useUser();
  const {chatMessages} = useChatMessages(solicitation.pk ?? 0);
  const {message, setMessage, file, setFile, handleSendMessage} =
    useHandleSendMessage(solicitation.pk ?? 0);

  useEffect(() => {
    setTimeout(() => {
      console.log('SOLICITAÇÃO: ', solicitation);
    }, 10000);
  }, [solicitation]);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: true});
    }, 100);
  }, [chatMessages]);

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: false,
      });

      const fileName = result[0]?.name || undefined;
      const fileType = result[0]?.type || undefined;
      const filePath = result[0]?.uri;
      const fileData = await RNFetchBlob.fs.readFile(filePath, 'base64');

      setFile({
        nome: fileName,
        contentType: fileType,
        documento: fileData,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Selecão de arquivo cancelada');
      } else {
        console.error('Erro ao selecionar arquivo:', err);
      }
    }
  };

  return (
    <>
      <Header hasBackButton hasHambugerMenu />

      <View className="flex-1 px-4 pt-4 pb-8">
        <View className="w-full flex flex-row items-center justify-between mb-4">
          <View>
            <Text className="font-semibold mb-1">
              {solicitation?.vereador?.nomePopular ?? ''}
            </Text>
            <Text className="font-medium mb-1">
              {`Protocolo: ${solicitation?.protocolo ?? ''}`}
            </Text>
            <Text className="font-medium">
              {`Assunto: ${solicitation?.assunto ?? ''}`}
            </Text>
          </View>
          {!user?.vereador && (
            <Avatar
              size="lg"
              fallback={getNameInitials(
                solicitation?.vereador?.nomeCivil ?? '',
              )}
            />
          )}
        </View>

        <Separator orientation="horizontal" classes="mb-4" />

        <View className="flex-1">
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            data={chatMessages}
            renderItem={({item}) => <ChatMessage chatMessage={item} />}
          />
        </View>

        {file && (
          <View className="p-3 mb-3 bg-gray-200 rounded-lg flex-row justify-between items-center">
            <Text className="flex-1 mr-2">{file.nome}</Text>
            <TouchableOpacity onPress={() => setFile(undefined)}>
              <View className="h-5 w-5">
                <CrossIcon stroke="#777" />
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View className="flex flex-row w-full justify-between items-end">
          <Input
            placeholder="Mensagem"
            classes="flex-1"
            value={message}
            onChangeText={(text: string) => setMessage(text)}
            rightIcon={
              <Button size="icon" variant="ghost" onPress={selectFile}>
                <PaperclipIcon stroke="#999" />
              </Button>
            }
          />
          <Button
            className="w-14 ml-4 bg-sky-500 rounded-full"
            onPress={handleSendMessage}>
            <SendIcon stroke="#fff" />
          </Button>
        </View>
      </View>
    </>
  );
};

export default Chat;
