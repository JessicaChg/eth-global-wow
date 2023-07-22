export type Address = `0x${string}`

export interface FeedItem {
  prev: string | null
  id: string
  title: string
  content: string
  address: Address
  price?: string
  logo: string
  tags: string[]
  next: string | null
}
