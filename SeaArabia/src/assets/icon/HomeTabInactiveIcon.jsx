import React from 'react';
import { Svg, Path } from 'react-native-svg';

const HomeTabInactiveIcon = () => {
  return (
    <Svg width={20} height={17} viewBox="0 0 20 17" fill="none">
      <Path
        d="M8 17V11H12V17H17V9H20L10 0L0 9H3V17H8Z"
        fill="#020202"
        fillOpacity={0.43}
      />
    </Svg>
  );
};

export default HomeTabInactiveIcon;