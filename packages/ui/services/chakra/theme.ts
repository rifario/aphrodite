import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Poppins'
  },
  fontSizes: {
    '9xl': '9rem'
  },
  colors: {
    primary: {
      '50': '#EEE5FF',
      '100': '#CFB8FF',
      '200': '#B08AFF',
      '300': '#925CFF',
      '400': '#732EFF',
      '500': '#5400FF',
      '600': '#4300CC',
      '700': '#330099',
      '800': '#220066',
      '900': '#110033'
    },
    secondary: {
      '50': '#F3E9FC',
      '100': '#DDC0F6',
      '200': '#C898F1',
      '300': '#B270EB',
      '400': '#9C47E6',
      '500': '#861FE0',
      '600': '#6C19B3',
      '700': '#511386',
      '800': '#360C5A',
      '900': '#1B062D'
    }
  }
})

export default theme
