import {useNavigation} from '@react-navigation/native';
import {ForgotPasswordScreenNavigationProp} from '../../../lib/types/system/navigation';
import useValidation from '../../../lib/hooks/useValidation';
import {useSendPasswordRecoveryEmail} from '../../../lib/api/tanstackQuery/accessControlRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import {useEffect} from 'react';

const usePasswordResetHandler = () => {
  const navigation: ForgotPasswordScreenNavigationProp = useNavigation();

  const {
    values: email,
    handleChange: handleEmailChange,
    errors: emailErrors,
    validateForm: validateEmail,
  } = useValidation(
    {
      email: value => (value ? null : 'Campo obrigatório'),
    },
    {
      email: '',
    },
  );

  const {
    mutate: sendPasswordRecoveryEmail,
    isPending: isSendingEmail,
    isSuccess: isEmailSent,
    data: emailSent,
  } = useSendPasswordRecoveryEmail();

  const handleSendEmail = () => {
    if (validateEmail()) {
      sendPasswordRecoveryEmail(email.email);
    }
  };

  const {setIsLoading} = useLoadingContext();

  useEffect(() => {
    setIsLoading(isSendingEmail);
  }, [isSendingEmail]);

  return {
    email,
    handleEmailChange,
    emailErrors,
    handleSendEmail,
    isEmailSent,
  };
};

export default usePasswordResetHandler;
