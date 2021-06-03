import { AppProps } from 'next/app'
import Provider from '@rifario/components/provider'
import { Link } from '@rifario/components/atoms'
import { Navbar } from '@rifario/components/molecules'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider>
      <Navbar bg="black" color="white" breakpoint="sm">
        <Link href="#">
          Olá, <strong>Fulano</strong>
        </Link>
      </Navbar>
      <Component {...pageProps} />
    </Provider>
  )
}
