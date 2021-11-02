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

    this.audio.addEventListener('loadedmetadata', this._loadmetadata)
    this.audio.addEventListener('timeupdate', this._timeupdate)
    this.audio.addEventListener('ended', this._ended)

    log('Player created with song:', song)
  }

  private _loadmetadata = () => {
    log(`Duration of '${this.song.trackName}': ${this.audio.duration}s`)
    this.emit('loadmetadata', this.audio.duration)
  }

  private _timeupdate = () => {
    this.emit('timeupdate', this.audio.currentTime, this.audio.duration)
  }

  private _ended = () => {
    this.emit('ended')
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
    this._timeupdate()

    this.emit('stoped')
  }

  destroy(): void {
    this.stop()
    this.removeAllListeners()

    log('Player destroyed')
  }
}