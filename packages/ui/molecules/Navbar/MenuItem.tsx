import { ReactNode } from 'react'
import Link, { LinkProps } from '../../atoms/Link'

export type MenuItemProps = {
  href: string
  children: ReactNode
}

export default function MenuItem({
  href,
  children,
  ...rest
}: MenuItemProps & LinkProps): JSX.Element {
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  )
}
