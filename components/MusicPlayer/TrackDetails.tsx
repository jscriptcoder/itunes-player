import {
  Button,
  Descriptions, 
  Tooltip,
} from 'antd'
import { AppleOutlined } from '@ant-design/icons'
import { Moment } from 'moment'

import { priceFormat } from '../../utils/formatters'

interface TrackDetailsProps {
  artist: string
  collection: string
  collectionUrl: string
  release: Moment
  length: number
  genre: string
  currency: string
  price: number
}

export default function TrackDetails(props: TrackDetailsProps): JSX.Element {
  const {
    artist,
    collection,
    collectionUrl,
    release,
    length,
    genre,
    currency,
    price,
  } = props

  return (
    <Descriptions size="small" layout="horizontal" column={1} bordered>
      <Descriptions.Item label="Artist">{artist}</Descriptions.Item>
      <Descriptions.Item label="Album">
        <span>{collection}</span>
        <Tooltip title="Click to open in music.apple.com">
          <Button
            icon={<AppleOutlined />}
            type="link"
            href={collectionUrl}
            target="_blank"
          />
        </Tooltip>
      </Descriptions.Item>
      <Descriptions.Item label="Release">{release.format('MMMM Do, YYYY')}</Descriptions.Item>
      <Descriptions.Item label="Length">{length} sec.</Descriptions.Item>
      <Descriptions.Item label="Genre">{genre}</Descriptions.Item>
      <Descriptions.Item label="Price">{currency} {priceFormat(price)}</Descriptions.Item>
    </Descriptions>
  )
}