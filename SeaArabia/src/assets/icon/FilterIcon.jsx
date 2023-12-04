import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const FilterIcon = () => {
  return (
    <Svg width={14} height={9} viewBox="0 0 14 9" fill="none">
      <Path
        d="M1 1H13M3 4.5H11M5.66667 8H8.33333"
        stroke="#191C1D"
        strokeOpacity={0.6}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default FilterIcon;