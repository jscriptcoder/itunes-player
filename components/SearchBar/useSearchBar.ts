import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'

import store from '../../models/Store'

export default function useSearchBar() {
  const [term, setTerm] = useState('')
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    const onSearching = () => setSearching(true)
    const onDoneSearching = () => setSearching(false)

    store.on('searching', onSearching)
    store.on('donesearching', onDoneSearching)
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