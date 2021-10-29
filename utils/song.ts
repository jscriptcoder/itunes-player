import moment, { Moment } from 'moment'

export interface Song {
  id: number
	artistName: string
	collectionName: string
	trackName: string
	collectionArtistName: string
	previewUrl: string
	coverUrl30: string
	coverUrl100: string
	collectionPrice: number
	trackPrice: number
	country: string
	currency: string
	releaseDate: Moment
  genreName: string
  trackLength: number
}

export interface iTuneSong {
  trackId: number
	artistName: string
	collectionName: string
	trackName: string
	collectionArtistName: string
	previewUrl: string
	artworkUrl30: string
	artworkUrl100: string
	collectionPrice: number
	trackPrice: number
	country: string
	currency: string
	releaseDate: string
  primaryGenreName: string
  trackTimeMillis: number
}

export const cleaniTuneSong = ({
  trackId,
  artistName,
  collectionName,
  trackName,
  collectionArtistName,
  previewUrl,
  artworkUrl30,
  artworkUrl100,
  collectionPrice,
  trackPrice,
  country,
  currency,
  releaseDate,
  primaryGenreName,
  trackTimeMillis,
}: iTuneSong): iTuneSong => {
  return {
    trackId,
    artistName,
    collectionName,
    trackName,
    collectionArtistName,
    previewUrl,
    artworkUrl30,
    artworkUrl100,
    collectionPrice,
    trackPrice,
    country,
    currency,
    releaseDate,
    primaryGenreName,
    trackTimeMillis,
  }
}

export const transformiTuneSong = ({
  trackId,
  artistName,
  collectionName,
  trackName,
  collectionArtistName,
  previewUrl,
  artworkUrl30,
  artworkUrl100,
  collectionPrice,
  trackPrice,
  country,
  currency,
  releaseDate,
  primaryGenreName,
  trackTimeMillis,
}: iTuneSong): Song => {
  return {
    id: trackId,
    artistName,
    collectionName,
    trackName,
    collectionArtistName,
    previewUrl,
    coverUrl30: artworkUrl30,
    coverUrl100: artworkUrl100,
    collectionPrice,
    trackPrice,
    country,
    currency,
    releaseDate: moment(releaseDate),
    genreName: primaryGenreName,
    trackLength: Math.round(trackTimeMillis / 1000)
  }
}