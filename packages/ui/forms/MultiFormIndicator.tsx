import { List, ListItem, Text, Circle, ListProps } from '@chakra-ui/layout'
import { useBreakpointValue } from '@chakra-ui/media-query'
import { chakra } from '@chakra-ui/system'
import { Children, cloneElement, ReactComponentElement } from 'react'

type MultiFormIndicatorItemProps = {
  step?: number
  label: string
  current?: boolean
  valid?: boolean
}

const MultiFormIndicatorItem = ({
  step,
  label,
  valid,
  current
}: MultiFormIndicatorItemProps) => {
  const circleSize = useBreakpointValue([5, 6, 8])
  const fontSize = useBreakpointValue(['xs', 'sm'])
  return (
    <ListItem aria-labelledby={label} display="inline-block">
      <Circle
        data-current={current || undefined}
        data-valid={valid || undefined}
        position="relative"
        w={circleSize}
        h={circleSize}
        bgGradient="linear(to-b, secondary.400, primary.400)"
        color="white"
        fontWeight="bold"
        mx="auto"
        fontSize={fontSize}
        transition="all 0.2s"
        sx={{
          '&[data-current]': {
            transform: 'scale(1.1)',
            boxShadow: '0 0 1px 2px rgba(89, 0, 255, 0.4)'
          },
          '&[data-valid]': {
            bg: 'green.300',
            '&[data-current]': {
              boxShadow: '0 0 1px 2px rgba(0, 255, 98, 0.4)'
            }
          }
        }}
      >
        {step}
      </Circle>
      <Text
        aria-label={label}
        mt={2}
        fontWeight="semibold"
        textAlign="center"
        maxW="12ch"
        isTruncated
        fontSize={fontSize}
      >
        {label}
      </Text>
    </ListItem>
  )
}

type MultiFormIndicatorProps = {
  children: ReactComponentElement<typeof MultiFormIndicatorItem>[]
}

export default function MultiFormIndicator({
  children,
  ...rest
}: MultiFormIndicatorProps & ListProps): JSX.Element {
  const length = Children.count(children)
  return (
    <List
      {...rest}
      display="flex"
      alignItems="start"
      justifyContent="space-around"
      as="ol"
    >
      {Children.map(children, (child, index) => (
        <>
          {index === length - 1 ? (
            cloneElement(child, { step: index + 1 })
          ) : (
            <>
              {cloneElement(child, { step: index + 1 })}
              <chakra.hr
                borderColor="black"
                border="1px"
                borderRadius="3xl"
                w={`${((length * 10) / 100) * 100}%`}
                h="full"
                mt={7 / 2}
              />
            </>
          )}
        </>
      ))}
    </List>
  )
}

MultiFormIndicator.Item = MultiFormIndicatorItem
