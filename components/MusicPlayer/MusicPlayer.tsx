import { Button, Slider, Divider, Alert, Descriptions } from 'antd'
import { FunctionComponent, memo } from 'react'
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined
} from '@ant-design/icons'

import styles from './MusicPlayer.module.css'
import useMusicPlayer, { MusicPlayerProps } from './useMusicPlayer'
import { priceFormat } from '../../utils/formatters'

const MusicPlayer: FunctionComponent<MusicPlayerProps> = (props: MusicPlayerProps): JSX.Element => {
  const {
    player,
    isFirst,
    isLast,
    playing,
    duration,
    progress,
    progressMarks,
    progressTipFormatter,
    changeProgress,
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

        <Slider
          style={{ width: '90%' }}
          min={0}
          max={duration}
          marks={progressMarks}
          tipFormatter={progressTipFormatter}
          value={progress}
          onChange={changeProgress}
        />

        <Divider />

        <Descriptions size="small" layout="horizontal" column={1} bordered>
          <Descriptions.Item label="Artist">{song.artistName}</Descriptions.Item>
          <Descriptions.Item label="Album">{song.collectionName}</Descriptions.Item>
          <Descriptions.Item label="Release">{song.releaseDate.format('MMMM Do, YYYY')}</Descriptions.Item>
          <Descriptions.Item label="Length">{song.trackLength} sec.</Descriptions.Item>
          <Descriptions.Item label="Genre">{song.genreName}</Descriptions.Item>
          <Descriptions.Item label="Price">{song.currency} {priceFormat(song.trackPrice)}</Descriptions.Item>
        </Descriptions>

        <Divider />

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