import EventEmitter from 'events'
import debug from 'debug'

import { Song } from '../utils/song'

const log = debug('app:Player')

export default class Player extends EventEmitter {
  song: Song
  audio: HTMLAudioElement

  constructor(song: Song) {
    super()
    this.song = song
    this.audio = new Audio(song.previewUrl)

    log('Player created with song:', song)
  }

  play(): void {
    log(`Playing ${this.song.trackName}`)

    this.audio.play()
    this.emit('playing')

  }

  pause(): void {
    log(`Pausing '${this.song.trackName}'`)

    this.audio.pause()
    this.emit('paused')
  }

  stop(): void {
    log(`Stoping '${this.song.trackName}'`)

    this.audio.pause()
    this.audio.currentTime = 0
    this.emit('stoped')
  }

  destroy(): void {
    this.stop()
    this.removeAllListeners()

    log('Player destroyed')
  }
}