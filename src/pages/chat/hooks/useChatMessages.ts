import {useEffect, useState} from 'react';
import {useGetChatMessages} from '../../../lib/api/tanstackQuery/chatRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import {useGetAldermanImage} from '../../../lib/api/tanstackQuery/imageRequests';

const useChatMessages = (id: string | number, pictureName?: string) => {
  const [aldermanImage, setAldermanImage] = useState<string | null>(null);
  const {data: chatMessages, isLoading: isChatMessagesLoading} =
    useGetChatMessages(id);

  const {data, isLoading: isAldermanImageLoading} =
    useGetAldermanImage(pictureName);

  useEffect(() => {
    if (data && data.documento) {
      setAldermanImage(data.documento);
    }
  }, [data]);

  const {setIsLoading} = useLoadingContext();

  useEffect(() => {
    setIsLoading(isChatMessagesLoading || isAldermanImageLoading);
  }, [isChatMessagesLoading, isAldermanImageLoading]);

  return {chatMessages, aldermanImage};
};

export default useChatMessages;
