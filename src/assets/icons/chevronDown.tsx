import Svg, {Path} from 'react-native-svg';

const ChevronDownIcon = ({
  stroke,
  strokeWidth = 1.5,
}: {
  strokeWidth?: number;
  stroke?: string;
}) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 10L12.0008 14.58L17 10"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ChevronDownIcon;
