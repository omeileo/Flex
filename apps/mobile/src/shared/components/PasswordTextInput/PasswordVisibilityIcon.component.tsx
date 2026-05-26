import React from 'react'

import { colors } from '@shared/styles/StyleConstants'
import Svg, { Circle, Line, Path } from 'react-native-svg'

type PasswordVisibilityIconProps = {
  visible: boolean
}

const PasswordVisibilityIcon = ({ visible }: PasswordVisibilityIconProps) => {
  const iconColor = colors.textSecondary

  if (!visible) {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
        <Path
          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
          stroke={iconColor}
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx={12} cy={12} r={3} stroke={iconColor} strokeWidth={1.75} />
      </Svg>
    )
  }

  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2 12s3.5-7 10-7c2.1 0 3.9.7 5.3 1.7M22 12s-3.5 7-10 7c-2.1 0-3.9-.7-5.3-1.7"
        stroke={iconColor}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M9.9 9.9A3 3 0 0 1 14.1 14.1" stroke={iconColor} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1={4} y1={4} x2={20} y2={20} stroke={iconColor} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  )
}

export default PasswordVisibilityIcon
