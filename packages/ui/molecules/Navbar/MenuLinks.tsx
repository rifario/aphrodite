import { Box, Stack, Collapse, useMediaQuery } from '@chakra-ui/react'
import { ReactNode } from 'react'

type MenuLinksProps = {
  isOpen: boolean
  children: ReactNode
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

type ConditionalCollapseProps = {
  isOpen: boolean
  children: ReactNode
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const getBreakpoint = (bp: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => {
  switch (bp) {
    case 'sm':
      return '(min-width: 30em)'
    case 'md':
      return '(min-width: 48em)'
    case 'lg':
      return '(min-width: 62em)'
    case 'xl':
      return '(min-width: 80em)'
    case '2xl':
      return '(min-width: 96em)'
    default:
      return '(min-width: 30em)'
  }
}

const ConditionalCollapse = ({
  children,
  isOpen,
  breakpoint
}: ConditionalCollapseProps) => {
  const [matches] = useMediaQuery(getBreakpoint(breakpoint))

  if (!matches) {
    return (
      <Collapse in={isOpen} animateOpacity>
        {children}
      </Collapse>
    )
  }
  return <>{children}</>
}

export default function MenuLinks({
  isOpen,
  children,
  breakpoint
}: MenuLinksProps): JSX.Element {
  return (
    <Box
      as="nav"
      role="navigation"
      flexBasis={{ base: '100%', [breakpoint]: 'auto' }}
    >
      <ConditionalCollapse breakpoint={breakpoint} isOpen={isOpen}>
        <Stack
          spacing={8}
          as="ul"
          align="center"
          justify={{ base: 'center', [breakpoint]: 'flex-end' }}
          direction={{ base: 'column', [breakpoint]: 'row' }}
          pt={[4, 0, 0, 0]}
          listStyleType="none"
        >
          {children}
        </Stack>
      </ConditionalCollapse>
    </Box>
  )
}
