import {
  useEffect,
  useState,
} from 'react'

import { Song } from '../../utils/song'
import store from '../../models/Store'
import useSearching from '../../utils/useSearching'

interface ResultsTableUI {
  songs: Song[]
  searching: boolean
}

export default function useResultsTable(): ResultsTableUI {
  const [songs, setSongs] = useState(store.songs)
  const searching = useSearching()

  useEffect(() => {
    const songsChange = (_songs: Song[]) => setSongs(_songs)
    store.on('songschanged', songsChange)

    return () => {
      store.off('songschanged', songsChange)
    }
  }, [])

  return {
    songs,
    searching,
  }
}