import {useNavigation} from '@react-navigation/native';
import {ForgotPasswordScreenNavigationProp} from '../../../lib/types/system/navigation';
import useValidation from '../../../lib/hooks/useValidation';
import {
  useResetPassword,
  useSendPasswordRecoveryEmail,
  useValidatePasswordResetCode,
} from '../../../lib/api/tanstackQuery/accessControlRequests';
import {useLoadingContext} from '../../../lib/contexts/useLoadingContext';
import {useEffect, useState} from 'react';
import {useToastContext} from '../../../lib/contexts/useToastContext';
import {PasswordReset} from '../../../lib/types/accessControl/passwordReset';

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

  const {setIsLoading} = useLoadingContext();
  const {showToast} = useToastContext();

  const {
    mutate: sendPasswordRecoveryEmail,
    isPending: isSendingEmail,
    isSuccess: isEmailSent,
    error: emailError,
  } = useSendPasswordRecoveryEmail();

  const {
    mutate: validatePasswordResetCode,
    isPending: isVerifyingCode,
    isSuccess: isCodeValid,
  } = useValidatePasswordResetCode();

  const {
    mutate: resetPassword,
    isPending: isResettingPassword,
    isSuccess: isPasswordReset,
  } = useResetPassword();

  useEffect(() => {
    setIsLoading(isSendingEmail || isVerifyingCode || isResettingPassword);
  }, [isSendingEmail, isVerifyingCode, isResettingPassword]);

  // ENVIA E-MAIL PARA RECUPERAÇÃO DE SENHA
  const [isEmailResent, setIsEmailResent] = useState(false); // FLAG PARA SABER SE O E-MAIL FOI REENVIADO
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

  // VALIDA CÓDIGO DE RECUPERAÇÃO DE SENHA
  const handleValidateCode = () => {
    const emailError = validatePasswordResetField(
      'email',
      passwordResetData?.email,
    );
    const codeError = validatePasswordResetField(
      'codigo',
      passwordResetData?.codigo,
    );

    if (codeError || emailError) return;

    validatePasswordResetCode({
      email: passwordResetData.email,
      codigo: passwordResetData.codigo,
    });
  };

  // REDEFINE SENHA
  const handleResetPassword = () => {
    if (validatePasswordReset()) {
      resetPassword(passwordResetData as PasswordReset);
    }
  };

  useEffect(() => {
    if (isEmailSent && isEmailResent) {
      showToast('E-mail reenviado com sucesso', 'success');
      setIsEmailResent(false);
    }
  }, [isEmailSent, isEmailResent]);

  useEffect(() => {
    if (isPasswordReset) {
      showToast('Senha redefinida com sucesso', 'success');
      navigation.goBack();
    }
  }, [isPasswordReset]);

  useEffect(() => {
    if (emailError) {
      showToast(emailError?.message, 'error');
    }
  }, [emailError]);

  return {
    passwordResetData,
    handlePasswordResetDataChange,
    passwordResetErrors,
    handleSendEmail,
    isEmailSent,
    handleValidateCode,
    isCodeValid,
    handleResetPassword,
    isPasswordReset,
  };
};

export default usePasswordResetHandler;
