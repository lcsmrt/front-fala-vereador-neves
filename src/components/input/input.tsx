import clsx from 'clsx';
import React, {useState} from 'react';
import {Text, TextInput, TextInputProps, View} from 'react-native';

interface InputProps extends TextInputProps {
  variant?: 'default' | 'destructive';
  inputSize?: 'default' | 'sm' | 'lg' | 'multiline';
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  notification?: string;
  classes?: string;
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      variant,
      inputSize,
      label,
      leftIcon,
      rightIcon,
      notification,
      classes,
      ...inputProps
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const isDisabled = inputProps.editable === false;

    const wrapperStyle = clsx('flex items-end justify-between', classes);
    const inputStyle = clsx(
      'flex flex-row w-full items-center justify-between overflow-hidden rounded-xl border',
      'bg-slate-50 px-3 text-sm transition-colors',
      isDisabled && 'opacity-50',
      variant === 'destructive' || notification
        ? 'border-rose-700'
        : isFocused
        ? 'border-green-600'
        : 'border-slate-400',
      inputSize === 'sm'
        ? 'h-12'
        : inputSize === 'lg'
        ? 'h-16'
        : inputSize === 'multiline'
        ? 'h-fit max-h-28'
        : 'h-14',
    );

    return (
      <View className={wrapperStyle}>
        <View className="grid w-full">
          <View className="grid w-full">
            {label && <Text className="mb-1">{label}</Text>}
            <View className={inputStyle}>
              {leftIcon && <>{leftIcon}</>}
              <TextInput
                ref={ref}
                {...inputProps}
                className="h-full flex-1 border-none bg-transparent py-2 text-slate-700"
                textAlignVertical={inputSize === 'multiline' ? 'top' : 'center'}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              {rightIcon && <>{rightIcon}</>}
            </View>
          </View>
          {notification && (
            <View className="pl-2 h-4 mt-1">
              <Text className="text-xs text-rose-400">{notification}</Text>
            </View>
          )}
        </View>
      </View>
    );
  },
);

export default Input;
