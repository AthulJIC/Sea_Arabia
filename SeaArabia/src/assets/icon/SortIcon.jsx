import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SortIcon = () => {
  return (
    <View style={{ width: 11, height: 12 }}>
      <Svg width={11} height={12} viewBox="0 0 11 12" fill="none">
        <Path
          d="M1 8.05294L3.82022 11V1M10 3.94706L7.17978 1V11"
          stroke="#191C1D"
          strokeOpacity={0.6}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default SortIcon;