import { useRouter } from 'next/router'

import { Button, Container, Icon, Text } from '@chakra-ui/react'

import { MultiFormIndicator } from '@rifario/components/forms'

import { useService } from '@xstate/react'

import { FiArrowLeft } from 'react-icons/fi'

import MultiformRaffleService from '../../../machines/multiform-raffle.machine'

import CreateRaffleData from '../../components/CreateRaffleData'
import CreatePrizeData from '../../components/CreatePrizeData'
import VerifyRaffleInfo from '../../components/VerifyRaffleInfo'

export default function CreateNewRaffle(): JSX.Element {
  const router = useRouter()
  const [current, send] = useService(MultiformRaffleService)

  return (
    <Container py={16} as="section" maxW="container.lg">
      <Button
        onClick={() => send({ type: 'PREV', cb: () => router.back() })}
        letterSpacing="tighter"
        variant="ghost"
      >
        <Icon as={FiArrowLeft} />
        <Text as="span" verticalAlign="middle" ml={2}>
          Voltar
        </Text>
      </Button>
      <MultiFormIndicator my={10}>
        <MultiFormIndicator.Item
          current={current.matches('raffle')}
          valid={current.context?.feedback.raffle}
          label="Dados da rifa"
        />
        <MultiFormIndicator.Item
          current={current.matches('prizes')}
          valid={current.context?.feedback.prizes}
          label="Recompensas"
        />
        <MultiFormIndicator.Item
          current={current.matches('confirm')}
          valid={current.context?.feedback.confirm}
          label="Confirmação"
        />
      </MultiFormIndicator>
      {current.matches('raffle') && <CreateRaffleData />}
      {current.matches('prizes') && <CreatePrizeData />}
      {current.matches('confirm') && <VerifyRaffleInfo />}
    </Container>
  )
}
