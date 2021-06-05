import { createMachine, assign } from 'xstate'

type Raffle = {
  name: string
  prizeDrawDate: string
  tickets?: {
    amount: number
    value: string
  }
  cards?: {
    amount: number
    value: string
  }
  prizes: [{ name: string; amount: number }]
}

type RaffleContext = {
  raffle: Partial<Raffle> | Raffle | null
}

type RaffleEvent =
  | { type: 'RAFFLE' }
  | { type: 'PRIZES' }
  | { type: 'CHECKOUT' }
  | { type: 'NEXT'; data: Partial<Raffle> }
  | { type: 'PREV' }
  | { type: 'COMPLETE'; data: Raffle }

const machine = createMachine<RaffleContext, RaffleEvent>({
  id: '@rifario/forms/new-raffle',
  initial: 'init',
  context: {
    raffle: null
  },
  states: {
    init: {
      on: {
        RAFFLE: 'raffle',
        PRIZES: 'prizes',
        CHECKOUT: 'checkout'
      }
    },
    raffle: {
      on: {
        NEXT: {
          target: 'prizes',
          actions: assign({
            raffle: (_, event) => event.data
          })
        }
      }
    },
    prizes: {
      on: {
        PREV: 'raffle',
        NEXT: 'checkout'
      }
    },
    checkout: {
      on: {
        PREV: 'raffle',
        COMPLETE: 'complete'
      }
    },
    complete: { type: 'final' }
  }
})

export default machine
