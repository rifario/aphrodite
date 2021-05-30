import { Box } from '@chakra-ui/layout'
import { Children, createElement, ReactElement } from 'react'
import { useForm } from 'react-hook-form'

type FormProps = {
  defaultValues?: Record<string, unknown>
  children: ReactElement | ReactElement[]
  onSubmit: (data: Record<string, unknown>) => void
}

export default function Form({
  defaultValues = {},
  children,
  onSubmit
}: FormProps): JSX.Element {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      {Children.map(children, child => {
        return child.props.name
          ? createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                errors: methods.formState.errors,
                control: methods.control,
                key: child.props.name
              }
            })
          : child
      })}
    </Box>
  )
}
