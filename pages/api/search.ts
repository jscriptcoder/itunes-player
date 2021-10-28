import type { NextApiRequest, NextApiResponse } from 'next'
import debug from 'debug'

import { toQueryString } from '../../utils/querystring'
import { Song, SongLike, create as createSong } from '../../models/song'

const log = debug('app:searchApi')
const logerr = debug('app:searchApi:error')

export interface ErrorData {
  error: string
}

export type ClientData = Song[] | ErrorData

interface iTuneResultItem extends SongLike {}

interface iTuneSearchData {
  resultCount: number
  results: iTuneResultItem[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ClientData>) {
  const term = req.query['term']
  if (term) {
    const qs = toQueryString({
      term,
      media: 'music', // we're only interested in music
      
      // TODO: add more fixed params if needed
    })

    log(`Query params: ${qs}`)

    try {
      const response: Response = await fetch(`https://itunes.apple.com/search?${qs}`)
      const data: iTuneSearchData = await response.json()

      // log('Data received:', data)

      res
        .status(200)
        .json(data.results.map(createSong))
    } catch (err) {
      logerr(err)

      res
        .status(500)
        .json({ error: `${err}` })
    }
  } else {
    logerr('Missing `term` query parameter')
    res
      .status(400)
      .json({ error: 'Missing `term` query parameter' })
  }
  
}