import { assign, interpret, Machine } from 'xstate'

export type RaffleType = {
  name: string
  prizeDrawDate: string
  ticketsAmount: number
  ticketsValue: string
  chartAmount: number
  chartValue: string
  prizes: { name: string; amount: number }[]
}

type RaffleContext = Partial<RaffleType> | RaffleType

// type RaffleEvent =
//   | {
//       type: 'NEXT'
//       data: Partial<RaffleType> | RaffleType
//     }
//   | {
//       type: 'PREV'
//     }

const machine = Machine<RaffleContext>(
  {
    id: '@rifario/forms/new-raffle',
    initial: 'raffle',
    context: {},
    states: {
      raffle: {
        on: {
          PREV: {
            actions: ['callback']
          },
          NEXT: {
            target: 'prizes',
            actions: ['updateContext']
          }
        }
      },
      prizes: {
        on: {
          PREV: 'raffle',
          NEXT: {
            target: 'confirm',
            actions: ['updateContext']
          }
        }
      },
      confirm: {
        on: {
          PREV: 'prizes',
          NEXT: 'complete'
        }
      },
      complete: {
        type: 'final'
      }
    }
  },
  {
    actions: {
      updateContext: assign((_ctx, e) => {
        return e.data
      }),
      callback: (_ctx, e) => e.cb()
    }
  }
)

export default interpret(machine, { devTools: true }).start()
