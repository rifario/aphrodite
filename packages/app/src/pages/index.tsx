import { Box, Container, Heading, Stack } from '@chakra-ui/layout'
import { CurrencyDollar, CircleWavyCheck, Clock } from 'phosphor-react'

import { DataCard, OptionCard } from '@rifario/components/molecules'

export default function Dashboard(): JSX.Element {
  return (
    <Container as="main" maxW="container.lg">
      <Box
        pt={32}
        pb={48}
        mx="calc(-50vw + 50%)"
        bgGradient="linear(to-r, secondary.400, primary.400)"
        as="header"
      >
        <Container maxW="container.lg">
          <Heading mx="auto" as="h1" color="white">
            Seja bem vindo, Fulano!
          </Heading>
        </Container>
      </Box>
      <Box as="section">
        <Stack
          as="header"
          mt={-20}
          mb={20}
          spacing={6}
          align="stretch"
          justify="space-between"
          direction={['column', 'column', 'column', 'row']}
        >
          <DataCard
            icon={CurrencyDollar}
            label="Faturamento"
            value="R$ 23.000,00"
          />
          <DataCard
            icon={CircleWavyCheck}
            label="Rifas concluídas"
            value="13 rifas"
          />
          <DataCard icon={Clock} label="Rifas em andamento" value="2 rifas" />
        </Stack>
        <Box as="section">
          <Heading mb={12} size="lg" fontWeight="bold">
            Selecione o que deseja
          </Heading>
          <Stack
            direction={['column', 'column', 'row']}
            spacing={6}
            align="stretch"
            justifyContent="space-between"
          >
            <OptionCard
              title="Meus tickets e cartelas"
              description="Visualizar cartelas que você comprou"
              href="#"
            />
            <OptionCard
              title="Gerenciar Rifas"
              description="Gerenciar as rifas que você criou"
              href="#"
            />
            <OptionCard
              title="Criar Nova Rifa"
              description="Criar uma nova rifa"
              href="#"
            />
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}
