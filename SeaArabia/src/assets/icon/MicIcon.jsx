import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

function MicIcon() {
  return (
    <View style={{marginLeft:13,marginTop:10}}>
        <Svg width={17} height={20} viewBox="0 0 12 16" fill="none">
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.57477 7.13672L8.58189 2.38672C8.58189 1.07414 7.51947 0.0117188 6.20768 0.0117188C4.89668 0.0117188 3.83268 1.07414 3.83268 2.38672V7.13672C3.83268 8.44772 4.89668 9.51172 6.20768 9.51172C7.51947 9.51172 8.57477 8.44772 8.57477 7.13672ZM10.4027 7.13672C10.4027 9.51172 8.39427 11.1742 6.20768 11.1742C4.02189 11.1742 2.01185 9.51172 2.01185 7.13672H0.666016C0.666016 9.84026 2.81856 12.0712 5.41602 12.4551V15.0534H6.99935V12.4551C9.59522 12.0712 11.7493 9.84026 11.7493 7.13672H10.4027Z"
            fill="black"
            fillOpacity={0.6}
        />
        </Svg>
    </View>
  );
}

export default MicIcon;