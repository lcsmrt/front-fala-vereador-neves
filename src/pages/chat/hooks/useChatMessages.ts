import {useEffect, useState} from 'react';
import {useActionableGetChatMessages} from '../../../lib/api/tanstackQuery/chatRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import {useActionableGetAldermanImage} from '../../../lib/api/tanstackQuery/imageRequests';
import {ChatMessage} from '../../../lib/types/solicitation/chatMessage';

const useChatMessages = (
  id?: string | number,
  pictureName?: string,
  isMessageSent?: boolean,
) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [aldermanImage, setAldermanImage] = useState<string | null>(null);

  const {
    mutate: getChatMessages,
    isPending: isChatMessagesLoading,
    isSuccess: isChatMessagesSuccess,
    data: chatMessagesData,
  } = useActionableGetChatMessages();
  const {
    mutate: getAldermanImage,
    isPending: isAldermanImageLoading,
    isSuccess: isAldermanImageSuccess,
    data: aldermanImageData,
  } = useActionableGetAldermanImage();

  useEffect(() => {
    if (pictureName) getAldermanImage(pictureName);
  }, [pictureName]);

  useEffect(() => {
    if (
      aldermanImageData &&
      aldermanImageData.documento &&
      isAldermanImageSuccess
    ) {
      setAldermanImage(aldermanImageData.documento);
    } else {
      setAldermanImage(null);
    }
  }, [aldermanImageData, isAldermanImageSuccess]);

  useEffect(() => {
    if (id) getChatMessages(id);
  }, [id]);

  useEffect(() => {
    if (chatMessagesData) setChatMessages(chatMessagesData);
  }, [chatMessagesData]);

  useEffect(() => {
    if (isMessageSent && id) getChatMessages(id);
  }, [isMessageSent, id]);

  const {setIsLoading} = useLoadingContext();

  useEffect(() => {
    setIsLoading(isAldermanImageLoading);
  }, [isAldermanImageLoading]);

  return {
    chatMessages,
    isChatMessagesLoading,
    isChatMessagesSuccess,
    aldermanImage,
    isAldermanImageLoading,
  };
};

export default useChatMessages;
