import * as MockAdapter from 'axios-mock-adapter'
import type { AxiosInstance } from 'axios'
import type { Address, FeedItem } from './Feed.interface.ts'

const data: Record<string, FeedItem> = new Array(100)
  .fill(0)
  .map((_, i, arr) => ({
    id: `id${i}`,
    prev: i === 0 ? null : `id${i - 1}`,
    next: i === arr.length - 1 ? null : `id${i + 1}`,
    content:
      'I used to top the keyword searched during X\'mas. But now is "NFT". So I created 6000 unique digital copies of myself. Own a unique copy of us, and I\'ll continue to bring joy and blessings to you.',
    title: `Non-Fungible Santa Claus ${i}`,
    logo: `https://r.nervina.cn/meta_santa.png?tid=${i}&locale=en`,
    address: '0x7aDEd72AE9176824D7Da0dabdA248c1054577C29' as Address,
    tags: ['popular', 'ethereum', 'NFT'],
  }))
  .reduce(
    (acc, item) => ({ ...acc, [item.id]: item }),
    {} as Record<string, FeedItem>
  )

function mock(axios: AxiosInstance) {
  const adapter = new MockAdapter(axios, { delayResponse: 300 })

  adapter
    .onGet('/api/feed/item')
    .reply((config) => [200, data[config.params.id || 'id0'] || null])
}

export default mock
