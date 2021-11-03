import {
  Slider,
  Divider,
  Alert,
} from 'antd'
import { FunctionComponent, memo } from 'react'

import styles from './MusicPlayer.module.css'
import useMusicPlayer, { MusicPlayerProps } from './useMusicPlayer'
import ControlsPlayer from './ControlsPlayer'
import TrackName from './TrackName'
import TrackDetails from './TrackDetails'

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

    return (
      <div className={styles.container}>
        <img
          className={styles.albumCover}
          src={song.coverUrl100}
        />

        <ControlsPlayer
          isFirst={isFirst}
          isLast={isLast}
          playing={playing}
          clickNext={clickNext}
          clickPlay={clickPlay}
          clickPause={clickPause}
          clickPrevious={clickPrevious}
        />

        <TrackName name={song.trackName} url={song.viewUrl} />

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

        <TrackDetails
          artist={song.artistName}
          collection={song.collectionName}
          collectionUrl={song.collectionViewUrl}
          release={song.releaseDate}
          genre={song.genreName}
          length={song.trackLength}
          currency={song.currency}
          price={song.trackPrice}
        />
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