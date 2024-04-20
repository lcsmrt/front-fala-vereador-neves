import Svg, {Path} from 'react-native-svg';

const SendIcon = ({
  stroke,
  strokeWidth = 1.5,
}: {
  strokeWidth?: number;
  stroke?: string;
}) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.0703 2.92961L10.4063 13.5936M3.271 8.23529L19.8769 2.47406C20.8995 2.11927 21.8807 3.1004 21.5259 4.12303L15.7646 20.7289C15.37 21.8665 13.7725 21.8977 13.3337 20.7764L10.6968 14.0377C10.5651 13.7011 10.2988 13.4348 9.96226 13.3031L3.22354 10.6662C2.10219 10.2275 2.13338 8.62997 3.271 8.23529Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default SendIcon;
