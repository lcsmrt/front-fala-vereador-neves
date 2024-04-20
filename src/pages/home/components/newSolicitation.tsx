import {Text, View} from 'react-native';
import Button from '../../../components/button/button';
import useValidation from '../../../lib/hooks/useValidation';

const NewSoliciation = () => {
  const {} = useValidation({});

  return (
    <View>
      <View></View>
      <View></View>
      <Button>
        <Text>Enviar</Text>
      </Button>
    </View>
  );
};

export default NewSoliciation;
