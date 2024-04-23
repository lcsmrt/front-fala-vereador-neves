import {Switch as RNSwitch} from 'react-native';

interface SwitchProps {
  value: boolean;
  onToggle: (value: boolean) => void;
}

const Switch = ({value, onToggle}: SwitchProps) => {
  return (
    <RNSwitch
      value={value}
      onValueChange={onToggle}
      trackColor={{false: '#CBD5E1', true: '#0284C7'}}
      thumbColor={value ? '#BAE6FD' : '#f4f3f4'}
      ios_backgroundColor={'#3e3e3e'}
    />
  );
};

export default Switch;
