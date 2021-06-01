import { Button, ButtonProps } from '@chakra-ui/button'
import { ReactNode } from 'react'
import { useFormState } from 'react-hook-form'
import { useFormContext } from './Form'

type SubmitFormProps = {
  children: ReactNode
}

export default function SubmitForm({
  children,
  ...rest
}: SubmitFormProps & ButtonProps): JSX.Element {
  const { control } = useFormContext()
  const { isSubmitting } = useFormState({ control })
  return (
    <Button {...rest} type="submit" isLoading={isSubmitting}>
      {children}
    </Button>
  )
}
