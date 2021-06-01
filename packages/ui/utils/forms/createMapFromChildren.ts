import {
  ReactElement,
  Children,
  isValidElement,
  ReactChild,
  ReactFragment,
  ReactPortal
} from 'react'

export default function createMapFromChildren(
  children: ReactElement | ReactElement[] | null
): ReactChild | ReactFragment | ReactPortal {
  const childrenArr = Children.toArray(children)

  const COMPONENT_MAP = childrenArr.reduce((acc, child) => {
    if (!isValidElement(child)) return null
    const childType = Object.assign({ id: '' }, child.type)
    return Object.assign(acc, { [childType.id]: child })
  }, {})

  return COMPONENT_MAP
}
