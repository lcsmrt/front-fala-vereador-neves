import {useNavigation} from '@react-navigation/native';
import {ForgotPasswordScreenNavigationProp} from '../../../lib/types/system/navigation';
import useValidation from '../../../lib/hooks/useValidation';
import {
  useResetPassword,
  useSendPasswordRecoveryEmail,
} from '../../../lib/api/tanstackQuery/accessControlRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import {useEffect, useState} from 'react';
import {useToastContext} from '../../../lib/contexts/useToastContext';

const usePasswordResetHandler = () => {
  const navigation: ForgotPasswordScreenNavigationProp = useNavigation();

  const {
    values: passwordResetData,
    handleChange: handlePasswordResetDataChange,
    errors: passwordResetErrors,
    validateField: validatePasswordResetField,
    validateForm: validatePasswordReset,
  } = useValidation(
    {
      email: value => (value ? null : 'Campo obrigatório'),
      codigo: value => (value ? null : 'Campo obrigatório'),
      novaSenha: value => (value ? null : 'Campo obrigatório'),
      confirmarSenha: value => (value ? null : 'Campo obrigatório'),
    },
    {
      email: '',
      codigo: '',
      novaSenha: '',
      confirmarSenha: '',
    },
  );

  const {
    mutate: sendPasswordRecoveryEmail,
    isPending: isSendingEmail,
    isSuccess: isEmailSent,
  } = useSendPasswordRecoveryEmail();

  const {
    mutate: resetPassword,
    isPending: isResettingPassword,
    isSuccess: isPasswordReset,
  } = useResetPassword();

  const [isEmailResent, setIsEmailResent] = useState(false);
  const handleSendEmail = (isResending: boolean) => {
    const emailError = validatePasswordResetField(
      'email',
      passwordResetData?.email,
    );
    if (!emailError) {
      sendPasswordRecoveryEmail(passwordResetData.email);
      setIsEmailResent(isResending);
    }
  };

  useEffect(() => {
    if (isEmailSent && isEmailResent) {
      showToast('E-mail reenviado com sucesso', 'success');
      setIsEmailResent(false);
    }
  }, [isEmailSent, isEmailResent]);

  const {setIsLoading} = useLoadingContext();
  const {showToast} = useToastContext();

  useEffect(() => {
    setIsLoading(isSendingEmail);
  }, [isSendingEmail]);

  return {
    passwordResetData,
    handlePasswordResetDataChange,
    passwordResetErrors,
    handleSendEmail,
    isEmailSent,
  };
};

export default usePasswordResetHandler;
