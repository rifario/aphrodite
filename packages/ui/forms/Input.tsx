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

import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import { useFormState } from 'react-hook-form'
import { useFormContext } from './Form'

import { cloneElement, ReactElement, ReactNode } from 'react'

type InputProps = {
  name: string
  label?: string
  validation?: Record<string, unknown>
  rightElement?: ReactElement<typeof InputRightElement>
  rightAddon?: ReactElement<typeof InputRightAddon>
  leftElement?: ReactElement<typeof InputLeftElement>
  leftAddon?: ReactElement<typeof InputLeftAddon>
  formHelper?: ReactNode
  mask?: 'phone' | 'currency'
}

export default function Input({
  name,
  label,
  validation,
  mask,
  size = 'lg',
  rightElement,
  leftElement,
  rightAddon,
  leftAddon,
  formHelper,
  ...rest
}: InputProps & ChakraInputProps): JSX.Element {
  const { register, control } = useFormContext()
  const { errors } = useFormState({ control })

  const MASK_MAP = {
    currency: createNumberMask({
      prefix: 'R$',
      suffix: '',
      includeThousandsSeparator: true,
      thousandsSeparatorSymbol: '.',
      allowDecimal: true,
      decimalSymbol: ',',
      decimalLimit: 2,
      allowNegative: false,
      allowLeadingZeroes: false
    })
  }

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
        {cloneElement(
          <ChakraInput
            variant="filled"
            focusBorderColor="primary.400"
            py="1.125rem"
            px="1.5rem"
            fontSize="md"
            {...register(name, validation)}
            {...rest}
          />,
          mask && { as: MaskedInput, mask: MASK_MAP[mask] }
        )}
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
