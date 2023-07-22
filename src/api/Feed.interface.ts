export type Address = `0x${string}`
export enum FeedItemType {
  User = 'User',
  Project = 'Project',
}

export interface RelevantContentItem {
  name: string
  twitterName: string
  isVerified: true
  avatar: string
  createTime: string
  content: string
}

export interface Erc20 {
  symbol: string
  icon: string
  usdValue: string
  amount: number
}

export interface NFT {
  name: string
  imageUrl: string
  tokenId: number
  fullName: string
  price: string
  like: number
}

export interface SocialLink {
  type: string
  url?: string
}

export interface FeedBaseItem {
  id: string
  address: Address
  tags: string[]
  type: FeedItemType
}

export interface FeedProjectItem extends FeedBaseItem {
  title: string
  content: string
  tokenPrice?: string
  logo: string
  type: FeedItemType.Project
  relevantContent: RelevantContentItem[]
}

export interface FeedUserItem extends FeedBaseItem {
  type: FeedItemType.User
  avatar: string
  erc20: Erc20[]
  nft: NFT[]
  socialLinks: SocialLink[]
  followerCount: number
}

export type FeedItem = FeedProjectItem | FeedUserItem

export interface GetFeedsResponse {
  data: FeedItem[]
  total: number
  page: number
  nextPage: number | null
}
