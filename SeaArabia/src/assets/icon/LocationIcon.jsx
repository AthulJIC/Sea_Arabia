import React from 'react';
import { Svg, Path } from 'react-native-svg';

const LocationIcon = ({color}) => {
  return (
    <Svg width={15} height={16} viewBox="0 0 9 13" fill="none">
      <Path
        d="M4.5 0.25C2.08125 0.25 0.125 2.20625 0.125 4.625C0.125 7.90625 4.5 12.75 4.5 12.75C4.5 12.75 8.875 7.90625 8.875 4.625C8.875 2.20625 6.91875 0.25 4.5 0.25ZM4.5 6.1875C3.6375 6.1875 2.9375 5.4875 2.9375 4.625C2.9375 3.7625 3.6375 3.0625 4.5 3.0625C5.3625 3.0625 6.0625 3.7625 6.0625 4.625C6.0625 5.4875 5.3625 6.1875 4.5 6.1875Z"
        fill={color}
        fillOpacity={0.8}
      />
    </Svg>
  );
};

export default LocationIcon;
