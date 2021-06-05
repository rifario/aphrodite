import { Box, Container, Grid, GridItem, Icon, Text } from '@chakra-ui/react'
import { Link } from '@rifario/components/atoms'
import { Form, Input, Number, SubmitForm } from '@rifario/components/forms'
import { useMachine } from '@xstate/react'
import { useEffect } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import multiformRaffleMachine from '../../../machines/multiform-raffle.machine'

export default function CreateRaffleData(): JSX.Element {
  const [current, send] = useMachine(multiformRaffleMachine)

  useEffect(() => {
    if (current.matches('init')) send('RAFFLE')
  }, [])

  useEffect(() => {
    console.log(current.context)
  }, [current.context])

  const onSubmit = data => {
    send({ type: 'NEXT', data })
  }

  return (
    <Container py={16} as="section" maxW="container.lg">
      <Link letterSpacing="tighter" href="/">
        <Icon as={FiArrowLeft} />
        <Text as="span" verticalAlign="middle" ml={2}>
          Voltar
        </Text>
      </Link>
      <Box my={10} h={24} w="full" bg="gray.400" />
      <Form onSubmit={onSubmit}>
        <Grid mb={[24, 24, 48]} gap={6} templateRows="1fr 1fr 1fr">
          <GridItem
            as="fieldset"
            display="flex"
            flexDirection={['column', 'column', 'row']}
            sx={{ gap: 24 }}
          >
            <Input
              validation={{ required: 'Este campo é obrigatório' }}
              label="Nome"
              name="name"
              placeholder="Ex: Rifa de Natal"
            />
            <Input
              validation={{ required: 'Este campo é obrigatório' }}
              label="Data do sorteio"
              name="prizeDrawDate"
              type="date"
            />
          </GridItem>
          <GridItem
            as="fieldset"
            display="flex"
            flexDirection={['column', 'column', 'row']}
            sx={{ gap: 24 }}
          >
            <Number
              label="Nº de bilhetes"
              name="ticketsAmount"
              placeholder="Ex: 10000"
            />
            <Input
              label="Valor de cada bilhete"
              mask="currency"
              name="ticketsValue"
            />
          </GridItem>
          <GridItem
            as="fieldset"
            display="flex"
            flexDirection={['column', 'column', 'row']}
            sx={{ gap: 24 }}
          >
            <Number
              label="Nº de cartelas"
              name="chartAmount"
              placeholder="Ex: 10000"
            />
            <Number label="Valor de cada cartela" name="chartValue" />
          </GridItem>
        </Grid>
        <Box mx="auto" as="footer" maxW="lg">
          <SubmitForm w="full">Próximo</SubmitForm>
        </Box>
      </Form>
    </Container>
  )
}
