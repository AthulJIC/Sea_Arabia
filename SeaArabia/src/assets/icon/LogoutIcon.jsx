import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const LogoutIcon = () => {
  return (
    <View>
      <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <Path
          d="M8.87842 1V8.875M14.4444 3.31001C15.5455 4.41145 16.2953 5.81465 16.5989 7.34218C16.9025 8.86975 16.7464 10.453 16.1503 11.8918C15.5542 13.3306 14.5448 14.5604 13.2498 15.4256C11.9548 16.2908 10.4324 16.7525 8.875 16.7525C7.31759 16.7525 5.79513 16.2908 4.50015 15.4256C3.20517 14.5604 2.19581 13.3306 1.59969 11.8918C1.00358 10.453 0.847481 8.86975 1.15113 7.34218C1.45478 5.81465 2.20455 4.41145 3.30563 3.31001"
          stroke="#7D848D"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default LogoutIcon;