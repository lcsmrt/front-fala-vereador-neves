import clsx from 'clsx';
import {View} from 'react-native';

interface SeparatorProps {
  classes?: string;
  orientation?: 'horizontal' | 'vertical';
}

const Separator = ({classes, orientation}: SeparatorProps) => {
  const separatorStyles = clsx(
    'shrink-0 bg-slate-400',
    orientation === 'horizontal' ? 'h-[1px] w-full' : 'w-[1px] h-full',
    classes,
  );

  return <View className={separatorStyles} />;
};

export default Separator;
