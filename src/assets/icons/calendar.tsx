import Svg, {Path} from 'react-native-svg';

const CalendarIcon = ({
  stroke,
  strokeWidth = 1.5,
}: {
  strokeWidth?: number;
  stroke?: string;
}) => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 25 24" fill="none">
      <Path
        d="M8 17.2202V17.1428M12.5 17.2202V17.1428M12.5 13.0286V12.9512M16.5 13.0286V12.9512M5 8.91425H19M6.80952 3V4.54304M17 3V4.54285M17 4.54285H7C5.34315 4.54285 4 5.92436 4 7.62855V17.9143C4 19.6185 5.34315 21 7 21H17C18.6569 21 20 19.6185 20 17.9143L20 7.62855C20 5.92436 18.6569 4.54285 17 4.54285Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CalendarIcon;

<svg
  width="25"
  height="24"
  viewBox="0 0 25 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M8 17.2202V17.1428M12.5 17.2202V17.1428M12.5 13.0286V12.9512M16.5 13.0286V12.9512M5 8.91425H19M6.80952 3V4.54304M17 3V4.54285M17 4.54285H7C5.34315 4.54285 4 5.92436 4 7.62855V17.9143C4 19.6185 5.34315 21 7 21H17C18.6569 21 20 19.6185 20 17.9143L20 7.62855C20 5.92436 18.6569 4.54285 17 4.54285Z"
    stroke="black"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>;
