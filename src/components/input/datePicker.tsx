import React, {useState} from 'react';
import {View, Platform, Text} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import clsx from 'clsx';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CalendarIcon from '../../assets/icons/calendar';

interface DatePickerProps {
  variant?: 'default' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  label?: string;
  notification?: string;
  disabled?: boolean;
  classes?: string;
  value?: Date;
  onDateChange?: (date: Date | null) => void;
}

const DatePicker = ({
  variant,
  size,
  label,
  notification,
  disabled,
  classes,
  value,
  onDateChange,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | null>(value || null);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState<boolean>(false);

  const onChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // IOS PRECISA QUE O COMPONENTE FIQUE ABERTO AO SCROLLAR, ANDROID PRECISA QUE SEJA FECHADO
    setDate(currentDate);
    onDateChange && onDateChange(currentDate);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const wrapperStyle = clsx('flex items-end justify-between', classes);
  const datePickerStyle = clsx(
    'flex flex-row w-full items-center justify-between overflow-hidden rounded-xl border',
    'bg-slate-50 px-3 text-sm transition-colors',
    disabled && 'opacity-50',
    variant === 'destructive' || notification
      ? 'border-rose-700'
      : 'border-slate-400',
    size === 'sm' ? 'h-12' : size === 'lg' ? 'h-16' : 'h-14',
  );
  const textStyle = clsx(date ? 'text-zinc-900' : 'text-zinc-400');

  const formattedDate = date
    ? new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(date)
    : 'Selecione uma data';

  return (
    <View className={wrapperStyle}>
      <View className="grid w-full">
        <View className="grid w-full">
          {label && <Text className="mb-1 text-slate-700">{label}</Text>}
          <TouchableOpacity
            className={datePickerStyle}
            onPress={showDatepicker}>
            <Text className={textStyle}>{formattedDate}</Text>
            <View className="h-6 w-6 ml-2">
              <CalendarIcon stroke="#999" />
            </View>
          </TouchableOpacity>
        </View>
        {notification && (
          <View className="pl-2 h-4 mt-1">
            <Text className="text-xs text-rose-400">{notification}</Text>
          </View>
        )}
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
