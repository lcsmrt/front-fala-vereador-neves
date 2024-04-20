import {View, Text, FlatList, RefreshControl} from 'react-native';
import Header from '../../components/header/header';
import Avatar from '../../components/avatar/avatar';
import {useRoute} from '@react-navigation/native';
import {getNameInitials} from '../../lib/utils/formatters';
import {Solicitation} from '../../lib/types/solicitation';
import Separator from '../../components/separator/separator';
import useChatMessages from './hooks/useChatMessages';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import SendIcon from '../../assets/icons/send';
import PaperclipIcon from '../../assets/icons/paperclip';
import useHandleSendMessage from './hooks/useSendMessage';

const Chat = () => {
  const route = useRoute();
  const {solicitation} = route.params as {solicitation: Solicitation};

  const {chatMessages, getMessages, isChatMessagesLoading} = useChatMessages(
    solicitation.pk ?? 0,
  );
  const {message, setMessage, handleSendMessage} = useHandleSendMessage(
    solicitation.pk ?? 0,
  );

  return (
    <>
      <Header hasBackButton hasHambugerMenu />

      <View className="flex-1 px-4 pt-4 pb-8">
        <View className="w-full flex flex-row items-center justify-between mb-4">
          <View>
            <Text className="font-semibold mb-1">
              {solicitation.vereador?.nomePopular ?? ''}
            </Text>
            <Text className="font-medium mb-1">
              {`Protocolo: ${solicitation.protocolo ?? ''}`}
            </Text>
            <Text className="font-medium">
              {`Assunto: ${solicitation.assunto ?? ''}`}
            </Text>
          </View>
          <Avatar
            size="lg"
            fallback={getNameInitials(solicitation.vereador?.nomeCivil ?? '')}
          />
        </View>

        <Separator orientation="horizontal" classes="mb-4" />

        <View className="flex-1">
          <FlatList
            data={chatMessages}
            renderItem={({item}) => (
              <>
                {item.origemVereador ? (
                  <View className="flex flex-row items-center justify-start mb-1">
                    <View className="bg-slate-200 p-2 rounded-lg">
                      <Text>{item.mensagem}</Text>
                    </View>
                  </View>
                ) : (
                  <View className="flex flex-row items-center justify-end mb-1">
                    <View className="bg-sky-200 p-2 rounded-lg">
                      <Text>{item.mensagem}</Text>
                    </View>
                  </View>
                )}
              </>
            )}
            refreshControl={
              <RefreshControl
                refreshing={isChatMessagesLoading}
                onRefresh={getMessages}
              />
            }
          />
        </View>

        <View className="flex flex-row w-full justify-between items-end">
          <Input
            placeholder="Mensagem"
            classes="flex-1"
            value={message}
            onChangeText={(text: string) => setMessage(text)}
            rightIcon={
              <Button size="icon" variant="ghost">
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
