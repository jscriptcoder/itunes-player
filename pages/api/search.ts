import type { NextApiRequest, NextApiResponse } from 'next'
import debug from 'debug'

import { toQueryString } from '../../utils/querystring'
import { Song, iTuneSong, cleaniTuneSong } from '../../utils/song'

const log = debug('app:searchApi')
const logerr = debug('app:searchApi:error')

export interface ErrorData {
  error: string
}

export type ClientData = iTuneSong[] | ErrorData

interface iTuneSearchData {
  resultCount: number
  results: iTuneSong[]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ClientData>) {
  const term = req.query['term']
  if (term) {
    const qs = toQueryString({
      term,

      // we're only interested in songs
      media: 'music',
      entity: 'song',

      // TODO: add more fixed params if needed
      // country
      // limit
      // lang
    })

    try {
      log(`Fetching 'https://itunes.apple.com/search?${qs}'`)
      const response: Response = await fetch(`https://itunes.apple.com/search?${qs}`)
      const data: iTuneSearchData = await response.json()

      // log('Data received:', data)

      res
        .status(200)
        .json(data.results.map(cleaniTuneSong))
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