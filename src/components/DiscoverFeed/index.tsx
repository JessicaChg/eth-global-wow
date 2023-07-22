import { FC, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper/types'
import { atom, useAtom } from 'jotai'
import { DiscoverSideMenus } from '../DiscoverSideMenus'
import { Card } from './Card.tsx'

const feedItemIdsAtom = atom<string[]>([])
const activeIndexAtom = atom(0)

export const DiscoverFeed: FC = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)
  const [feedItemIds, setFeedItemIds] = useAtom(feedItemIdsAtom)
  const [activeIndex, setActiveIndex] = useAtom(activeIndexAtom)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(activeIndex, 0)
      setMounted(true)
    }
  }, [swiper])

  return (
    <Box
      w="full"
      h="full"
      pos="relative"
      sx={{
        '.swiper': {
          height: '100%',
          maxHeight: '100%',
        },
        '.swiper-slide': {
          p: '4',
          overflowX: 'hidden',
          overflowY: 'auto',
        },
      }}
    >
      <Swiper
        navigation
        onActiveIndexChange={(s) => setActiveIndex(s.activeIndex)}
        onSwiper={(s) => {
          setSwiper(s)
        }}
        style={{ opacity: mounted ? undefined : 0 }}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <Card
            onLoadData={(data) => {
              if (!data.next) return
              if (feedItemIds.length > 0) return
              setFeedItemIds((ids) => [...ids, data.next!])
            }}
          />
        </SwiperSlide>
        {feedItemIds.map((id, index) => (
          <SwiperSlide key={id}>
            <Card
              id={id}
              isEnabled={index === activeIndex || index === activeIndex + 1}
              onLoadData={(data) => {
                if (!data.next) return
                setFeedItemIds((ids) => {
                  const newIds = ids.concat([])
                  newIds[index + 1] = data.next!
                  return newIds
                })
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <DiscoverSideMenus />
    </Box>
  )
}
