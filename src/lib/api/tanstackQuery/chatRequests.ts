import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import httpRequest from '../axios/httpRequest';
import {
  ChatMessage,
  ChatMessageFormData,
} from '../../types/solicitation/chatMessage';

// BUSCA MENSAGENS DO CHAT
const getChatMessages = async (id?: string | number) => {
  const {data} = await httpRequest.get(`/conversas/${id}`);
  return data || [];
};

export const useGetChatMessages = (id?: string | number) => {
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
  const {data} = await httpRequest.post(
    `/solicitacoes/adicionar_mensagem/${id}`,
    message,
  );
  return data;
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () =>
      queryClient.invalidateQueries({queryKey: ['chatMessages']}),
  });
};
