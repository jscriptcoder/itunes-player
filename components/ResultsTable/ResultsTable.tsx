import { Divider, Switch, Radio, Table } from 'antd'

import styles from './ResultsTable.module.css'
import { columns, expandedRowRender } from './resultsTableConfig'
import useResultsTable from './useResultsTable'

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
    <div>
      <div className={styles.sorting}>
        <Switch
          checkedChildren="Sort by"
          unCheckedChildren="No sort"
          onChange={toggleSorting}
          checked={sorting}
          disabled={songs.length === 0}
        />
        <div style={{ visibility: sorting ? "visible" : "hidden" }}>
          <Radio.Group value={fieldSort} onChange={changeFieldSort}>
            <Radio.Button value="trackLength">length</Radio.Button>
            <Radio.Button value="genreName">genre</Radio.Button>
            <Radio.Button value="trackPrice">price</Radio.Button>
          </Radio.Group>
          <Divider type="vertical" />
          <Radio.Group buttonStyle="solid" value={typeSort} onChange={changeTypeSort}>
            <Radio.Button value="asc">asc</Radio.Button>
            <Radio.Button value="desc">desc</Radio.Button>
          </Radio.Group>
        </div>
      </div>
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