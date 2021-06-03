import { Flex, FlexProps, useDisclosure } from '@chakra-ui/react'
import { ReactNode } from 'react'

import MenuLinks from './MenuLinks'
import MenuToggle from './MenuToggle'

type NavbarProps = {
  children: ReactNode
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export default function Navbar({
  children,
  breakpoint,
  ...rest
}: NavbarProps & FlexProps): JSX.Element {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Flex
      {...rest}
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
    >
      <MenuToggle breakpoint={breakpoint} isOpen={isOpen} toggle={onToggle} />
      <MenuLinks breakpoint={breakpoint} isOpen={isOpen}>
        {children}
      </MenuLinks>
    </Flex>
  )
}
