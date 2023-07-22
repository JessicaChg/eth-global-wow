import axios, { type AxiosInstance } from 'axios'
import { FeedItem, GetFeedsResponse } from './Feed.interface.ts'
import { IS_MOCK_API } from '../constants/env.ts'

export class API {
  private readonly axios: AxiosInstance

  constructor(options?: { baseURL?: string }) {
    const baseURL = options?.baseURL || '/'
    this.axios = axios.create({ baseURL })
    if (IS_MOCK_API) {
      import('./mock.ts').then((mock) => {
        mock.default(this.axios)
      })
    }
  }

  getFeedItem(options?: { id?: string }) {
    return this.axios.get<FeedItem>('/api/feed/item', {
      params: {
        id: options?.id,
      },
    })
  }

  async getFeedList(options?: { page?: number; size?: number }) {
    const page = options?.page || 1
    const size = options?.size || 20
    const { data: feedItems } = await this.axios.get<FeedItem[]>(
      '/api/feed.json',
      {
        params: {
          page,
          size,
        },
      }
    )
    return {
      data: {
        data: feedItems,
        total: feedItems.length,
        page: 0,
        nextPage: null,
      } as GetFeedsResponse,
    }
  }
}
