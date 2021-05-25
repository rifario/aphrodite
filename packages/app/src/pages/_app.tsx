import { AppProps } from 'next/app'
import { Provider } from '@rifario/components'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
