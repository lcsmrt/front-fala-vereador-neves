import {useEffect, useState} from 'react';
import {useSendMessage} from '../../../lib/api/tanstackQuery/chatRequests';
import useUser from '../../../lib/hooks/useUser';
import {Document} from '../../../lib/types/system/document';

const useHandleSendMessage = (solicitationPk: number) => {
  const {user} = useUser();
  const {mutate: sendMessage, data: sendMessageData} = useSendMessage();

  const [message, setMessage] = useState<string>('');
  const [file, setFile] = useState<Document>();

  const handleSendMessage = () => {
    if (!user || !solicitationPk) return;
    if (!message && !file) return;

    const isAnonymous = false; // IMPLEMENTAR ESSA FUNCIONALIDADE DEPOIS
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
    if (sendMessageData) {
      setMessage('');
      setFile(undefined);
    }
  }, [sendMessageData]);

  return {
    message,
    setMessage,
    file,
    setFile,
    handleSendMessage,
  };
};

export default useHandleSendMessage;
