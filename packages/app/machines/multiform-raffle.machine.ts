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

type RaffleContext = {
  raffle: Partial<RaffleType> | RaffleType | null
  feedback: {
    raffle: boolean
    prizes: boolean
    confirm: boolean
  }
}

const machine = Machine<RaffleContext>(
  {
    id: '@rifario/forms/new-raffle',
    initial: 'raffle',
    context: {
      raffle: null,
      feedback: {
        raffle: false,
        prizes: false,
        confirm: false
      }
    },
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
          NEXT: { target: 'complete', actions: ['updateFeedback'] }
        }
      },
      complete: {
        type: 'final'
      }
    }
  },
  {
    actions: {
      updateContext: assign((ctx, e) => {
        return {
          ...ctx,
          raffle: { ...ctx.raffle, ...e.data },
          feedback: { ...ctx.feedback, ...e.feedback }
        }
      }),
      updateFeedback: assign((ctx, e) => {
        return {
          ...ctx,
          feedback: { ...ctx.feedback, ...e.feedback }
        }
      }),
      callback: (_ctx, e) => e.cb()
    }
  }
)

export default interpret(machine).start()
