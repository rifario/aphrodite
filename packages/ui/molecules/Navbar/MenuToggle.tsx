import { Button } from '@chakra-ui/react'

import { FiMenu, FiX } from 'react-icons/fi'

type MenuToggleProps = {
  toggle: () => void
  isOpen: boolean
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export default function MenuToggle({
  toggle,
  isOpen,
  breakpoint
}: MenuToggleProps): JSX.Element {
  return (
    <Button
      display={{ base: 'block', [breakpoint]: 'none' }}
      size="lg"
      onClick={toggle}
      variant="ghost"
      colorScheme="whiteAlpha"
    >
      {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
    </Button>
  )
}
