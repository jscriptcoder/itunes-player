import { useEffect, useState } from 'react'

import store from '../models/Store'

export default function useSearching() {
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    const onSearching = () => setSearching(true)
    const onDoneSearching = () => setSearching(false)

    store.on('searching', onSearching)
    store.on('donesearching', onDoneSearching)

    return () => {
      store.off('searching', onSearching)
      store.off('donesearching', onDoneSearching)
    }
  }, [])

  return searching
}