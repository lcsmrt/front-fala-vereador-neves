import Header from '../../components/header/header';
import {useEffect, useState} from 'react';
import SendEmail from './components/sendEmail/sendEmail';
import usePasswordResetHandler from './hooks/usePasswordResetHandler';
import EnterCode from './components/enterCode/enterCode';
import ResetPassword from './components/resetPassword/resetPassword';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const {
    passwordResetData,
    handlePasswordResetDataChange,
    passwordResetErrors,
    handleSendEmail,
    isEmailSent,
  } = usePasswordResetHandler();

  useEffect(() => {
    if (isEmailSent && step === 1) {
      setStep(2);
    }
  }, [isEmailSent]);

  return (
    <>
      <Header hasBackButton={step === 1} />

      {step === 1 && (
        <SendEmail
          email={passwordResetData.email}
          handlePasswordResetDataChange={handlePasswordResetDataChange}
          emailErrors={passwordResetErrors.email}
          handleSendEmail={() => handleSendEmail(false)}
        />
      )}

      {step === 2 && (
        <EnterCode
          passwordResetData={passwordResetData}
          handlePasswordResetDataChange={handlePasswordResetDataChange}
          handleResendEmail={() => handleSendEmail(true)}
        />
      )}

      {step === 3 && (
        <ResetPassword
          passwordResetData={passwordResetData}
          handlePasswordResetDataChange={handlePasswordResetDataChange}
          passwordResetErrors={passwordResetErrors}
          handleResetPassword={() => {}}
        />
      )}
    </>
  );
};

export default ForgotPassword;
