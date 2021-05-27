import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

type FooterProps = {
  children: ReactNode
}

export default function Footer({ children }: FooterProps): JSX.Element {
  return (
    <Flex
      bgGradient="linear(to-r, secondary.400, primary.400)"
      color="white"
      justify="center"
      align="center"
      as="footer"
      py={7}
    >
      {children}
    </Flex>
  )
}
