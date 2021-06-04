import { Box, usePrefersReducedMotion } from '@chakra-ui/react'
import { ReactNode, useState } from 'react'
import SparkleInstance, { generateSparkle } from './SparklesInstance'

import { random, range } from '../../utils/functions'
import { useRandomInterval } from '../../utils/hooks'

type SparkleProps = {
  children: ReactNode
  color?: string
  amount?: number
  delay?: {
    min: number
    max: number
  }
}

const DEFAULT_COLOR = 'hsl(50deg, 100%, 50%)'

export default function Sparkles({
  color = DEFAULT_COLOR,
  children,
  amount = 4,
  delay = { min: 200, max: 800 },
  ...delegated
}: SparkleProps): JSX.Element {
  const [sparkles, setSparkles] = useState(() => {
    return range(amount).map(() => generateSparkle(color))
  })

  const prefersReducedMotion = usePrefersReducedMotion()

  useRandomInterval(
    () => {
      const sparkle = generateSparkle(
        `hsl(${random(50, 60)}deg, ${random(90, 100)}%, ${random(50, 75)}%)`
      )
      const now = Date.now()
      const nextSparkles = sparkles.filter(sp => {
        const delta = now - sp.createdAt
        return delta < 750
      })
      nextSparkles.push(sparkle)
      setSparkles(nextSparkles)
    },
    prefersReducedMotion ? null : delay.min,
    prefersReducedMotion ? null : delay.max
  )

  return (
    <Box as="span" display="inline-block" position="relative" {...delegated}>
      {sparkles.map(sparkle => (
        <SparkleInstance
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
  )
}
