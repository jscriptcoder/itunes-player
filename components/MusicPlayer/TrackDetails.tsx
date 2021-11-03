import {
  Button,
  Descriptions, 
  Tooltip,
} from 'antd'
import { AppleOutlined } from '@ant-design/icons'
import { Moment } from 'moment'

import { priceFormat } from '../../utils/formatters'
import { Song } from '../../utils/song'

interface TrackDetailsProps {
  song: Song
}

export default function TrackDetails(props: TrackDetailsProps): JSX.Element {
  const { song } = props

  return (
    <Descriptions size="small" layout="horizontal" column={1} bordered>
      <Descriptions.Item label="Artist">{song.artistName}</Descriptions.Item>
      <Descriptions.Item label="Album">
        <span>{song.collectionName}</span>
        <Tooltip title="Click to open in music.apple.com">
          <Button
            icon={<AppleOutlined />}
            type="link"
            href={song.collectionViewUrl}
            target="_blank"
          />
        </Tooltip>
      </Descriptions.Item>
      <Descriptions.Item label="Release">{song.releaseDate.format('MMMM Do, YYYY')}</Descriptions.Item>
      <Descriptions.Item label="Length">{song.trackLength} sec.</Descriptions.Item>
      <Descriptions.Item label="Genre">{song.genreName}</Descriptions.Item>
      <Descriptions.Item label="Price">{song.currency} {priceFormat(song.trackPrice)}</Descriptions.Item>
    </Descriptions>
  )
}