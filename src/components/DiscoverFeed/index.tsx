import { FC, Fragment, useState } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { useInfiniteQuery } from 'react-query'
import { EffectCards } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import classNames from 'classnames'
import { DiscoverSideMenus } from '../DiscoverSideMenus'
import { Card } from './Card.tsx'
import { QueryKey } from '../../constants/QueryKey'
import { useAPI } from '../../hooks/useAPI.ts'

import 'swiper/css'
import 'swiper/css/effect-cards'
import { GetFeedsResponse } from '../../api/Feed.interface.ts'

const pageSize = 20

const PackedSwiper: FC<{
  feedItems?: {
    pages: GetFeedsResponse[]
  }
}> = ({ feedItems }) => {
  const [isMoving, setIsMoving] = useState(false)
  return (
    <Swiper
      effect="cards"
      className={classNames('swiper', {
        moving: isMoving,
      })}
      grabCursor
      modules={[EffectCards]}
      speed={500}
      onSliderMove={() => setIsMoving(true)}
      onSlideNextTransitionStart={() => setIsMoving(true)}
      onSlidePrevTransitionStart={() => setIsMoving(true)}
      onSlideNextTransitionEnd={() => setIsMoving(false)}
      onSlidePrevTransitionEnd={() => setIsMoving(false)}
      onTouchEnd={() => setIsMoving(false)}
    >
      {feedItems?.pages?.map((page) => (
        <Fragment key={page.page}>
          {page.data.map((item) => (
            <SwiperSlide key={item.id}>
              <Card data={item} />
            </SwiperSlide>
          ))}
        </Fragment>
      ))}
    </Swiper>
  )
}

export const DiscoverFeed: FC<BoxProps> = ({ ...props }) => {
  const api = useAPI()
  const {
    data: feedItems,
    // fetchNextPage,
    // isFetchingNextPage,
    // hasNextPage,
  } = useInfiniteQuery({
    queryKey: [QueryKey.GetFeeds],
    queryFn({ pageParam = 1 }) {
      return api
        .getFeedList({ page: pageParam, size: pageSize })
        .then((res) => res.data)
    },
    getNextPageParam(lastPage) {
      return lastPage.nextPage
    },
  })

  return (
    <Box
      w="full"
      h="full"
      flex={1}
      pos="relative"
      pt="20px"
      {...props}
      sx={{
        '.swiper': {
          w: 'full',
          h: 'full',
        },
        '.swiper-slide': {
          bg: '#161616',
          w: 'min(100vw, 500px)',
          minW: 'min(100vw, 500px)',
          p: '5',
          overflowX: 'hidden',
          rounded: '32px',
          overflowY: 'auto',
        },
        '.swiper.moving .swiper-slide': {
          overflowY: 'hidden',
        },
      }}
    >
      <PackedSwiper feedItems={feedItems} />
      <DiscoverSideMenus />
    </Box>
  )
}
