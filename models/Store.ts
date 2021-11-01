import EventEmitter from 'events'
import debug from 'debug'

import { Song, transformiTuneSong } from '../utils/song'
import { ClientData } from '../pages/api/search'

const log = debug('app:Store')
const logerr = debug('app:Store:error')

export class Store extends EventEmitter {
  static __instance__: Store

  static getInstance = (): Store => {
    return Store.__instance__ ?? new Store()
  }

  songs: Song[] = []
  selectedSong: Maybe<Song>
  selectedIndex: number = -1

  async searchByTerm(term: string): Promise<void> {
    try {
      log(`Searching by the term '${term}'...`)
      
      this.emit('searching', term)
      const response: Response = await fetch(`/api/search?term=${encodeURIComponent(term)}`)
      const data: ClientData = await response.json()
      this.emit('donesearching', term)

      if ('error' in data) {
        logerr(`Error ${response.status}:`, data.error)
        throw Error(data.error)
      } else {
        this.setSongs(data.map(transformiTuneSong))
      }
    } catch(err) {
      logerr('There was an error on searching:', err)
    }
  }

  setSongs(songs: Song[]): void {
    log('Setting songs:', songs)
    this.songs = songs
    this.emit('songschanged', songs)
  }

  selectSong(index: number): void {
    if(
      index >= 0 && 
      index < this.songs.length && 
      index !== this.selectedIndex && 
      this.songs[index]
    ) {
      this.selectedSong = this.songs[index]
      this.selectedIndex = index

      log('Song selected:', this.selectedSong)

      this.emit('songselected', this.selectedSong, this.selectedIndex)
    }
  }

  unselectSong(): void {
    if (this.selectedIndex >= 0 && this.selectedSong)
    log('Unselecting song:', this.selectedSong)

    this.selectedSong = undefined
    this.selectedIndex = -1

    this.emit('songunselected')
  }

  isSongSelected(): boolean {
    return Boolean(this.selectedSong)
  }

  selectNextSong(): void {
    this.selectSong(this.selectedIndex + 1)
  }

  selectPreviousSong(): void {
    this.selectSong(this.selectedIndex - 1)
  }
}

const store = Store.getInstance()

export default store