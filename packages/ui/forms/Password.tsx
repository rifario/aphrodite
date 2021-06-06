import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Button,
  InputRightElement,
  Icon,
  InputRightAddon,
  InputLeftElement,
  InputLeftAddon,
  FormHelperText
} from '@chakra-ui/react'
import { ReactElement, ReactNode, useRef, useState } from 'react'

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { useWatch, useFormState } from 'react-hook-form'
import { useFormContext } from './Form'

type PasswordProps = {
  name: string
  label?: string
  confirmation?: {
    label: string
    message: string
  }
  validation?: Record<string, unknown>
  rightElement?: ReactElement<typeof InputRightElement>
  rightAddon?: ReactElement<typeof InputRightAddon>
  leftElement?: ReactElement<typeof InputLeftElement>
  leftAddon?: ReactElement<typeof InputLeftAddon>
  formHelper?: ReactNode
  confirmationFormHelper?: ReactNode
}

const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function Password({
  name,
  label,
  size = 'lg',
  validation,
  confirmation,
  rightElement,
  rightAddon,
  leftElement,
  leftAddon,
  formHelper,
  confirmationFormHelper,
  ...rest
}: PasswordProps & ChakraInputProps): JSX.Element {
  const { register, control } = useFormContext()
  const { errors } = useFormState({ control })

  const confirmationName = `confirm${capitalize(name)}`
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const password = useRef({} as unknown)

  password.current = useWatch({
    control,
    name,
    defaultValue: null
  })

  return (
    <>
      <FormControl isInvalid={!!errors?.[name]}>
        {label && (
          <FormLabel
            fontWeight="semibold"
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
          {leftElement}
          {leftAddon}
          <ChakraInput
            variant="filled"
            focusBorderColor="primary.400"
            py="1.125rem"
            px="1.5rem"
            fontSize="md"
            type={show ? 'text' : 'password'}
            {...register(name, validation)}
            {...rest}
          />
          {rightElement || (
            <InputRightElement h="full">
              <Button
                borderRadius="md"
                _hover={{ transform: 'none' }}
                variant="ghost"
                onClick={handleClick}
              >
                {show ? (
                  <Icon
                    color={errors?.[name] ? 'red.300' : 'primary.400'}
                    as={AiOutlineEye}
                    w={5}
                    h={5}
                  />
                ) : (
                  <Icon
                    color={errors?.[name] ? 'red.300' : 'gray.400'}
                    as={AiOutlineEyeInvisible}
                    w={5}
                    h={5}
                  />
                )}
              </Button>
            </InputRightElement>
          )}
          {rightAddon}
        </InputGroup>
        <FormErrorMessage>
          {errors?.[name] && errors?.[name]?.message}
        </FormErrorMessage>
        {formHelper && <FormHelperText>{formHelper}</FormHelperText>}
      </FormControl>
      {confirmation && (
        <FormControl isInvalid={!!errors?.[confirmationName]}>
          <FormLabel
            fontWeight="semibold"
            sx={{
              '&[data-invalid]': {
                color: 'red.500'
              }
            }}
            htmlFor={confirmationName}
          >
            {confirmation.label}
          </FormLabel>

          <InputGroup>
            {leftElement}
            {leftAddon}
            <ChakraInput
              variant="filled"
              size="lg"
              type={show ? 'text' : 'password'}
              {...register(confirmationName, {
                ...validation,
                validate: value =>
                  value === password.current || confirmation.message
              })}
              {...rest}
            />
            {rightElement}
            {rightAddon}
          </InputGroup>
          <FormErrorMessage>
            {errors?.[confirmationName] && errors?.[confirmationName]?.message}
            {confirmationFormHelper && (
              <FormHelperText>{confirmationFormHelper}</FormHelperText>
            )}
          </FormErrorMessage>
        </FormControl>
      )}
    </>
  )
}
