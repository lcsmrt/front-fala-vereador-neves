import Header from '../../components/header/header';
import {useEffect, useState} from 'react';
import SendEmail from './components/sendEmail/sendEmail';
import usePasswordResetHandler from './hooks/usePasswordResetHandler';
import EnterCode from './components/enterCode/enterCode';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const {email, handleEmailChange, emailErrors, handleSendEmail, isEmailSent} =
    usePasswordResetHandler();

  useEffect(() => {
    if (isEmailSent) {
      setStep(2);
    }
  }, [isEmailSent]);

  return (
    <>
      <Header hasBackButton={step === 1} />

      {step === 1 && (
        <SendEmail
          email={email}
          handleEmailChange={handleEmailChange}
          emailErrors={emailErrors}
          handleSendEmail={handleSendEmail}
        />
      )}

      {step === 2 && <EnterCode email={email} />}
    </>
  );
};

export default ForgotPassword;
