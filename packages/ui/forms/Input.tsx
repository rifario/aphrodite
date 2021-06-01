import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from '@chakra-ui/react'

import { useFormState } from 'react-hook-form'
import { useFormContext } from './Form'

import { createMapFromChildren, renderComponentOfType } from '../utils/forms'
import { ReactElement } from 'react'

type InputProps = {
  children: ReactElement | ReactElement[] | null
  name: string
  label?: string
  validation?: Record<string, unknown>
}

export default function Input({
  name,
  label,
  validation,
  children,
  size,
  ...rest
}: InputProps & ChakraInputProps): JSX.Element {
  const { register, control } = useFormContext()
  const { errors } = useFormState({ control })

  const COMPONENT_MAP = createMapFromChildren(children)

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
        {renderComponentOfType(COMPONENT_MAP, 'InputLeftAddon')}
        {renderComponentOfType(COMPONENT_MAP, 'InputLeftElement')}
        <ChakraInput {...register(name, validation)} {...rest} />
        {renderComponentOfType(COMPONENT_MAP, 'InputRightAddon')}
        {renderComponentOfType(COMPONENT_MAP, 'InputRightElement')}
      </InputGroup>
      <FormErrorMessage>
        {errors?.[name] && errors?.[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}
