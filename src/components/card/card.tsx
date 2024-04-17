import clsx from 'clsx';
import {View, TouchableOpacity} from 'react-native';

interface CardProps {
  classes?: string;
  children?: React.ReactNode;
  touchable?: boolean;
  onPress?: () => void;
  hasShadow?: boolean;
}

const Card = ({
  classes,
  children,
  touchable,
  onPress,
  hasShadow,
}: CardProps) => {
  const cardStyles = clsx(
    'bg-slate-50 p-6 rounded-xl border border-slate-200',
    classes,
  );
  return (
    <>
      {touchable ? (
        <TouchableOpacity
          className={cardStyles}
          onPress={onPress}
          style={
            hasShadow
              ? {
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 1,
                }
              : {}
          }>
          {children}
        </TouchableOpacity>
      ) : (
        <View
          className={cardStyles}
          style={
            hasShadow
              ? {
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,
                  elevation: 3,
                }
              : {}
          }>
          {children}
        </View>
      )}
    </>
  );
};

export default Card;
