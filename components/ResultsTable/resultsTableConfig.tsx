import { Avatar, Descriptions } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { ExpandedRowRender } from 'rc-table/lib/interface'
import { CSSProperties, ReactNode } from 'react'
import { CustomerServiceOutlined } from '@ant-design/icons'

import { Song } from '../../utils/song'
import { priceFormat } from '../../utils/formatters'
import store from '../../models/Store'

const PlayIconStyle: CSSProperties = { fontSize: 18 }
const AlbumAvatarStyle: CSSProperties = { width: 30, height: 30 }

export const columns: ColumnsType<Song> = [{
  key: 'song',
  title: 'Song',
  dataIndex: 'trackName',
}, {
  key: 'artist',
  title: 'Artist',
  dataIndex: 'artistName',
}, {
  key: 'play',
  align: 'center',
  render: (value: any, song: Song, index: number): ReactNode => (
    <a onClick={() => store.selectSong(index)}>
      <CustomerServiceOutlined style={PlayIconStyle} />
    </a>
  )
}]

export const expandedRowRender: ExpandedRowRender<Song> = (song: Song): ReactNode => (
  <Descriptions size="small" layout="horizontal" column={1} bordered>
    <Descriptions.Item label="Album">
      <div className="flex-align-center">
        <Avatar 
          src={song.coverUrl30} 
          className="m-r-xs"
          shape="square"
          alt={song.collectionName}
          style={AlbumAvatarStyle}
        />
        <span>{song.collectionName}</span>
      </div>
    </Descriptions.Item>
    <Descriptions.Item label="Release Date">{song.releaseDate.format('MMMM Do, YYYY')}</Descriptions.Item>
    <Descriptions.Item label="Song length">{song.trackLength} sec.</Descriptions.Item>
    <Descriptions.Item label="Genre">{song.genreName}</Descriptions.Item>
    <Descriptions.Item label="Price">{song.currency} {priceFormat(song.trackPrice)}</Descriptions.Item>
  </Descriptions>
)