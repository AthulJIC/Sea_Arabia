import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BookMarkActive = () => {
  return (
    <View>
      <Svg width={12} height={16} viewBox="0 0 12 16" fill="none">
        <Path
          d="M10.1667 0.5H1.83341C0.916748 0.5 0.175082 1.25 0.175082 2.16667L0.166748 15.5L6.00008 13L11.8334 15.5V2.16667C11.8334 1.25 11.0834 0.5 10.1667 0.5Z"
          fill="#006875"
        />
      </Svg>
    </View>
  );
};

export default BookMarkActive;