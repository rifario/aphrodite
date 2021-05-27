import { AppProps } from 'next/app'
import Provider from '@rifario/components/provider'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}
