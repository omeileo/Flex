import React from 'react'

import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg'

import { PillTabBarIconProps } from './PillTabBarIcon.types'

const ICON_VIEWBOX = 24
const STROKE_WIDTH = 2

const PillTabBarIcon = ({ tabKey, color, size = 18 }: PillTabBarIconProps) => {
  const strokeProps = {
    stroke: color,
    strokeWidth: STROKE_WIDTH,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none'
  }

  switch (tabKey) {
    case 'today':
      return (
        <Svg width={size} height={size} viewBox={`0 0 ${ICON_VIEWBOX} ${ICON_VIEWBOX}`} fill="none">
          <Path d="M8 2v4" {...strokeProps} />
          <Path d="M16 2v4" {...strokeProps} />
          <Rect x={3} y={4} width={18} height={18} rx={2} {...strokeProps} />
          <Path d="M3 10h18" {...strokeProps} />
        </Svg>
      )

    case 'plan':
      return (
        <Svg width={size} height={size} viewBox={`0 0 ${ICON_VIEWBOX} ${ICON_VIEWBOX}`} fill="none">
          <Rect x={3} y={3} width={7} height={7} rx={1} {...strokeProps} />
          <Rect x={14} y={3} width={7} height={7} rx={1} {...strokeProps} />
          <Rect x={14} y={14} width={7} height={7} rx={1} {...strokeProps} />
          <Rect x={3} y={14} width={7} height={7} rx={1} {...strokeProps} />
        </Svg>
      )

    case 'progress':
      return (
        <Svg width={size} height={size} viewBox={`0 0 ${ICON_VIEWBOX} ${ICON_VIEWBOX}`} fill="none">
          <Polyline points="22 7 13.5 15.5 8.5 10.5 2 17" {...strokeProps} />
          <Polyline points="16 7 22 7 22 13" {...strokeProps} />
        </Svg>
      )

    case 'coach':
      return (
        <Svg width={size} height={size} viewBox={`0 0 ${ICON_VIEWBOX} ${ICON_VIEWBOX}`} fill="none">
          <Path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" {...strokeProps} />
        </Svg>
      )

    case 'profile':
      return (
        <Svg width={size} height={size} viewBox={`0 0 ${ICON_VIEWBOX} ${ICON_VIEWBOX}`} fill="none">
          <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" {...strokeProps} />
          <Circle cx={12} cy={7} r={4} {...strokeProps} />
        </Svg>
      )

    default:
      return (
        <Svg width={size} height={size} viewBox={`0 0 ${ICON_VIEWBOX} ${ICON_VIEWBOX}`} fill="none">
          <Line x1={4} y1={12} x2={20} y2={12} {...strokeProps} />
        </Svg>
      )
  }
}

export default PillTabBarIcon
