import { FC } from 'react'
import { Box } from '@chakra-ui/react'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import { DiscoverSideMenus } from '../components/DiscoverSideMenus'

const Discover: FC = () => (
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
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        <Box w="full" h="full">
          {new Array(1000).fill(0).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={i}>text: {i}</Box>
          ))}
        </Box>
      </SwiperSlide>
      <SwiperSlide>Card 2</SwiperSlide>
      <SwiperSlide>Card 3</SwiperSlide>
      <SwiperSlide>Card 4</SwiperSlide>
    </Swiper>
    <DiscoverSideMenus />
  </Box>
)

export default Discover
