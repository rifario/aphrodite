import { Box, Button, Divider, Grid, GridItem, Icon } from '@chakra-ui/react'

import { Form, Input, Number, SubmitForm } from '@rifario/components/forms'

import { FiPlus } from 'react-icons/fi'

import { useService } from '@xstate/react'
import { useForm, useFieldArray } from 'react-hook-form'

import MultiformRaffleService from '../../machines/multiform-raffle.machine'

const FiPlusIcon = <Icon as={FiPlus} />

type FormValues = {
  prizes: {
    name: string
    amount: number
  }[]
}

export default function CreatePrizeData(): JSX.Element {
  const [current, send] = useService(MultiformRaffleService)

  const createDefaultValues = () => {
    const defaultValues = current.context.raffle.prizes || [
      { name: '', amount: 0 }
    ]

    return defaultValues
  }

  const { handleSubmit, register, control } = useForm<FormValues>({
    defaultValues: {
      prizes: createDefaultValues()
    }
  })
  const { fields, append, remove } = useFieldArray({ name: 'prizes', control })

  const onSubmit = data => {
    console.log(data)
    send({
      type: 'NEXT',
      data: {
        prizes: [...data.prizes]
      },
      feedback: {
        prizes: true
      }
    })
  }

  return (
    <Form config={{ handleSubmit, register, control }} onSubmit={onSubmit}>
      <Grid mb={[8, 8, 12]} gap={6}>
        {fields.map((field, index) => (
          <>
            <GridItem
              position="relative"
              key={field.id}
              as="fieldset"
              display="flex"
              flexDirection={['column', 'column', 'row']}
              sx={{ gap: 24 }}
            >
              <Input
                validation={{
                  required: 'O campo nome da recompensa é obrigatório'
                }}
                label="Nome da recompensa"
                name={`prizes.${index}.name` as const}
                placeholder="Ex: Mil reais"
                defaultValue={field.name}
              />
              <Number
                validation={{ required: 'O campo quantidade é obrigatório' }}
                label="Quantidade"
                name={`prizes.${index}.amount` as const}
                defaultValue={field.amount}
              />
              <Button
                onClick={() => remove(index)}
                size="xs"
                variant="ghost"
                position="absolute"
                right={0}
              >
                Remover
              </Button>
            </GridItem>
            <Divider />
          </>
        ))}
      </Grid>
      <Button
        mb={40}
        display="flex"
        mx="auto"
        w="full"
        maxW="lg"
        variant="outline"
        rightIcon={FiPlusIcon}
        onClick={() => append({ name: '', amount: 0 })}
      >
        Adicionar novo prêmio
      </Button>
      <Box mx="auto" as="footer" maxW="lg">
        <SubmitForm w="full">Próximo</SubmitForm>
      </Box>
    </Form>
  )
}
