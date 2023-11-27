import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

function SearchIcon() {
  return (
    <View style={{marginTop:10,marginLeft:10}}>
    <Svg width={19} height={19} viewBox="0 0 14 14" fill="none">
      <Path
        d="M9.625 8.5H9.0325L8.8225 8.2975C9.5575 7.4425 10 6.3325 10 5.125C10 2.4325 7.8175 0.25 5.125 0.25C2.4325 0.25 0.25 2.4325 0.25 5.125C0.25 7.8175 2.4325 10 5.125 10C6.3325 10 7.4425 9.5575 8.2975 8.8225L8.5 9.0325V9.625L12.25 13.3675L13.3675 12.25L9.625 8.5ZM5.125 8.5C3.2575 8.5 1.75 6.9925 1.75 5.125C1.75 3.2575 3.2575 1.75 5.125 1.75C6.9925 1.75 8.5 3.2575 8.5 5.125C8.5 6.9925 6.9925 8.5 5.125 8.5Z"
        fill="black"
        fillOpacity={0.6}
      />
    </Svg>
    </View>
  );
}

export default SearchIcon;