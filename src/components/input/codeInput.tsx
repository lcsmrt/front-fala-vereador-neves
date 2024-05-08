import {useState, useRef} from 'react';
import {TextInput, View} from 'react-native';

interface CodeInputProps {
  onComplete: (code: string) => void;
}

const CodeInput = ({onComplete}: CodeInputProps) => {
  const [code, setCode] = useState<string[]>(new Array(4).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const focusNext = (index: number, value: string) => {
    if (index < 3 && value) {
      inputRefs.current[index + 1]?.focus();
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (newCode.every(value => value)) {
      onComplete(newCode.join(''));
    }
  };

  const focusPrevious = (key: string, index: number) => {
    if (key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex flex-row justify-between">
      {code.map((_, index) => (
        <TextInput
          className="w-14 h-14 text-center border rounded-md border-slate-400 text-slate-700"
          ref={ref => (inputRefs.current[index] = ref)}
          key={index}
          keyboardType="number-pad"
          maxLength={1}
          value={code[index]}
          onChangeText={text => focusNext(index, text)}
          onKeyPress={({nativeEvent: {key}}) => focusPrevious(key, index)}
        />
      ))}
    </View>
  );
};

export default CodeInput;
