import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const StarActiveIcon = ({height, width}) => {
  return (
    <View>
      <Svg width={width} height={height} viewBox="0 0 11 10" fill="none">
        <Path
          d="M5.189 7.81289L8.3427 9.71633L7.5058 6.12888L10.2921 3.71513L6.62297 3.40384L5.189 0.0205078L3.75504 3.40384L0.0859375 3.71513L2.87221 6.12888L2.03531 9.71633L5.189 7.81289Z"
          fill="#E8C301"
          fillOpacity={0.6}
        />
      </Svg>
    </View>
  );
};

export default StarActiveIcon;