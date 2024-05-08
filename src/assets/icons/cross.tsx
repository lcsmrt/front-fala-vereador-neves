import Svg, {Path} from 'react-native-svg';

const CrossIcon = ({
  stroke,
  strokeWidth = 1.5,
}: {
  strokeWidth?: number;
  stroke?: string;
}) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 4L4 20M20 20L4 4"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default CrossIcon;
