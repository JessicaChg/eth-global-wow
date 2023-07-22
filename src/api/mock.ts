import * as MockAdapter from 'axios-mock-adapter'
import type { AxiosInstance } from 'axios'
import type { Address, FeedItem } from './Feed.interface.ts'
import {
  FeedItemType,
  type FeedProjectItem,
  type FeedUserItem,
} from './Feed.interface.ts'

const data: FeedItem[] = new Array(100).fill(0).map<FeedItem>((_, i) => {
  const base = {
    id: `id${i}`,
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
  const img = `https://app.relationlabs.ai/icon/avatar/avatar${
    (i % 10) + 10
  }.png`
  if (i % 2 === 1) {
    return {
      ...base,
      type: FeedItemType.User,
      avatar: img,
      erc20: [
        {
          symbol: 'USDT',
          icon: 'https://etherscan.io/token/images/tethernew_32.png',
          usdValue: '156.00',
          amount: 156,
        },
        {
          symbol: 'REL',
          icon: 'https://etherscan.io/token/images/relationlabs_32.png',
          usdValue: '577.32',
          amount: 32330,
        },
        {
          symbol: 'USDC',
          icon: 'https://etherscan.io/token/images/centre-usdc_28.png',
          usdValue: '175.22',
          amount: 175.22,
        },
        {
          symbol: 'ETH',
          icon: 'https://etherscan.io/assets/svg/logos/logo-etherscan.svg?v=0.0.5',
          usdValue: '2007.55',
          amount: 1.23,
        },
        {
          symbol: 'BTC',
          icon: 'https://etherscan.io/token/images/centre-usdc_28.png',
          usdValue: '123.21',
          amount: 0.006,
        },
      ],
      nft: [
        {
          name: '.soul profile',
          imageUrl:
            'https://openseauserdata.com/files/3dd87aff966d96588e0e672c45dff5f1.svg',
          tokenId: 1,
          fullName: '.soul profile #1',
          price: '3.1ETH',
          like: 355,
        },
        {
          name: 'CryptoKitties',
          imageUrl:
            'https://logo.nftscan.com/logo/0x06012c8cf97bead5deae237070f9587f8e7a266d.png',
          tokenId: 135,
          fullName: 'CryptoKitties #135',
          price: '0.015ETH',
          like: 289,
        },
        {
          name: 'BoredApeYachtClub',
          imageUrl:
            'https://dm2zb8bwza29x.cloudfront.net/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/0x0000000000000000000000000000000000000000000000000000000000000000.png',
          tokenId: 479,
          fullName: 'BoredApeYachtClub #355',
          price: '2.1ETH',
          like: 75,
        },
        {
          name: 'BoredApeYachtClub',
          imageUrl:
            'https://dm2zb8bwza29x.cloudfront.net/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/0x000000000000000000000000000000000000000000000000000000000000000a.png',
          tokenId: 479,
          fullName: 'BoredApeYachtClub #479',
          price: '3.5ETH',
          like: 63,
        },
      ],
      socialLinks: [
        {
          type: 'twitter',
          url: 'https://twitter.com/relationlabs',
        },
        {
          type: 'telegram',
          url: 'https://t.me/therelationlabs',
        },
        {
          type: 'github',
          url: 'https://github.com/relationlabs',
        },
        {
          type: 'ens',
          url: null,
        },
        {
          type: 'discord',
          url: 'https://discord.com/invite/whGB5zEsHY',
        },
      ],
      followerCount: 200,
    } as FeedUserItem
  }
  return {
    ...base,
    type: FeedItemType.Project,
    content:
      'The first two scenarios make CSS Scroll Snap less appealing for users and the third one is a nightmare for developers when debugging. Developers also need to consider these shortcomings when trying to make a dynamic experience that supports actions such as adding, removing, or moving content.\n' +
      '\n' +
      'A common fix for this is to add listeners that execute a programmatic scroll via JavaScript to force snapping to execute whenever any of these mentioned layout changes happen. This workaround can be ineffective when the user expects the scroller to snap back to the same content as before. Any further handling with JavaScript seems to almost defeat the purpose of this CSS feature.\n' +
      '\n',
    title: `Relation X EthCC 2023 ${i}`,
    logo: img,
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

function mock(axios: AxiosInstance) {
  const adapter = new MockAdapter(axios, { delayResponse: 300 })

  adapter.onGet('/api/feeds').reply((config) => {
    const page = config?.params?.page || 1
    const size = config?.params?.size || 20
    return [
      200,
      {
        data: data.slice((page - 1) * size, page * size),
        total: data.length,
        page,
        nextPage: data.length / size >= page ? page + 1 : null,
      },
    ]
  })
}

export default mock
