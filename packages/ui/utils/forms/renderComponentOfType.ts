import {
  CElement,
  Component,
  createElement,
  ReactChild,
  ReactFragment,
  ReactPortal
} from 'react'

export default function getComponentOfType<T>(
  COMPONENT_MAP: ReactChild | ReactFragment | ReactPortal,
  type: string
): CElement<T, Component<T, T, T>> {
  const c = COMPONENT_MAP[type]

  if (c === undefined || c === null) return null

  return createElement(c.type, {
    ...{
      ...c.props
    }
  })
}
