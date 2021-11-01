import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react'

import store from '../../models/Store'
import useSearching from '../../utils/useSearching'

interface SearchBarUI {
  term: string
  searching: boolean
  searchChange: ChangeEventHandler<HTMLInputElement>
  searchKeydown: KeyboardEventHandler<HTMLInputElement>
  searchClick: MouseEventHandler<HTMLElement>
}

export default function useSearchBar(): SearchBarUI {
  const [term, setTerm] = useState('')
  const searching = useSearching()

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