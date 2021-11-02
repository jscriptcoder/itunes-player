import {
  useCallback,
  useEffect,
  useState,
} from 'react'

import { Song } from '../../utils/song'
import store, { TypeSort } from '../../models/Store'
import useSearching from '../../utils/useSearching'
import { RadioChangeEvent } from 'antd'

interface ResultsTableUI {
  songs: Song[]
  searching: boolean
  sorting: boolean
  fieldSort: string
  typeSort: TypeSort
  toggleSorting: () => void
  changeFieldSort: (event: RadioChangeEvent) => void
  changeTypeSort: (event: RadioChangeEvent) => void
}

export default function useResultsTable(): ResultsTableUI {
  const [songs, setSongs] = useState(store.songs)
  const [sorting, setSorting] = useState(store.currentSorting.field !== 'idx')
  const [fieldSort, setFieldSort] = useState(store.currentSorting.field)
  const [typeSort, setTypeSort] = useState(store.currentSorting.type)
  const searching = useSearching()

  useEffect(() => {
    const songsChange = (_songs: Song[]) => setSongs(_songs)
    store.on('songschanged', songsChange)

    return () => {
      store.off('songschanged', songsChange)
    }
  }, [])

  const toggleSorting = useCallback(() => setSorting(!sorting), [sorting])
  const changeFieldSort = useCallback((event: RadioChangeEvent) => setFieldSort(event.target.value), [])
  const changeTypeSort = useCallback((event: RadioChangeEvent) => setTypeSort(event.target.value), [])

  useEffect(() => {
    if (sorting && fieldSort) {
      store.sort(fieldSort, typeSort)
    } else {
      store.unsort()
    }
  }, [sorting, fieldSort, typeSort])

  return {
    songs,
    searching,
    sorting,
    fieldSort,
    typeSort,
    toggleSorting,
    changeFieldSort,
    changeTypeSort,
  }
}