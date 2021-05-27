import { PropsWithChildren } from 'react'

import NextLink from 'next/link'
import { LinkProps as NextLinkProps } from 'next/dist/client/link'
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps
} from '@chakra-ui/react'

export type LinkProps = PropsWithChildren<
  NextLinkProps & Omit<ChakraLinkProps, 'as'>
>

//  Has to be a new component because both chakra and next share the `as` keyword
export default function Link({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  isExternal,
  rel,
  ...chakraProps
}: LinkProps): JSX.Element {
  return (
    <NextLink
      passHref={true}
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
    >
      <ChakraLink
        isExternal={isExternal}
        rel={isExternal ? 'noopener' : rel}
        {...chakraProps}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}
