import {useEffect, useState} from 'react';
import {useSendMessage} from '../../../lib/api/tanstackQuery/chatRequests';
import useUser from '../../../lib/hooks/useUser';
import {Document} from '../../../lib/types/system/document';
import { useSolicitationUpdateContext } from '../../../lib/contexts/useSolicitationUpdateContext';

const useHandleSendMessage = (solicitationPk: number, isAnonymous: boolean) => {
  const {user} = useUser();
  const [message, setMessage] = useState<string>('');
  const [file, setFile] = useState<Document>();

  const {
    mutate: sendMessage,
    isSuccess: isSendMessageSuccess,
    data: sendMessageData,
  } = useSendMessage();

  const {setSolicitationUpdatesCount} = useSolicitationUpdateContext();

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
    if (isSendMessageSuccess || sendMessageData) {
      setSolicitationUpdatesCount(prev => prev + 1);
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
    isSendMessageSuccess,
  };
};

export default useHandleSendMessage;
