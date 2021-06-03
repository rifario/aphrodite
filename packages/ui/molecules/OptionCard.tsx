import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import { Link } from '../atoms'

type OptionCardProps = {
  title: string
  description: string
  href: string
}

export default function OptionCard({
  title,
  description,
  href
}: OptionCardProps): JSX.Element {
  return (
    <Flex
      bg="white"
      border="2px"
      borderRadius="xl"
      borderColor="primary.400"
      direction="column"
      align="center"
      textAlign="center"
      w="full"
      overflow="hidden"
      px={10}
    >
      <Box
        mb={10}
        mx={-10}
        bgGradient="linear(to-r, secondary.400, primary.400)"
        w="calc(100% + 5rem)"
        h="3xs"
      />
      <Heading mb={3} as="h1" size="md" fontWeight="bold">
        {title}
      </Heading>
      <Heading mb={12} as="p" size="sm" fontWeight="regular">
        {description}
      </Heading>
      <Link mt="auto" mb={10} w="full" href={href}>
        <Button w="full" variant="outline">
          Ver detalhes
        </Button>
      </Link>
    </Flex>
  )
}
