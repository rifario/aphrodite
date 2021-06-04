import { Box, usePrefersReducedMotion } from '@chakra-ui/react'
import { ReactNode, useState } from 'react'
import SparkleInstance, { generateSparkle } from './SparklesInstance'

import { range } from '../../utils/functions'
import { useRandomInterval } from '../../utils/hooks'

type SparkleProps = {
  children: ReactNode
  color?: string
}

const DEFAULT_COLOR = 'hsl(50deg, 100%, 50%)'

export default function Sparkles({
  color = DEFAULT_COLOR,
  children,
  ...delegated
}: SparkleProps): JSX.Element {
  const [sparkles, setSparkles] = useState(() => {
    return range(2).map(() => generateSparkle(color))
  })

  const prefersReducedMotion = usePrefersReducedMotion()

  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color)
      const now = Date.now()
      const nextSparkles = sparkles.filter(sp => {
        const delta = now - sp.createdAt
        return delta < 750
      })
      nextSparkles.push(sparkle)
      setSparkles(nextSparkles)
    },
    prefersReducedMotion ? null : 500,
    prefersReducedMotion ? null : 1000
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
