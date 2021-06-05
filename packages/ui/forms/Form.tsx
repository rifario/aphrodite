/* eslint-disable @typescript-eslint/no-explicit-any */
import { chakra, ChakraProps } from '@chakra-ui/react'
import { createContext, ReactElement, useContext } from 'react'
import {
  Control,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister
} from 'react-hook-form'

type FormProps = {
  defaultValues?: any
  children: ReactElement | ReactElement[]
  onSubmit: (data: Record<string, unknown>) => void
  config?: {
    handleSubmit: UseFormHandleSubmit<any>
    register: UseFormRegister<any>
    control: Control<any>
  }
}

type FormContextType = {
  register: UseFormRegister<Record<string, unknown>>
  control: Control<Record<string, unknown>>
}

const FormContext = createContext({} as FormContextType)

export default function Form({
  defaultValues = {},
  children,
  onSubmit,
  config,
  ...rest
}: FormProps & ChakraProps): JSX.Element {
  const { handleSubmit, register, control } = useForm({ defaultValues })

  const submit = config ? config.handleSubmit : handleSubmit
  const state = config
    ? { register: config.register, control: config.control }
    : { register, control }

  return (
    <chakra.form {...rest} onSubmit={submit(onSubmit)}>
      <FormContext.Provider value={state}>{children}</FormContext.Provider>
    </chakra.form>
  )
}

export function useFormContext(): FormContextType {
  const context = useContext(FormContext)
  if (context === undefined)
    throw new Error('useFormContext should be used with a FormContext.Provider')
  return context
}
