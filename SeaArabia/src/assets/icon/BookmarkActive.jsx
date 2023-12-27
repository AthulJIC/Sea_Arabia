import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BookMarkActive(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#fff" d="M0 0H20V20H0z" />
      <Path
        d="M14.167 2.5H5.833c-.916 0-1.658.75-1.658 1.667L4.167 17.5 10 15l5.833 2.5V4.167c0-.917-.75-1.667-1.666-1.667z"
        fill="#006875"
      />
    </Svg>
  )
}

export default BookMarkActive
