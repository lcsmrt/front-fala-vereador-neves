import {View, Text, FlatList} from 'react-native';
import Header from '../../components/header/header';
import Avatar from '../../components/avatar/avatar';
import {useRoute} from '@react-navigation/native';
import {getNameInitials} from '../../lib/utils/formatters';
import {Solicitation} from '../../lib/types/solicitation';
import Separator from '../../components/separator/separator';
import useChatMessages from './hooks/useChatMessages';

const Chat = () => {
  const route = useRoute();
  const {solicitation} = route.params as {solicitation: Solicitation};

  const {chatMessages, getMessages, isChatMessagesLoading} = useChatMessages(solicitation.pk ?? '');

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
        
        <Separator orientation='horizontal' classes="mb-4" />
        
        <View>
          <FlatList 
            data={chatMessages}
            renderItem={({item}) => (
              <View>
                <Text>{item.mensagem}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
};

export default Chat;
