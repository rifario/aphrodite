import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

import theme from '../services/chakra/theme'

import '@fontsource/raleway/400.css'
import '@fontsource/raleway/700.css'
import '@fontsource/raleway/900.css'

import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'

type ProviderProps = {
  children: ReactNode
}

export default function Provider({ children }: ProviderProps): JSX.Element {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
