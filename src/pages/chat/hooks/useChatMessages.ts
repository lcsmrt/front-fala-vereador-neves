import { useEffect } from 'react';
import {useActionableGetChatMessages} from '../../../lib/api/tanstackQuery/chatRequests';
import { useLoadingContext } from '../../../lib/contexts/useLoadingContext';

const useChatMessages = (id: string | number) => {
  const {
    mutate: getChatMessages,
    isPending: isChatMessagesLoading,
    data: chatMessages,
  } = useActionableGetChatMessages();
  const {setIsLoading} = useLoadingContext();

  const getMessages = () => {
    if (id) getChatMessages(id);
  };

  useEffect(() => {
    getMessages();
  }, [id]);

  useEffect(() => {
    setIsLoading(isChatMessagesLoading);
  }, [isChatMessagesLoading]);

  useEffect(() => {
    if (chatMessages) console.log("Chat: ", chatMessages);
  }, [chatMessages]);

  return {isChatMessagesLoading, getMessages, chatMessages};
};

export default useChatMessages;
