import { Button } from 'antd'
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons'
import { MouseEventHandler } from 'react'

import styles from './MusicPlayer.module.css'

export interface ControlsPlayerProps {
  isFirst: boolean
  isLast: boolean
  playing: boolean
  clickPrevious: MouseEventHandler<HTMLElement>
  clickPlay: MouseEventHandler<HTMLElement>
  clickPause: MouseEventHandler<HTMLElement>
  clickNext: MouseEventHandler<HTMLElement>
}

export default function ControlsPlayer(props: ControlsPlayerProps): JSX.Element {
  const {
    isFirst,
    isLast,
    playing,
    clickNext,
    clickPlay,
    clickPause,
    clickPrevious,
  } = props

  const playPauseButton = playing
  ? (
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon={<PauseCircleOutlined />}
      onClick={clickPause}
    />
  )
  : (
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon={<PlayCircleOutlined />}
      onClick={clickPlay}
    />
  )

  return (
    <div className={styles.controls}>
      <Button
        shape="circle"
        icon={<DoubleLeftOutlined />}
        onClick={clickPrevious}
        disabled={isFirst}
      />

      {playPauseButton}

      <Button
        shape="circle"
        icon={<DoubleRightOutlined />}
        onClick={clickNext}
        disabled={isLast}
      />
    </div>
  )
}