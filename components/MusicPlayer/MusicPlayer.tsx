import { Button, Slider, Alert } from 'antd'
import PropTypes from 'prop-types'
import { FunctionComponent, memo } from 'react'
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined
} from '@ant-design/icons'

import styles from './MusicPlayer.module.css'
import useMusicPlayer, { MusicPlayerProps } from './useMusicPlayer'

const MusicPlayer: FunctionComponent<MusicPlayerProps> = (props: MusicPlayerProps): JSX.Element => {
  const {
    player,
    isFirst,
    isLast,
    playing,
    clickPrevious,
    clickPlay,
    clickPause,
    clickNext,
  } = useMusicPlayer(props)

  if (player) {
    const { song } = player

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
      <div className={styles.container}>
        <img
          className={styles.albumCover}
          src={song.coverUrl100}
        />
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

        <h3>{song.trackName}</h3>

        <Slider className="full-width" min={0} max={song.trackLength} />

        <div className={styles.details}>
          <div className={styles.artistName}>{song.artistName}</div>
          <div className={styles.collectionName}>{song.collectionName}</div>
        </div>
        <div className={styles.share}>
          {/* TODO */}
        </div>
      </div>
    )
  }

  return (
    <Alert
      message="Warning"
      description="No song selected"
      type="warning"
      showIcon
    />
  )

}

export default memo(MusicPlayer)