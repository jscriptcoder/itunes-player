import '../styles/globals.css'
import '../styles/utils.css'

import type { AppProps } from 'next/app'

function MyTune({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyTune
