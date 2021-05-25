import { Flex, FlexProps, LinkProps, useDisclosure } from '@chakra-ui/react'
import { ReactComponentElement, ReactNode } from 'react'

import MenuItem from './MenuItem'
import MenuLinks from './MenuLinks'
import MenuToggle from './MenuToggle'

type ItemProps = {
  href: string
  children: ReactNode
}

function NavbarItem({ href, children, ...rest }: ItemProps & LinkProps) {
  return (
    <MenuItem {...rest} href={href}>
      {children}
    </MenuItem>
  )
}

type NavbarProps = {
  children:
    | ReactComponentElement<typeof NavbarItem>[]
    | ReactComponentElement<typeof NavbarItem>
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
      mb={8}
      p={8}
    >
      <MenuToggle breakpoint={breakpoint} isOpen={isOpen} toggle={onToggle} />
      <MenuLinks breakpoint={breakpoint} isOpen={isOpen}>
        {children}
      </MenuLinks>
    </Flex>
  )
}

Navbar.Item = NavbarItem
