import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import httpRequest from '../axios/httpRequest';
import {ChatMessage, ChatMessageFormData} from '../../types/chatMessage';
import RNFetchBlob from 'rn-fetch-blob';
import EncryptedStorage from 'react-native-encrypted-storage';

// BUSCA MENSAGENS DO CHAT
const getChatMessages = async (id: string | number) => {
  const response = await httpRequest.get(`/conversas/${id}`);
  return response.data || [];
};

export const useGetChatMessages = (id: string | number) => {
  return useQuery<ChatMessage[], Error>({
    queryKey: ['chatMessages'],
    queryFn: () => getChatMessages(id),
  });
};

export const useActionableGetChatMessages = () => {
  return useMutation<ChatMessage[], Error, string | number>({
    mutationFn: getChatMessages,
  });
};

// ENVIA MENSAGEM NO CHAT
interface SendMessageParams {
  id: string | number;
  message: ChatMessageFormData;
}

const sendMessage = async ({id, message}: SendMessageParams) => {
  const token = await EncryptedStorage.getItem('token');

  try {
    const response = await RNFetchBlob.fetch(
      'POST',
      `http://198.27.114.51:8083/solicitacoes/adicionar_mensagem/${id}`,
      {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
      [
        {
          name: 'form',
          data: JSON.stringify(message),
          type: 'application/json',
        },
      ],
    );

    if (response.respInfo.status >= 400) {
      console.log('Error response:', response.data);
      throw new Error(
        `Erro ao enviar mensagem. Status code: ${response.respInfo.status}`,
      );
    }

    console.log('Mensagem enviada com sucesso: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem: ', error);
  }
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () =>
      queryClient.invalidateQueries({queryKey: ['chatMessages']}),
  });
};
