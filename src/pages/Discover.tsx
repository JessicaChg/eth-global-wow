import { FC } from 'react'

import 'swiper/css'
import { useQuery } from 'react-query'
import { useAPI } from '../hooks/useAPI.ts'
import { DiscoverFeed } from '../components/DiscoverFeed'

const Discover: FC = () => {
  const api = useAPI()

  useQuery(['feed'], async () => {
    const f = await api.getFeedItem()
    console.log(f)
  })

  return <DiscoverFeed />
}

export default Discover
