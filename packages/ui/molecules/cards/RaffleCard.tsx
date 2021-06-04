import {
  Badge,
  Flex,
  GridItem,
  Heading,
  Text,
  Button,
  Box
} from '@chakra-ui/react'

type RaffleCardProps = {
  raffle: {
    fresh: boolean
    title: string
    prizeDrawDate: string
    data: {
      ticketsAmount: number
      ticketsSold: number
    }
  }
}

const formatNumberToWithDots = (number: number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

export default function RaffleCard({ raffle }: RaffleCardProps): JSX.Element {
  return (
    <GridItem
      as="article"
      overflow="hidden"
      border="2px"
      borderColor="primary.400"
      borderRadius="2xl"
      bg="white"
    >
      <Flex
        as="header"
        direction="column"
        align="center"
        justify="center"
        position="relative"
        py={5}
        mb={8}
        bgGradient="linear(to-r, secondary.400 50%, primary.400 100%)"
        w="full"
        color="white"
      >
        <Heading as="h1" size="md">
          {raffle.title}
        </Heading>
        <Text fontSize="sm">Sorteio {raffle.prizeDrawDate}</Text>
        <Badge
          px={8}
          py={1}
          bottom={-3}
          variant="solid"
          colorScheme="green"
          borderRadius="3xl"
          position="absolute"
        >
          Novo
        </Badge>
      </Flex>
      <Box px={5} as="section">
        <Flex textAlign="center" justify="space-between" as="data">
          <Heading as="h2" fontWeight="bold">
            {formatNumberToWithDots(raffle.data.ticketsAmount)}
            <Box
              as="span"
              fontWeight="light"
              letterSpacing="normal"
              fontSize="sm"
              display="block"
            >
              Total de bilhetes
            </Box>
          </Heading>
          <Heading as="h2" fontWeight="bold">
            {formatNumberToWithDots(raffle.data.ticketsSold)}
            <Box
              as="span"
              fontWeight="light"
              letterSpacing="normal"
              fontSize="sm"
              display="block"
            >
              Bilhetes vendidos
            </Box>
          </Heading>
        </Flex>
        <Box mt={12} as="footer">
          <Button variant="outline" w="full">
            Ver detalhes
          </Button>
        </Box>
      </Box>
    </GridItem>
  )
}
