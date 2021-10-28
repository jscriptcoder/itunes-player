import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import styles from './index.module.css'
import Page from '../components/Page'
import Breadcrumb from '../components/Breadcrumb'
import MusicPlayer from '../components/MusicPlayer'
import SearchBar from '../components/SearchBar'
import ResultsTable from '../components/ResultsTable'
import store from '../models/Store'

const Index: NextPage = () => {
  const [isSongSelected, setIsSongSelected] = useState(store.isSongSelected())

  useEffect(() => {
    const onSongSelected = () => setIsSongSelected(true)
    const onSongUnselected = () => setIsSongSelected(false)

    store.on('songselected', onSongSelected)
    store.on('songunselected', onSongUnselected)

    return () => {
      store.off('songselected', onSongSelected)
      store.off('songunselected', onSongUnselected)
    }
  }, [])

  return (
    <Page>
      <Breadcrumb />
      <div className={styles.contentWrapper}>
        {isSongSelected
          ? <MusicPlayer />
          : (
            <div className={styles.searchWrapper}>
              <SearchBar />
              <ResultsTable />
            </div>
          )
        }
      </div>
    </Page>
  )
}

export default Index
