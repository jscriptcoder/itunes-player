import { MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'

import Player from '../../models/Player'
import { Song } from '../../utils/song'

export interface MusicPlayerProps {
  selectedIndex: number
  songs: Song[]
}

interface MusicPlayerUI {
  player?: Player
  isFirst: boolean
  isLast: boolean
  playing: boolean
  clickPrevious: MouseEventHandler<HTMLElement>
  clickPlay: MouseEventHandler<HTMLElement>,
  clickPause: MouseEventHandler<HTMLElement>,
  clickNext: MouseEventHandler<HTMLElement>
}

export default function useMusicPlayer(props: MusicPlayerProps): MusicPlayerUI {
  const {selectedIndex, songs} = props
  const [internalIndex, setInternalIndex] = useState(selectedIndex)
  const [player, setPlayer ] = useState<Player>()
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (songs.length) {
      const song = songs[internalIndex]
      if (song) {

        const _player = new Player(song)
        
        const onPlaying = () => setPlaying(true)
        const onPaused = () => setPlaying(false)
        const onStoped = () => setPlaying(false)

        _player.on('playing', onPlaying)
        _player.on('paused', onPaused)
        _player.on('stoped', onStoped)

        setPlayer(_player)

        return () => _player.destroy()

      } else {
        setPlayer(undefined)
      }
    }
  }, [internalIndex, songs])

  const isFirst: boolean = useMemo(() => internalIndex === 0, [internalIndex])
  const isLast: boolean = useMemo(() => internalIndex === songs.length-1, [internalIndex, songs])

  const clickPrevious: MouseEventHandler<HTMLElement> = useCallback(() => {
    player?.destroy()
    setInternalIndex(internalIndex - 1)
  }, [internalIndex])

  const clickNext: MouseEventHandler<HTMLElement> = useCallback(() => {
    player?.destroy()
    setInternalIndex(internalIndex + 1)
  }, [internalIndex])

  const clickPlay = useCallback(() => player?.play(), [player])

  const clickPause = useCallback(() => player?.pause(), [player])

  return {
    player,
    isFirst,
    isLast,
    playing,
    clickPrevious,
    clickPlay,
    clickPause,
    clickNext,
  }
}