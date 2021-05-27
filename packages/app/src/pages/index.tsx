import { Text } from '@chakra-ui/react'
import { Heading } from '@rifario/components/atoms'

export default function Home(): JSX.Element {
  return (
    <div>
      <Heading as="h1">Hello, world!</Heading>
      <Text as="p">Programmed to work and not to feel.</Text>
    </div>
  )
}
