import Svg, {Path} from 'react-native-svg';

const ArrowLeftIcon = ({
  stroke,
  strokeWidth = 1.5,
}: {
  strokeWidth?: number;
  stroke?: string;
}) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M10.6664 19L3.99976 12M3.99976 12L10.6664 5M3.99976 12L19.9998 12"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ArrowLeftIcon;
