import {useEffect, useState} from 'react';
import {useSendMessage} from '../../../lib/api/tanstackQuery/chatRequests';
import useUser from '../../../lib/hooks/useUser';
import {Document} from '../../../lib/types/system/document';

const useHandleSendMessage = (solicitationPk: number, isAnonymous: boolean) => {
  const {user} = useUser();
  const [message, setMessage] = useState<string>('');
  const [file, setFile] = useState<Document>();

  const {
    mutate: sendMessage,
    isSuccess: isSendMessageSuccess,
    isPending: isSendMessagePending,
    data: sendMessageData,
  } = useSendMessage();

  const handleSendMessage = () => {
    if (!user || !solicitationPk) return;
    if (!message && !file) return;

    const isAlderman = Boolean(user.vereador);

    sendMessage({
      id: solicitationPk,
      message: {
        mensagem: message,
        origemVereador: isAlderman,
        anonimo: isAnonymous,
        anexo: file,
      },
    });
  };

  useEffect(() => {
    if (isSendMessageSuccess && sendMessageData) {
      setMessage('');
      setFile(undefined);
    }
  }, [isSendMessageSuccess, sendMessageData]);

  return {
    message,
    setMessage,
    file,
    setFile,
    handleSendMessage,
    isSendMessagePending,
    isSendMessageSuccess,
  };
};

export default useHandleSendMessage;
