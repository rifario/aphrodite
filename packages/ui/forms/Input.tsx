import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/react'

import { DeepMap, FieldError, UseFormRegister } from 'react-hook-form'

type InputProps = {
  register?: UseFormRegister<Record<string, unknown>>
  errors?: DeepMap<Record<string, unknown>, FieldError>
  name: string
  label?: string
  validation?: Record<string, unknown>
}

export default function Input({
  register,
  name,
  label,
  validation,
  errors,
  ...rest
}: InputProps & ChakraInputProps): JSX.Element {
  return (
    <FormControl isInvalid={!!errors?.[name]}>
      {label && (
        <FormLabel
          sx={{
            '&[data-invalid]': {
              color: 'red.500'
            }
          }}
          htmlFor={name}
        >
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <ChakraInput
          variant="filled"
          {...register(name, validation)}
          {...rest}
        />
      </InputGroup>
      <FormErrorMessage>
        {errors?.[name] && errors?.[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}
