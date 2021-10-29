import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'

import store from '../../models/Store'

interface SearchBarUI {
  term: string
  searching: boolean
  searchChange: ChangeEventHandler<HTMLInputElement>
  searchKeydown: KeyboardEventHandler<HTMLInputElement>
  searchClick: MouseEventHandler<HTMLElement>
}

export default function useSearchBar(): SearchBarUI {
  const [term, setTerm] = useState('')
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

  const searchChange: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    setTerm(event.target.value)
  }, [])

  const searchKeydown: KeyboardEventHandler<HTMLInputElement> = useCallback(event => {
    if(event.key === 'Enter' && term !== '') {
      store.searchByTerm(term)
    }
  }, [term])

  const searchClick: MouseEventHandler<HTMLElement> = useCallback(() => {
    if(term !== '') {
      store.searchByTerm(term)
    }
  }, [term])

  return {
    term,
    searching,
    searchChange,
    searchKeydown,
    searchClick,
  }
}