import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import { Link, LinkProps } from '@chakra-ui/react'

export type MenuItemProps = {
  href: string
  children: ReactNode
}

export default function MenuItem({
  href,
  children,
  ...rest
}: MenuItemProps & LinkProps): JSX.Element {
  const router = useRouter()
  const prefetch = () => router.prefetch(href)
  return (
    <Link
      {...rest}
      onMouseEnter={prefetch}
      onFocusCapture={prefetch}
      href={href}
    >
      {children}
    </Link>
  )
}
