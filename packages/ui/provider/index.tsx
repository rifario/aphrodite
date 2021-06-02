import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

import theme from '../services/chakra/theme'

import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'
import '@fontsource/poppins/900.css'

type ProviderProps = {
  children: ReactNode
}

export default function Provider({ children }: ProviderProps): JSX.Element {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
