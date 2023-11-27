import React from 'react';
import { Svg, Path } from 'react-native-svg';

const BookmarkInactive = ({color,width,height}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 12 16" fill="none">
      <Path
        d="M0.674349 2.16698V2.16667C0.674349 1.52287 1.19541 1 1.83268 1H10.166C10.8065 1 11.3327 1.52614 11.3327 2.16667V14.7417L6.19631 12.5404L5.99935 12.456L5.80239 12.5404L0.66649 14.7415L0.674349 2.16698Z"
        stroke={color}
      />
    </Svg>
  );
};

export default BookmarkInactive;