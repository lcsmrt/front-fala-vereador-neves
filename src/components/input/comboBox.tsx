import clsx from 'clsx';
import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {FlatList, Modal, Text, TouchableOpacity, View} from 'react-native';
import Backdrop from '../backdrop/backdrop';
import ChevronDownIcon from '../../assets/icons/chevronDown';
import {TextInput} from 'react-native-gesture-handler';
import Input from './input';
import SearchIcon from '../../assets/icons/search';
import {filterOptions} from '../../lib/utils/filter';

interface ComboBoxProps {
  variant?: 'default' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  options: Record<string, any>[];
  textKey?: string;
  displayKey: string;
  value?: Record<string, any>;
  onSelect: (option: Record<string, any>) => void;
  onChange?: (text: string) => void;
  placeholder?: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  notification?: string;
  disabled?: boolean;
  classes?: string;
  manualFilter?: boolean;
}

const ComboBox = React.forwardRef(
  (
    {
      variant,
      size,
      options,
      displayKey,
      textKey,
      value,
      onSelect,
      onChange,
      placeholder,
      label,
      leftIcon,
      notification,
      disabled,
      classes,
      manualFilter = false,
    }: ComboBoxProps,
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Record<
      string,
      any
    > | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [filterText, setFilterText] = useState('');
    // TRANSFORMAR ESSE TORÓ DE CÓDIGO EM UMA FUNÇÃO UTILITÁRIA
    const filteredOptions = manualFilter
      ? options
      : filterOptions(options, displayKey, filterText);

    const inputRef = useRef<TextInput>(null);

    const getTextDisplay = () => {
      const source = value || selectedOption;

      if (!source) return placeholder ?? 'Selecionar';

      return textKey ? source[textKey] : source[displayKey];
    };
    const textDisplay = getTextDisplay();

    useEffect(() => {
      if (isOpen) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 300);
      }

      if (!isOpen) {
        setTimeout(() => {
          inputRef.current?.blur();
        }, 300);
      }
    }, [isOpen]);

    const handleSelect = (option: Record<string, any>) => {
      setSelectedOption(option);
      onSelect(option);
      setIsOpen(false);
    };

    const wrapperStyle = clsx('flex items-end justify-between', classes);
    const selectStyle = clsx(
      'flex flex-row w-full items-center justify-between overflow-hidden rounded-xl border',
      'bg-slate-50 px-3 text-sm transition-colors',
      disabled && 'opacity-50',
      variant === 'destructive' || notification
        ? 'border-rose-700'
        : isFocused
        ? 'border-green-600'
        : 'border-slate-400',
      size === 'sm' ? 'h-12' : size === 'lg' ? 'h-16' : 'h-14',
    );
    const textStyle = clsx(
      selectedOption || value ? 'text-zinc-900' : 'text-zinc-400',
    );

    return (
      <View className={wrapperStyle}>
        <View className="grid w-full">
          <View className="grid w-full">
            {label && <Text className="mb-1 text-slate-700">{label}</Text>}
            <TouchableOpacity
              className={selectStyle}
              onPress={() => !disabled && setIsOpen(true)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}>
              {leftIcon && <>{leftIcon}</>}
              <Text className={textStyle}>{textDisplay}</Text>
              <View className="h-7 w-7 ml-2">
                <ChevronDownIcon stroke="#999" />
              </View>
            </TouchableOpacity>
          </View>
          {notification && (
            <View className="pl-2 h-4 mt-1">
              <Text className="text-xs text-rose-400">{notification}</Text>
            </View>
          )}
        </View>

        <Modal
          animationType="fade"
          transparent
          visible={isOpen}
          onRequestClose={() => setIsOpen(false)}>
          <Backdrop open={isOpen} onPress={() => setIsOpen(false)}>
            <View className="bg-white w-11/12 max-h-[65%] mx-auto rounded-xl p-4">
              <Input
                placeholder="Digite para buscar..."
                onChangeText={text => {
                  if (onChange) onChange(text);
                  if (!manualFilter) setFilterText(text);
                }}
                inputSize="sm"
                ref={inputRef}
                rightIcon={
                  <View className="h-6 w-6 ml-2">
                    <SearchIcon stroke="#999" />
                  </View>
                }
              />
              <FlatList
                data={filteredOptions}
                renderItem={({item}) => (
                  <TouchableOpacity
                    className="py-3 px-3"
                    onPress={() => handleSelect(item)}>
                    <Text className="text-base text-slate-700">{item[displayKey]}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Backdrop>
        </Modal>
      </View>
    );
  },
);

export default ComboBox;
