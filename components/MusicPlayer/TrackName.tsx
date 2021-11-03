import {
  Button,
  Tooltip,
  Dropdown,
  Menu,
  notification
} from 'antd'
import {
  ShareAltOutlined,
  AppleOutlined,
  FacebookOutlined,
  TwitterOutlined,
  WeiboOutlined,
} from '@ant-design/icons'
import { ReactNode } from 'react'

import styles from './MusicPlayer.module.css'

interface TrackNameProps {
  name: string
  url: string
}

const notify = (
  socialMedia: string,
  trackName: string,
  icon: ReactNode
) => notification.open({
  message: `Shared on ${socialMedia}`,
  description: (
    <span>
      The track <strong className="c-yellow">{trackName}</strong> has been shared successfully.
    </span>
  ),
  icon,
})

export default function TrackName(props: TrackNameProps): JSX.Element {
  const {name, url} = props

  return (
    <h3 className={styles.trackName}>
    <span className="c-yellow">{name}</span>
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
          <Menu.Item
            icon={<FacebookOutlined />}
            onClick={() => notify('Facebook', name, <FacebookOutlined />)}
          >
            Facebook
          </Menu.Item>
          <Menu.Item
            icon={<TwitterOutlined />}
            onClick={() => notify('Twitter', name, <TwitterOutlined />)}
          >
            Twitter
          </Menu.Item>
          <Menu.Item
            icon={<WeiboOutlined />}
            onClick={() => notify('Weibo', name, <WeiboOutlined />)}
          >
            Weibo
          </Menu.Item>
        </Menu>
      )}>
        <Button icon={<ShareAltOutlined />} type="link" />
      </Dropdown>
    </Tooltip>
  </h3>
  )
}