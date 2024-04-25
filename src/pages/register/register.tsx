import {Text, View} from 'react-native';
import Header from '../../components/header/header';
import Separator from '../../components/separator/separator';
import Input from '../../components/input/input';
import Select from '../../components/input/select';
import DatePicker from '../../components/input/datePicker';
import Button from '../../components/button/button';
import PersonalData from './components/steps/personalData/personalData';
import ArrowLeftIcon from '../../assets/icons/arrowLeft';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Contact from './components/steps/contact/contact';
import Account from './components/steps/account/account';

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

  return (
    <>
      <Header>
        <View>
          <Button variant="ghost" size="icon" onPress={onBackPress}>
            <ArrowLeftIcon stroke="#fff" />
          </Button>
        </View>
      </Header>

      {step === 1 && <PersonalData onPressNext={onPressNext} />}
      {step === 2 && <Contact onPressNext={onPressNext} />}
      {step === 3 && <Account onFinish={() => {}} />}
    </>
  );
};

export default Register;
