import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Button,
  InputRightElement,
  Icon
} from '@chakra-ui/react'
import { useRef, useState } from 'react'

import { Eye, EyeClosed } from 'phosphor-react'

import { useWatch, useFormState } from 'react-hook-form'
import { useFormContext } from './Form'

type InputProps = {
  name: string
  label?: string
  confirmation?: {
    label: string
    message: string
  }
  validation?: Record<string, unknown>
}

const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function Input({
  name,
  label,
  validation,
  confirmation,
  ...rest
}: InputProps & ChakraInputProps): JSX.Element {
  const { register, control } = useFormContext()
  const { errors } = useFormState({ control })

  const confirmationName = `confirm${capitalize(name)}`
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const password = useRef({})

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
        <InputGroup>
          <ChakraInput
            variant="filled"
            size="lg"
            type={show ? 'text' : 'password'}
            {...register(name, validation)}
            {...rest}
          />
          <InputRightElement h="full">
            <Button variant="ghost" onClick={handleClick}>
              {show ? (
                <Icon
                  color={errors?.[name] ? 'red.300' : 'primary.400'}
                  as={Eye}
                  w={7}
                  h={7}
                />
              ) : (
                <Icon
                  color={errors?.[name] ? 'red.300' : 'gray.400'}
                  as={EyeClosed}
                  w={7}
                  h={7}
                />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors?.[name] && errors?.[name].message}
        </FormErrorMessage>
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
          </InputGroup>
          <FormErrorMessage>
            {errors?.[confirmationName] && errors?.[confirmationName].message}
          </FormErrorMessage>
        </FormControl>
      )}
    </>
  )
}
