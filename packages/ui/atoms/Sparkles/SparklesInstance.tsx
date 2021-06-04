import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { CSSProperties } from 'react'
import { random } from '../../utils/functions'

type InstanceProps = {
  color: string
  size: number | string
  style: CSSProperties
}

const DEFAULT_COLOR = 'hsl(50deg, 100%, 50%)'

export function generateSparkle(color = DEFAULT_COLOR): {
  id: string
  createdAt: number
  color: string
  size: number
  style: {
    top: string
    left: string
    zIndex: number
  }
} {
  return {
    id: String(random(100000, 2000000)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: random(0, 100) + '%',
      left: random(0, 100) + '%',
      zIndex: 2
    }
  }
}

const growAndShrink = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
`

const Wrapper = styled.div`
  position: absolute;
  display: block;
  pointer-events: none;
  z-index: 2;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${growAndShrink} 700ms forwards;
  }
`
const SVG = styled.svg`
  display: block;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} 1000ms linear;
  }
`
export default function SparkleInstance({
  size,
  color,
  style
}: InstanceProps): JSX.Element {
  const path =
    'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z'

  return (
    <Wrapper style={style}>
      <SVG width={size} height={size} viewBox="0 0 68 68" fill="none">
        <path d={path} fill={color} />
      </SVG>
    </Wrapper>
  )
}
