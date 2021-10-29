import { Breadcrumb as AntBreadcrumb } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useCallback, useMemo } from 'react'

import styles from './Breadcrumb.module.css'
import store from '../../models/Store'

export default function Breadcrumb(): JSX.Element {
  const clickSearch = useCallback(() => store.unselectSong(), [])

  let searchCrumb = (
    <>
      <SearchOutlined className="m-r-xxs" />
      <span>Search</span>
    </>
  )

  if (store.isSongSelected()) {
    searchCrumb = (
      <a onClick={clickSearch}>
        {searchCrumb}
      </a>
    )
  }

  return (
    <AntBreadcrumb className={styles.container}>
      <AntBreadcrumb.Item>
        {searchCrumb}
      </AntBreadcrumb.Item>
      
      {store.isSongSelected() && (
        <AntBreadcrumb.Item>
          {store.selectedSong?.trackName}
        </AntBreadcrumb.Item>
      )}
    </AntBreadcrumb>
  )
}