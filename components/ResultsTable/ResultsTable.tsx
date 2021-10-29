import { Table } from 'antd'

import { columns, expandedRowRender } from './resultsTableConfig'
import useResultsTable from './useResultsTable'

export default function ResultsTable(): JSX.Element {
  const {
    songs,
    searching,
  } = useResultsTable()

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={songs}
      expandable={{ expandedRowRender}}
      size="small"
      loading={searching}
    />
  )
}