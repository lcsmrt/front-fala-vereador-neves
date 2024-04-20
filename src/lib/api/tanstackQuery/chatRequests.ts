import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import httpRequest from '../axios/httpRequest';
import {ChatMessage, ChatMessageFormData} from '../../types/chatMessage';
import RNFetchBlob from 'rn-fetch-blob';

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
  try {
    const {data} = await RNFetchBlob.fetch(
      'POST',
      `http://198.27.114.51:8083/solicitacoes/adicionar_mensagem/${id}`,
      {
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'form',
          data: JSON.stringify(message),
          type: 'application/json',
        },
      ],
    );

    console.log('Mensagem enviada com sucesso: ', data);
    return data;
  } catch (error) {
    console.log('Erro ao enviar mensagem: ', error);
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
