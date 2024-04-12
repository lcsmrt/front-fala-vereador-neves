import clsx from 'clsx';
import React, {useState} from 'react';
import {Text, TextInput, TextInputProps, View} from 'react-native';

interface InputProps extends TextInputProps {
  variant?: 'default' | 'destructive';
  inputSize?: 'default' | 'sm' | 'lg';
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

    const wrapperStyle = clsx('flex items-end justify-between gap-3', classes);
    const inputStyle = clsx(
      'flex flex-row w-full items-center justify-between overflow-hidden rounded-xl border',
      'bg-slate-50 px-3 text-sm transition-colors',
      isDisabled && 'opacity-50',
      variant === 'destructive'
        ? isFocused
          ? 'border-rose-700'
          : 'border-rose-700'
        : isFocused
        ? 'border-green-600'
        : 'border-slate-400',
      inputSize === 'sm' ? 'h-12' : inputSize === 'lg' ? 'h-16' : 'h-14',
    );

    return (
      <View className={wrapperStyle}>
        <View className="grid w-full gap-1">
          <View className="grid w-full gap-1.5">
            {label && <Text>{label}</Text>}
            <View className={inputStyle}>
              {leftIcon && <>{leftIcon}</>}
              <TextInput
                ref={ref}
                {...inputProps}
                className="h-full flex-1 border-none bg-transparent"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              {rightIcon && <>{rightIcon}</>}
            </View>
          </View>
          {notification && (
            <View className="h-3">
              <Text className="text-xs text-rose-700">{notification}</Text>
            </View>
          )}
        </View>
      </View>
    );
  },
);

export default Input;
