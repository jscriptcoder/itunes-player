import { Table } from 'antd'

import styles from './ResultsTable.module.css'
import { columns, expandedRowRender } from './resultsTableConfig'
import useResultsTable from './useResultsTable'
import SortingControls from './SortingControls'

export default function ResultsTable(): JSX.Element {
  const {
    songs,
    searching,
    sorting,
    fieldSort,
    typeSort,
    toggleSorting,
    changeFieldSort,
    changeTypeSort,
  } = useResultsTable()

  return (
    <div className={styles.container}>
      <SortingControls
        toggle={toggleSorting}
        sorting={sorting}
        disabled={songs.length === 0}
        field={fieldSort}
        type={typeSort}
        changeField={changeFieldSort}
        changeType={changeTypeSort}
      />

      <Table
        rowKey="id"
        columns={columns}
        dataSource={songs}
        expandable={{ expandedRowRender }}
        size="small"
        loading={searching}
      />
    </div>
  )
}