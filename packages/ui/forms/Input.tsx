import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react'

import { useFormState } from 'react-hook-form'
import { useFormContext } from './Form'

import { ReactElement } from 'react'

type InputProps = {
  name: string
  label?: string
  validation?: Record<string, unknown>
  rightElement?: ReactElement<typeof InputRightElement>
  rightAddon?: ReactElement<typeof InputRightAddon>
  leftElement?: ReactElement<typeof InputLeftElement>
  leftAddon?: ReactElement<typeof InputLeftAddon>
}

export default function Input({
  name,
  label,
  validation,
  size,
  rightElement,
  leftElement,
  rightAddon,
  leftAddon,
  ...rest
}: InputProps & ChakraInputProps): JSX.Element {
  const { register, control } = useFormContext()
  const { errors } = useFormState({ control })

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
      <InputGroup size={size}>
        {leftAddon}
        {leftElement}
        <ChakraInput
          variant="filled"
          focusBorderColor="primary.400"
          py="1.125rem"
          px="1.5rem"
          fontSize="md"
          {...register(name, validation)}
          {...rest}
        />
        {rightAddon}
        {rightElement}
      </InputGroup>
      <FormErrorMessage>
        {errors?.[name] && errors?.[name]?.message}
      </FormErrorMessage>
    </FormControl>
  )
}
