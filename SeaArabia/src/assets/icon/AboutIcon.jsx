import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const AboutIcon = () => {
  return (
    <View>
      <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
        <Path
          d="M17.4626 9.43981C17.4626 4.8142 13.8098 1.06543 9.30258 1.06543C4.79538 1.06543 1.14258 4.8142 1.14258 9.43981C1.14258 14.0654 4.79538 17.8142 9.30258 17.8142"
          stroke="#7D848D"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.7617 17.0947L18.4225 18.7992"
          stroke="#7D848D"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.7592 13.6091C17.6964 14.571 17.6964 16.1305 16.7592 17.0924C15.8219 18.0543 14.3023 18.0543 13.3651 17.0924C12.4278 16.1305 12.4278 14.571 13.3651 13.6091C14.3023 12.6472 15.8219 12.6472 16.7592 13.6091"
          stroke="#7D848D"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M1.99414 13.1651H2.04982C4.7695 13.1651 6.58294 13.0055 6.58294 10.374C6.58294 7.58286 9.30262 7.58286 9.30262 5.72178C9.30262 3.64099 5.67574 3.8607 5.67574 1.99961V1.93262"
          stroke="#7D848D"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17.4621 9.43973H14.5168C12.496 9.43973 11.4237 6.98948 12.7657 5.43874L14.7155 3.18652"
          stroke="#7D848D"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default AboutIcon;