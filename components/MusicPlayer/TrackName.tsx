import {
  Button,
  Tooltip,
  Dropdown,
  Menu,
} from 'antd'
import {
  ShareAltOutlined,
  AppleOutlined,
  FacebookOutlined,
  TwitterOutlined,
  WeiboOutlined,
} from '@ant-design/icons'

import styles from './MusicPlayer.module.css'

interface TrackNameProps {
  name: string
  url: string
}

export default function TrackName(props: TrackNameProps): JSX.Element {
  const {name, url} = props

  return (
    <h3 className={styles.trackName}>
    <span>{name}</span>
    <br />
    <Tooltip title="Click to open in music.apple.com">
      <Button
        icon={<AppleOutlined />}
        type="link"
        href={url}
        target="_blank"
      />
    </Tooltip>
    <Tooltip title="Share this song in your favourite Social Network">
      <Dropdown overlay={(
        <Menu>
          <Menu.Item icon={<FacebookOutlined />}>Facebook</Menu.Item>
          <Menu.Item icon={<TwitterOutlined />}>Twitter</Menu.Item>
          <Menu.Item icon={<WeiboOutlined />}>Weibo</Menu.Item>
        </Menu>
      )}>
        <Button icon={<ShareAltOutlined />} type="link" />
      </Dropdown>
    </Tooltip>
  </h3>
  )
}