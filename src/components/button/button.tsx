import clsx from 'clsx';
import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
  ({variant, size, ...buttonProps}, ref) => {
    const buttonStyles = clsx(
      'inline-flex items-center justify-center whitespace-nowrap',
      'rounded-xl font-medium transition-colors',
      variant === 'destructive'
        ? 'bg-rose-700 text-rose-700-foreground'
        : variant === 'outline'
        ? 'border border-green-600 bg-transparent'
        : variant === 'ghost'
        ? 'bg-transparent'
        : 'bg-green-600',
      size === 'sm'
        ? 'h-12 rounded-md px-3 text-xs'
        : size === 'lg'
        ? 'h-16 rounded-md px-8'
        : size === 'icon'
        ? 'h-8 w-8'
        : 'h-14 px-4 py-2',
    );

    return (
      <TouchableOpacity className={buttonStyles} ref={ref} {...buttonProps} />
    );
  },
);

export default Button;
