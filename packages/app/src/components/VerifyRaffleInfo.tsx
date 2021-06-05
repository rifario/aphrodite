import { Box, Button, Divider, Heading, HStack, Text } from '@chakra-ui/react'

import { useService } from '@xstate/react'
import MultiformRaffleService from '../../machines/multiform-raffle.machine'

export default function VerifyRaffleInfo(): JSX.Element {
  const [current, send] = useService(MultiformRaffleService)
  const { raffle } = current.context

  const handleConfirm = () => {
    send({ type: 'NEXT', feedback: { confirm: true } })
  }

  return (
    <Box>
      <Heading size="md" fontWeight="semibold" mb={4}>
        Resumo da rifa
      </Heading>
      <Box px={12} py={8} mb={36} borderRadius="xl" as="header" bg="gray.200">
        <Box color="gray.500">
          <Text as="span" display="inline-block" mx={3}>
            <strong>Nome da rifa: </strong>
            {raffle.name}
          </Text>
          <Text as="span" display="inline-block" mx={3}>
            <strong>Data do sorteio: </strong>
            {raffle.prizeDrawDate}
          </Text>
          <Text as="span" display="inline-block" mx={3}>
            <strong>Nº de bilhetes: </strong>
            {raffle.ticketsAmount || 0}
          </Text>
          <Text as="span" display="inline-block" mx={3}>
            <strong>Valor de cada bilhete: </strong>
            {raffle.ticketsValue || 0}
          </Text>
          <Text as="span" display="inline-block" mx={3}>
            <strong>Nº de cartelas: </strong>
            {raffle.chartAmount || 0}
          </Text>
          <Text as="span" display="inline-block" mx={3}>
            <strong>Valor de cada cartela: </strong>
            {raffle.chartValue || 0}
          </Text>
          <Divider my={6} borderColor="gray.400" />
          {raffle.prizes.map(prize => (
            <HStack spacing={5} key={prize.name}>
              <Text>
                <strong>Prêmio: </strong> {prize.name}
              </Text>
              <Text>
                <strong>Quantidade: </strong> {prize.amount}
              </Text>
            </HStack>
          ))}
        </Box>
      </Box>
      <Box mx="auto" as="footer" maxW="lg">
        <Button onClick={handleConfirm} w="full">
          Finalizar
        </Button>
      </Box>
    </Box>
  )
}
