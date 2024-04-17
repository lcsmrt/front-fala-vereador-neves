import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import httpRequest from '../axios/httpRequest';
import {ChatMessage} from '../../types/chatMessage';

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
  id: string;
  formData: FormData;
}

const sendMessage = async ({id, formData}: SendMessageParams) => {
  const {data} = await httpRequest.post(
    `/solicitacoes/adicionar_mensagem/${id}`,
    formData,
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
