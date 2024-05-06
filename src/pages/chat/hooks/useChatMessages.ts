import {useEffect} from 'react';
import {useGetChatMessages} from '../../../lib/api/tanstackQuery/chatRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import {useGetProfileImage} from '../../../lib/api/tanstackQuery/imageRequests';

const useChatMessages = (id: string | number) => {
  const {data: chatMessages, isLoading: isChatMessagesLoading} =
    useGetChatMessages(id);

  const {
    data: profileImage,
    isLoading: isProfileImageLoading,
    error: profileImageError,
  } = useGetProfileImage(id);

  const {setIsLoading} = useLoadingContext();

  useEffect(() => {
    setIsLoading(isChatMessagesLoading || isProfileImageLoading);
  }, [isChatMessagesLoading, isProfileImageLoading]);

  return {chatMessages, profileImage};
};

export default useChatMessages;
