import { Button, Slider } from 'antd'
import PropTypes from 'prop-types'
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined
} from '@ant-design/icons'

import styles from './MusicPlayer.module.css'
import useMusicPlayer, { MusicPlayerProps } from './useMusicPlayer'

export default function MusicPlayer(props: MusicPlayerProps): JSX.Element {
  const {
    song,
    isFirst,
    isLast,
    onPrevious,
    onNext,
  } = useMusicPlayer(props)

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
          onClick={onPrevious}
          disabled={isFirst}
        />
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<PlayCircleOutlined />}
        />
        <Button
          shape="circle"
          icon={<DoubleRightOutlined />}
          onClick={onNext}
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

const songShape = PropTypes.shape({
  id: PropTypes.number,
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  trackName: PropTypes.string,
  collectionArtistName: PropTypes.string,
  previewUrl: PropTypes.string,
  coverUrl30: PropTypes.string,
  coverUrl100: PropTypes.string,
  collectionPrice: PropTypes.number,
  trackPrice: PropTypes.number,
  country: PropTypes.number,
  currency: PropTypes.number,
  releaseDate: PropTypes.object,
  genreName: PropTypes.number,
  trackLength: PropTypes.number,
})

MusicPlayer.propTypes = {
  selectedIndex: PropTypes.number,
  songs: PropTypes.arrayOf(songShape),
}

MusicPlayer.propTypes = {
  selectedIndex: -1,
  songs: [],
}