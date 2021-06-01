import { chakra, ChakraProps } from '@chakra-ui/react'
import { createContext, ReactElement, useContext } from 'react'
import { Control, useForm, UseFormRegister } from 'react-hook-form'

type FormProps = {
  defaultValues?: Record<string, unknown>
  children: ReactElement | ReactElement[]
  onSubmit: (data: Record<string, unknown>) => void
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
  ...rest
}: FormProps & ChakraProps): JSX.Element {
  const { handleSubmit, register, control } = useForm({ defaultValues })

  return (
    <chakra.form {...rest} onSubmit={handleSubmit(onSubmit)}>
      <FormContext.Provider value={{ register, control }}>
        {children}
      </FormContext.Provider>
    </chakra.form>
  )
}

export function useFormContext(): FormContextType {
  const context = useContext(FormContext)
  if (context === undefined)
    throw new Error('useFormContext should be used with a FormContext.Provider')
  return context
}
