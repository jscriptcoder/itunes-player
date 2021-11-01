import { MouseEventHandler, useCallback, useMemo, useState } from 'react'
import { Song } from '../../utils/song'

export interface MusicPlayerProps {
  selectedIndex: number
  songs: Song[]
}

interface MusicPlayerUI {
  song: Song
  isFirst: boolean
  isLast: boolean
  onPrevious: MouseEventHandler<HTMLElement>,
  onNext: MouseEventHandler<HTMLElement>,
}

export default function useMusicPlayer(props: MusicPlayerProps): MusicPlayerUI {
  const { selectedIndex, songs } = props
  const [ internalIndex, setInternalIndex ] = useState(selectedIndex)

  const song: Song = useMemo(() => songs[internalIndex], [internalIndex, songs])
  const isFirst: boolean = useMemo(() => internalIndex === 0, [internalIndex])
  const isLast: boolean = useMemo(() => internalIndex === songs.length-1, [internalIndex, songs])
  const onPrevious: MouseEventHandler<HTMLElement> = useCallback(() => setInternalIndex(internalIndex - 1), [internalIndex])
  const onNext: MouseEventHandler<HTMLElement> = useCallback(() => setInternalIndex(internalIndex + 1), [internalIndex])

  return {
    song,
    isFirst,
    isLast,
    onPrevious,
    onNext,
  }
}