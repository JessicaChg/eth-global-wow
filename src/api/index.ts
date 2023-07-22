import axios, { type AxiosInstance } from 'axios'
import { FeedItem, GetFeedsResponse } from './Feed.interface.ts'
import { IS_MOCK_API } from '../constants/env.ts'
import mock from './mock.ts'

export class API {
  private readonly axios: AxiosInstance

  constructor(options?: { baseURL?: string }) {
    const baseURL = options?.baseURL || '/'
    this.axios = axios.create({ baseURL })
    if (IS_MOCK_API) {
      mock(this.axios)
      // import('./mock.ts').then((mock) => {
      //   mock.default(this.axios)
      // })
    }
  }

  getFeedItem(options?: { id?: string }) {
    return this.axios.get<FeedItem>('/api/feed/item', {
      params: {
        id: options?.id,
      },
    })
  }

  getFeedList(options?: { page?: number; size?: number }) {
    const page = options?.page || 1
    const size = options?.size || 20
    return this.axios.get<GetFeedsResponse>('/api/feeds', {
      params: {
        page,
        size,
      },
    })
  }
}
