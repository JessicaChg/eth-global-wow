import * as MockAdapter from 'axios-mock-adapter'
import type { AxiosInstance } from 'axios'
import type { Address, FeedItem } from './Feed.interface.ts'
import {
  FeedItemType,
  type FeedProjectItem,
  // type FeedUserItem,
} from './Feed.interface.ts'

const data: Record<string, FeedItem> = new Array(100)
  .fill(0)
  .map<FeedItem>((_, i, arr) => {
    const base = {
      id: `id${i}`,
      prev: i === 0 ? null : `id${i - 1}`,
      next: i === arr.length - 1 ? null : `id${i + 1}`,
      address: '0x7aDEd72AE9176824D7Da0dabdA248c1054577C29' as Address,
      tags: [
        'popular',
        'ethereum',
        'NFT',
        'ETHCC2023',
        'SocialFi',
        'GameFi',
        'Defi',
      ],
    }
    // if (i % 2 === 0) {
    //   return {
    //     ...base,
    //     type: FeedItemType.User,
    //     avatar: `https://r.nervina.cn/meta_santa.png?tid=${i}&locale=en`,
    //     erc20: [],
    //     nft: [],
    //     socialLinks: [],
    //     followerCount: 200,
    //   } as FeedUserItem
    // }
    return {
      ...base,
      type: FeedItemType.Project,
      content:
        'The first two scenarios make CSS Scroll Snap less appealing for users and the third one is a nightmare for developers when debugging. Developers also need to consider these shortcomings when trying to make a dynamic experience that supports actions such as adding, removing, or moving content.\n' +
        '\n' +
        'A common fix for this is to add listeners that execute a programmatic scroll via JavaScript to force snapping to execute whenever any of these mentioned layout changes happen. This workaround can be ineffective when the user expects the scroller to snap back to the same content as before. Any further handling with JavaScript seems to almost defeat the purpose of this CSS feature.\n' +
        '\n',
      title: `Relation X EthCC 2023 ${i}`,
      logo: `https://app.relationlabs.ai/icon/avatar/avatar${
        (i % 10) + 10
      }.png`,
      relevantContent: [
        {
          name: 'Vatalik.eth',
          twitterName: '@vatalik.eth',
          isVerified: true,
          avatar: 'https://app.relationlabs.ai/icon/avatar/avatar20.png',
          createTime: '2023-07-23',
          content: 'Loot bot is ....',
        },
        {
          name: 'Scan Bounty Hunter',
          twitterName: '@Scanbounty',
          isVerified: true,
          avatar:
            'https://pbs.twimg.com/profile_banners/33962758/1443792478/1500x500',
          createTime: '2023-07-21',
          content:
            'The project attracted massive attention after being endorsed by Vitalik Buterin. ',
        },
        {
          name: 'The Blockchain club',
          twitterName: '@unichainmedia',
          isVerified: false,
          avatar: 'https://app.relationlabs.ai/icon/avatar/avatar21.png',
          createTime: '2023-07-20',
          content:
            'The project attracted massive attention after being endorsed by Vitalik Buterin. ',
        },
      ],
    } as FeedProjectItem
  })
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
