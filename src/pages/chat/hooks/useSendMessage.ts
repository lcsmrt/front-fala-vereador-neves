import {useState} from 'react';
import {useSendMessage} from '../../../lib/api/tanstackQuery/chatRequests';
import useUser from '../../../lib/hooks/useUser';

const useHandleSendMessage = (solicitationPk: number) => {
  const {user} = useUser();
  const {mutate: sendMessage, isPending: isSendingMessage} = useSendMessage();

  const [message, setMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (!user || !message || !solicitationPk) return;

    const isAnonymous = false; // IMPLEMENTAR ESSA FUNCIONALIDADE DEPOIS
    const isAlderman = Boolean(user.vereador);

    sendMessage({
      id: solicitationPk,
      message: {
        mensagem: message,
        anonimo: isAnonymous,
        origemVereador: isAlderman,
      },
    });
  };

  return {
    message,
    setMessage,
    handleSendMessage,
  };
};

export default useHandleSendMessage;
