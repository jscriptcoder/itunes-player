export interface Song {
  artistName: string
  collectionName: string
  trackName: string
  collectionArtistName: string
  previewUrl: string
  artworkUrl30: string
  artworkUrl100: string
  shortDescription: string
  collectionPrice: number
  trackPrice: number
  country: string,
  currency: string,
}

export interface SongLike extends Song {}

export const create = ({
  artistName,
  collectionName,
  trackName,
  collectionArtistName,
  previewUrl,
  artworkUrl30,
  artworkUrl100,
  shortDescription,
  collectionPrice,
  trackPrice,
  country,
  currency,
}: SongLike): Song => {
  return {
    artistName,
    collectionName,
    trackName,
    collectionArtistName,
    previewUrl,
    artworkUrl30,
    artworkUrl100,
    shortDescription,
    collectionPrice,
    trackPrice,
    country,
    currency,
  }
}