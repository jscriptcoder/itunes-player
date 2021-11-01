import type { NextPage } from 'next'
import { ReactNode, useEffect, useMemo, useState } from 'react'

import styles from './index.module.css'
import Page from '../components/Page'
import Breadcrumb from '../components/Breadcrumb'
import MusicPlayer from '../components/MusicPlayer'
import SearchBar from '../components/SearchBar'
import ResultsTable from '../components/ResultsTable'
import store from '../models/Store'
import { Song } from '../utils/song'

const Index: NextPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(store.selectedIndex)
  const [songs, setSongs] = useState(store.songs)

  useEffect(() => {
    const onSelect = (_: Song, idx: number) => setSelectedIndex(idx)
    const onUnselect = () => setSelectedIndex(-1)
    const songsChange = (_songs: Song[]) => setSongs(_songs)

    store.on('songselected', onSelect)
    store.on('songunselected', onUnselect)
    store.on('songschanged', songsChange)

    return () => {
      store.off('songselected', onSelect)
      store.off('songunselected', onUnselect)
      store.off('songschanged', songsChange)
    }
  }, [])

  let content: ReactNode = (
    <div className={styles.searchWrapper}>
      <SearchBar />
      <ResultsTable />
    </div>
  )

  if (selectedIndex > -1) {
    content = (
      <MusicPlayer
        selectedIndex={selectedIndex}
        songs={songs}
      />
    )
  }

  return (
    <Page>
      <Breadcrumb />
      <div className={styles.contentWrapper}>
        {content}
      </div>
    </Page>
  )
}

export default Index
