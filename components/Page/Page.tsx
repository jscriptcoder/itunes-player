import Head from 'next/head'

import styles from './Page.module.css'
import Header from '../Header'
import Footer from '../Footer'

interface PageProps {
  children: JSX.Element | string
}

export default function Page(props: PageProps): JSX.Element {
  const { children } = props

  return (
    <div className={styles.container}>
      <Head>
        <title>..:: iTune Player ::..</title>
        <meta name="description" content="Simple music player using iTunes API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {children}
      </main>

      <Footer />
    </div>
  )
}