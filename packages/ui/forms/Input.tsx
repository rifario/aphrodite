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
  InputRightElement,
  FormHelperText
} from '@chakra-ui/react'

import { useFormState } from 'react-hook-form'
import { useFormContext } from './Form'

import { ReactElement, ReactNode } from 'react'

type InputProps = {
  name: string
  label?: string
  validation?: Record<string, unknown>
  rightElement?: ReactElement<typeof InputRightElement>
  rightAddon?: ReactElement<typeof InputRightAddon>
  leftElement?: ReactElement<typeof InputLeftElement>
  leftAddon?: ReactElement<typeof InputLeftAddon>
  formHelper?: ReactNode
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
  formHelper,
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
      {formHelper && <FormHelperText>{formHelper}</FormHelperText>}
      <FormErrorMessage>
        {errors?.[name] && errors?.[name]?.message}
      </FormErrorMessage>
    </FormControl>
  )
}
