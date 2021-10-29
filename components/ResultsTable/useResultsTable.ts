import {
  useEffect,
  useState,
} from 'react'

import { Song } from '../../utils/song'
import store from '../../models/Store'

interface ResultsTableUI {
  songs: Song[]
}

export default function useResultsTable(): ResultsTableUI {
  const [songs, setSongs] = useState(store.songs)

  useEffect(() => {
    const songsChange = (_songs: Song[]) => setSongs(_songs)
    store.on('songschanged', songsChange)

    return () => {
      store.off('songschanged', songsChange)
    }
  }, [])

  return { songs }
}