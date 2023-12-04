import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const RightarrowIcon = ({width,height}) => {
  return (
    <View>
      <Svg width={width} height={height} viewBox="0 0 9 16" fill="none">
        <Path
          d="M1.42578 14.6004L6.85912 9.16706C7.50078 8.52539 7.50078 7.47539 6.85912 6.83372L1.42578 1.40039"
          stroke="black"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default RightarrowIcon;