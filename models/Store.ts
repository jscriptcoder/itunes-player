import EventEmitter from 'events'

import Song from './Song'

export default class Store extends EventEmitter {
  static __instance__: Store

  static getInstance = (): Store => {
    return Store.__instance__ ?? new Store()
  }

  songs: Song[] = []
  selectedSong: Maybe<Song>

  setSongs(songs: Song[]): void {
    this.songs = songs
    this.emit('songs-change')
  }

  setSelected(song: Song): void {
    if(song) {
      this.selectedSong = song
      this.emit('selectedsong-change')
    } 
  }
}

