import Svg, {Path} from 'react-native-svg';

const PaperclipIcon = ({
  stroke,
  strokeWidth = 1.5,
}: {
  strokeWidth?: number;
  stroke?: string;
}) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.5101 8.13298L10.4102 15.2328C9.56597 16.0771 8.19717 16.0771 7.35292 15.2328C6.5069 14.3868 6.50893 13.0145 7.35745 12.171L12.8632 6.69779L14.2459 5.31511C15.9282 3.63278 18.6558 3.63278 20.3381 5.31512C22.0205 6.99745 22.0205 9.72506 20.3381 11.4074L18.9763 12.7693L13.8148 17.9308C11.1448 20.712 7.09921 21.1351 4.27061 18.4197C1.47664 15.7375 1.95021 11.7162 4.7752 8.89123L9.91637 3.74927"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PaperclipIcon;