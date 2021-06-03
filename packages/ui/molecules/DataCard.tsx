import { As, Box, Flex, Heading, Icon } from '@chakra-ui/react'

type DataCardProps = {
  icon: As<unknown> | undefined
  label: string
  value: string
}

export default function DataCard({
  icon,
  label,
  value
}: DataCardProps): JSX.Element {
  return (
    <Box
      w="full"
      bg="white"
      border="2px"
      borderRadius="lg"
      borderColor="primary.400"
      px={10}
      py={8}
      as="article"
    >
      <Flex mb={5} align="center" as="header">
        <Icon mr={2} w={4} h={4} as={icon} />
        <Heading
          letterSpacing="widest"
          textTransform="uppercase"
          fontWeight="regular"
          as="h1"
          size="sm"
        >
          {label}
        </Heading>
      </Flex>
      <Heading fontWeight="bold" as="h2">
        {value}
      </Heading>
    </Box>
  )
}
