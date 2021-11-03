import { MouseEventHandler, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

import Player from '../../models/Player'
import { secondsFormat } from '../../utils/formatters'
import { Song } from '../../utils/song'
import { ControlsPlayerProps } from './ControlsPlayer'

export interface MusicPlayerProps {
  selectedIndex: number
  songs: Song[]
  changeSong: (index: number) => void
}

interface MusicPlayerUI extends ControlsPlayerProps {
  player?: Player
  duration: number
  progress: number
  progressMarks: ObjectMap
  progressTipFormatter: (seconds?: number) => ReactNode
  changeProgress: (seconds: number) => void
}

export default function useMusicPlayer(props: MusicPlayerProps): MusicPlayerUI {
  const {selectedIndex, songs, changeSong} = props
  const [internalIndex, setInternalIndex] = useState(selectedIndex)
  const [player, setPlayer ] = useState<Player>()
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (songs.length) {
      const song = songs[internalIndex]
      if (song) {

        const _player = new Player(song)
        
        const onPlaying = () => setPlaying(true)
        const onPaused = () => setPlaying(false)
        const onStoped = () => setPlaying(false)
        const onLoadMetadata = (_duration: number) => setDuration(_duration)
        const onTimeupdate = (currentTime: number) => setProgress(currentTime)
        const onEnded = () => player?.stop()

        _player.on('playing', onPlaying)
        _player.on('paused', onPaused)
        _player.on('stoped', onStoped)
        _player.on('loadmetadata', onLoadMetadata)
        _player.on('timeupdate', onTimeupdate)
        _player.on('ended', onEnded)

        setPlayer(_player)

        return () => _player.destroy()

      } else {
        setPlayer(undefined)
      }
    }
  }, [internalIndex, songs])

  const isFirst: boolean = useMemo(() => internalIndex === 0, [internalIndex])
  const isLast: boolean = useMemo(() => internalIndex === songs.length-1, [internalIndex, songs])

  const progressMarks = useMemo(() => {
    if (duration) {
      const rounded = Math.round(duration)
      return {
        0: '00:00',
        [rounded]: secondsFormat(rounded),
      }
    }

    return {}
  }, [duration])

  const progressTipFormatter = useCallback((seconds?: number): ReactNode => {
    if (typeof seconds === 'number') {
      return secondsFormat(seconds)
    }
    return null
  }, [])

  const changeProgress = useCallback((seconds: number) => {
    if (player?.audio) {
      player.audio.currentTime = seconds
    }
  }, [player])

  const clickPrevious: MouseEventHandler<HTMLElement> = useCallback(() => {
    player?.destroy()

    const newIndex = internalIndex - 1
    setInternalIndex(newIndex)
    changeSong(newIndex)
  }, [internalIndex])

  const clickNext: MouseEventHandler<HTMLElement> = useCallback(() => {
    player?.destroy()

    const newIndex = internalIndex + 1
    setInternalIndex(newIndex)
    changeSong(newIndex)
  }, [internalIndex])

  const clickPlay = useCallback(() => player?.play(), [player])
  const clickPause = useCallback(() => player?.pause(), [player])

  return {
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
  }
}