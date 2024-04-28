import {View} from 'react-native';
import Header from '../../components/header/header';
import Button from '../../components/button/button';
import PersonalData from './components/steps/personalData/personalData';
import ArrowLeftIcon from '../../assets/icons/arrowLeft';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Contact from './components/steps/contact/contact';
import Account from './components/steps/account/account';
import useUserRegisterHandler from './hooks/useUserRegisterHandler';

const Register = () => {
  const navigation = useNavigation();

  const [step, setStep] = useState(1);

  const onBackPress = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  const onPressNext = () => {
    setStep(prev => prev + 1);
  };

  const {
    userData,
    handleUserDataChange,
    userDataErrors,
    validateUserDataField,
    handleLogin,
  } = useUserRegisterHandler();

  return (
    <>
      <Header>
        <View>
          <Button variant="ghost" size="icon" onPress={onBackPress}>
            <ArrowLeftIcon stroke="#fff" />
          </Button>
        </View>
      </Header>

      {step === 1 && (
        <PersonalData
          userData={userData}
          userDataErrors={userDataErrors}
          onPressNext={onPressNext}
          handleUserDataChange={handleUserDataChange}
          validateUserDataField={validateUserDataField}
        />
      )}
      {step === 2 && (
        <Contact
          userData={userData}
          userDataErrors={userDataErrors}
          onPressNext={onPressNext}
          handleUserDataChange={handleUserDataChange}
          validateUserDataField={validateUserDataField}
        />
      )}
      {step === 3 && <Account onFinish={() => {}} />}
    </>
  );
};

export default Register;
