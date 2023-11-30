import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const BackIcon = ({color}) => {
  return (
    <View>
      <Svg width={6} height={12} viewBox="0 0 6 12">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.46849 0.414376C5.79194 0.673133 5.84438 1.1451 5.58562 1.46855L1.96044 6.00003L5.58562 10.5315C5.84438 10.855 5.79194 11.3269 5.46849 11.5857C5.14505 11.8444 4.67308 11.792 4.41432 11.4685L0.414321 6.46855C0.195189 6.19464 0.195189 5.80542 0.414321 5.53151L4.41432 0.531506C4.67308 0.20806 5.14505 0.155619 5.46849 0.414376Z"
          fill={color}
        />
      </Svg>
    </View>
  );
};

export default BackIcon;
