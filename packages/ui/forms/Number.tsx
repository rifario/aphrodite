import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  InputRightElement,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps
} from '@chakra-ui/react'
import { useFormState } from 'react-hook-form'

import { useFormContext } from './Form'

import { ReactElement, ReactNode } from 'react'

type NumberProps = {
  name: string
  label?: string
  validation?: Record<string, unknown>
  rightElement?: ReactElement<typeof InputRightElement>
  rightAddon?: ReactElement<typeof InputRightAddon>
  leftElement?: ReactElement<typeof InputLeftElement>
  leftAddon?: ReactElement<typeof InputLeftAddon>
  formHelper?: ReactNode
}

export default function Number({
  name,
  label,
  validation,
  size = 'lg',
  rightElement,
  leftElement,
  rightAddon,
  leftAddon,
  formHelper,
  ...rest
}: NumberProps & NumberInputProps): JSX.Element {
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
        <NumberInput
          w="full"
          variant="filled"
          focusBorderColor="primary.400"
          fontSize="md"
          {...rest}
        >
          <NumberInputField {...register(name, validation)} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {rightAddon}
        {rightElement}
      </InputGroup>
      <FormErrorMessage>
        {errors?.[name] && errors?.[name]?.message}
      </FormErrorMessage>
      {formHelper && <FormHelperText>{formHelper}</FormHelperText>}
    </FormControl>
  )
}
