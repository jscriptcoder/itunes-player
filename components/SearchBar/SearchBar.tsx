import { Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import styles from './SearchBox.module.css'
import useSearchBar from './useSearchBar'

export default function SearchBar(): JSX.Element {
  const {
    term,
    searching,
    searchChange,
    searchKeydown,
    searchClick,
  } = useSearchBar()

  return (
    <div className={styles.container}>
      <Input 
        placeholder="Search for artists, songs, albums, genres ..."
        onChange={searchChange}
        onKeyDown={searchKeydown}
        disabled={searching}
        value={term}
      />
      <Button 
        type="primary" 
        icon={<SearchOutlined />}
        onClick={searchClick}
        loading={searching}
      >
        Search
      </Button>
    </div>
  )
}