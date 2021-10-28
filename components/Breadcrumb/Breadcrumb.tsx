import { Breadcrumb as AntBreadcrumb } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useCallback, useMemo } from 'react'

import styles from './Breadcrumb.module.css'
import store from '../../models/Store'

export default function Breadcrumb(): JSX.Element {
  const searchCls = useMemo(() => store.isSongSelected() ? 'pointer' : '', [])
  const clickSearch = useCallback(() => store.unselectSong(), [])

  return (
    <AntBreadcrumb className={styles.container}>
      <AntBreadcrumb.Item
        className={searchCls}
        onClick={clickSearch}
      >
        <SearchOutlined />
        <span>Search</span>
      </AntBreadcrumb.Item>
      
      {store.isSongSelected() && (
        <AntBreadcrumb.Item>
          {store.selectedSong?.trackName}
        </AntBreadcrumb.Item>
      )}
    </AntBreadcrumb>
  )
}