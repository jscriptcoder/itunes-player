import type { NextPage } from 'next'
import { Breadcrumb } from 'antd'

import Page from '../components/Page'

const Index: NextPage = () => {
  return (
    <Page>
      <Breadcrumb>
        <Breadcrumb.Item>Search</Breadcrumb.Item>
        <Breadcrumb.Item>Song</Breadcrumb.Item>
      </Breadcrumb>
      Index
    </Page>
  )
}

export default Index
