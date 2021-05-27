import { ReactNode } from 'react'

import {
  Heading as CHeading,
  HeadingProps as CHeadingProps
} from '@chakra-ui/react'

type HeadingProps = {
  children: ReactNode
}

export default function Heading({
  children,
  ...rest
}: HeadingProps & CHeadingProps): JSX.Element {
  return (
    <CHeading letterSpacing="tight" fontWeight="extrabold" {...rest}>
      {children}
    </CHeading>
  )
}
