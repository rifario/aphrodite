import { Box, Heading, Container, Grid } from '@chakra-ui/react'

import { RaffleCard } from '@rifario/components/molecules/cards'

const rafflesMock = [
  {
    id: 'a22HKl',
    fresh: true,
    title: 'Rifa de Dia dos Namorados',
    prizeDrawDate: '10/06/2021',
    data: {
      ticketsAmount: 20000,
      ticketsSold: 18337
    }
  },
  {
    id: 'x14PQS',
    fresh: false,
    title: 'Rifa de Natal',
    prizeDrawDate: '24/12/2020',
    data: {
      ticketsAmount: 10000,
      ticketsSold: 7923
    }
  },
  {
    id: 'e02XCQ',
    fresh: true,
    title: 'Bolão do 0KM',
    prizeDrawDate: '10/10/2021',
    data: {
      ticketsAmount: 100000,
      ticketsSold: 12350
    }
  }
]

export default function Raffles(): JSX.Element {
  return (
    <Container pt={20} maxW="container.lg" as="main">
      <Box mb={20} as="header">
        <Heading as="h1" size="xl">
          Minhas rifas
        </Heading>
      </Box>
      <Grid
        as="section"
        gap={4}
        templateColumns="repeat(auto-fill, minmax(15rem, 1fr))"
        autoRows="minmax(18rem, 1fr)"
      >
        {rafflesMock.map(raffle => (
          <RaffleCard key={raffle.id} raffle={raffle} />
        ))}
      </Grid>
    </Container>
  )
}
