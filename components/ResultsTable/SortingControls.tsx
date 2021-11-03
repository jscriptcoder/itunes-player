import { Divider, Switch, Radio, RadioChangeEvent } from 'antd'
import { TypeSort } from '../../models/Store'

import styles from './ResultsTable.module.css'

interface SortingControlsProps {
  sorting: boolean
  disabled: boolean
  field: string
  type: TypeSort,
  toggle: () => void
  changeField: (event: RadioChangeEvent) => void
  changeType: (event: RadioChangeEvent) => void
}

export default function SortingControls(props: SortingControlsProps): JSX.Element {
  const {
    sorting,
    disabled,
    field,
    type,
    toggle,
    changeField,
    changeType,
  } = props

  return (
    <div className={styles.sorting}>
      <Switch
        checkedChildren="Sort by"
        unCheckedChildren="No sort"
        onChange={toggle}
        checked={sorting}
        disabled={disabled}
      />
      <div style={{ visibility: sorting ? "visible" : "hidden" }}>
        <Radio.Group value={field} onChange={changeField}>
          <Radio.Button value="trackLength">length</Radio.Button>
          <Radio.Button value="genreName">genre</Radio.Button>
          <Radio.Button value="trackPrice">price</Radio.Button>
        </Radio.Group>
        <Divider type="vertical" />
        <Radio.Group buttonStyle="solid" value={type} onChange={changeType}>
          <Radio.Button value="asc">asc</Radio.Button>
          <Radio.Button value="desc">desc</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  )
}