import { Box, Heading, Container, Grid } from '@chakra-ui/react'

import { RaffleCard } from '@rifario/components/molecules/cards'

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
        <RaffleCard
          raffle={{
            fresh: true,
            title: 'Rifa de Natal',
            prizeDrawDate: '14/08/2021',
            data: {
              ticketsAmount: 10000,
              ticketsSold: 7923
            }
          }}
        />
      </Grid>
    </Container>
  )
}
