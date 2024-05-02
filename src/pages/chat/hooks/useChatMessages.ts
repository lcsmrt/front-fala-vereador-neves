import {useEffect} from 'react';
import {useGetChatMessages} from '../../../lib/api/tanstackQuery/chatRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';

const useChatMessages = (id: string | number) => {
  const {data: chatMessages, isLoading: isChatMessagesLoading} =
    useGetChatMessages(id);

  const {setIsLoading} = useLoadingContext();

  useEffect(() => {
    setIsLoading(isChatMessagesLoading);
  }, [isChatMessagesLoading]);

  return {isChatMessagesLoading, chatMessages};
};

export default useChatMessages;
