import { Box, Grid, GridItem } from '@chakra-ui/react'

import { Form, Input, Number, SubmitForm } from '@rifario/components/forms'

import { useService } from '@xstate/react'

import MultiformRaffleService from '../../machines/multiform-raffle.machine'

export default function CreateRaffleData(): JSX.Element {
  const [current, send] = useService(MultiformRaffleService)

  const onSubmit = data => {
    send({ type: 'NEXT', data })
  }

  return (
    <Form defaultValues={current.context} onSubmit={onSubmit}>
      <Grid mb={[24, 24, 48]} gap={6} templateRows="1fr 1fr 1fr">
        <GridItem
          as="fieldset"
          display="flex"
          flexDirection={['column', 'column', 'row']}
          sx={{ gap: 24 }}
        >
          <Input
            validation={{ required: 'O campo nome é obrigatório' }}
            label="Nome"
            name="name"
            placeholder="Ex: Rifa de Natal"
          />
          <Input
            validation={{ required: 'O campo data do sorteio é obrigatório' }}
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
          <Number
            label="Valor de cada bilhete (em reais)"
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
          <Number label="Valor de cada cartela (em reais)" name="chartValue" />
        </GridItem>
      </Grid>
      <Box mx="auto" as="footer" maxW="lg">
        <SubmitForm w="full">Próximo</SubmitForm>
      </Box>
    </Form>
  )
}
