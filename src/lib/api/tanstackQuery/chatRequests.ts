import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import httpRequest from '../axios/httpRequest';
import {
  ChatMessage,
  ChatMessageFormData,
} from '../../types/solicitation/chatMessage';
import RNFetchBlob from 'rn-fetch-blob';
import EncryptedStorage from 'react-native-encrypted-storage';

// BUSCA MENSAGENS DO CHAT
const getChatMessages = async (id: string | number) => {
  const {data} = await httpRequest.get(`/conversas/${id}`);
  return data || [];
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

  const formParts = [
    {
      name: 'form',
      data: JSON.stringify({
        mensagem: message.mensagem,
        anonimo: message.anonimo,
        origemVereador: message.origemVereador,
      }),
      type: 'application/json',
    },
  ];

  if (message.arquivo && message.arquivo.uri && message.arquivo.name && message.arquivo.type) {
    formParts.push({
      name: 'file',
      type: message.arquivo.type,
      data: RNFetchBlob.wrap(message.arquivo.uri.replace('content://', '')),
    });
  }

  const response = await RNFetchBlob.fetch(
    'POST',
    `http://198.27.114.51:8083/solicitacoes/adicionar_mensagem/${id}`,
    {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
    formParts,
  );

  if (response.respInfo.status >= 400) {
    throw new Error(`Failed to send message. Status code: ${response.respInfo.status}`);
  }

  return response.json();
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () =>
      queryClient.invalidateQueries({queryKey: ['chatMessages']}),
  });
};
