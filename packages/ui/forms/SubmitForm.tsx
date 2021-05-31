import { Button, ButtonProps } from '@chakra-ui/button'
import { ReactNode } from 'react'
import { Control, useFormState } from 'react-hook-form'

type SubmitFormProps = {
  children: ReactNode
  control?: Control<Record<string, unknown>>
}

export default function SubmitForm({
  control,
  children,
  ...rest
}: SubmitFormProps & ButtonProps): JSX.Element {
  const { isSubmitting } = useFormState({ control })
  return (
    <Button {...rest} type="submit" isLoading={isSubmitting}>
      {children}
    </Button>
  )
}
