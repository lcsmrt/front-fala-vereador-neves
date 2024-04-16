import {Path, Svg} from 'react-native-svg';

const MenuIcon = ({
  stroke,
  strokeWidth = 1.5,
}: {
  stroke?: string;
  strokeWidth?: number;
}) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 18H4M20 12H4M20 6H4"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default MenuIcon;