import clsx from 'clsx';
import {View, TouchableOpacity} from 'react-native';

interface CardProps {
  classes?: string;
  children?: React.ReactNode;
  touchable?: boolean;
}

const Card = ({classes, children, touchable}: CardProps) => {
  const cardStyles = clsx(
    'bg-slate-50 p-6 rounded-xl border border-slate-200',
    classes,
  );
  return (
    <>
      {touchable ? (
        <TouchableOpacity className={cardStyles}>{children}</TouchableOpacity>
      ) : (
        <View className={cardStyles}>{children}</View>
      )}
    </>
  );
};

export default Card;
