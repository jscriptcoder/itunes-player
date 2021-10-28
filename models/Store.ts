import EventEmitter from 'events'

import { Song } from './song'

export default class Store extends EventEmitter {
  static __instance__: Store

  static getInstance = (): Store => {
    return Store.__instance__ ?? new Store()
  }

  songs: Song[] = []
  selectedSong: Maybe<Song>
  selectedIndex: number = -1

  setSongs(songs: Song[]): void {
    this.songs = songs
    this.emit('songs-changed')
  }

  selectSong(index: number): void {
    if(index !== this.selectedIndex && this.songs[index]) {
      this.selectedSong = this.songs[index]
      this.selectedIndex = index
      this.emit('song-selected', this.selectedSong, this.selectedIndex)
    }
  }

  unselectSong(): void {
    if (this.selectedIndex >= 0 && this.selectedSong)
    this.selectedSong = undefined
    this.selectedIndex = -1
    this.emit('song-unselected')
  }
}

