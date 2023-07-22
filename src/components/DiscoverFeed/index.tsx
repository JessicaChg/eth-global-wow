import { FC, UIEventHandler } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { atom, useAtom } from 'jotai'
import { DiscoverSideMenus } from '../DiscoverSideMenus'
import { Card } from './Card.tsx'
import { useDebounce } from '../../hooks/useDebounce.ts'

const feedItemIdsAtom = atom<string[]>([])
const activeIndexAtom = atom(0)

export const DiscoverFeed: FC = () => {
  const [feedItemIds, setFeedItemIds] = useAtom(feedItemIdsAtom)
  const [activeIndex, setActiveIndex] = useAtom(activeIndexAtom)
  const onScroll = useDebounce<UIEventHandler<HTMLDivElement>>((e) => {
    const container = e.target as HTMLDivElement
    let index = [].slice
      .call(container.children)
      .findIndex(
        (ele: HTMLDivElement) =>
          Math.abs(
            ele.getBoundingClientRect().left -
              container.getBoundingClientRect().left
          ) < 10
      )
    index = Math.max(index, 0)
    setActiveIndex(index)
  }, 100)

  return (
    <Box
      w="full"
      h="full"
      pos="relative"
      sx={{
        '.slide': {
          w: 'min(100vw, 500px)',
          minW: 'min(100vw, 500px)',
          p: '5',
          overflowX: 'hidden',
          overflowY: 'auto',
          scrollSnapAlign: 'center',
        },
      }}
    >
      <Flex
        w="full"
        h="full"
        overflowX="auto"
        overflowY="hidden"
        scrollSnapType="x mandatory"
        onScroll={onScroll}
      >
        <Box className="slide">
          <Card
            onLoadData={(data) => {
              if (!data.next) return
              if (feedItemIds.length > 0) return
              setFeedItemIds((ids) => [...ids, data.next!])
            }}
          />
        </Box>
        {feedItemIds.map((id, index) => (
          <Box className="slide" key={id}>
            <Card
              id={id}
              isEnabled={index < activeIndex + 1}
              onLoadData={(data) => {
                if (!data.next) return
                setFeedItemIds((ids) => {
                  const newIds = ids.concat([])
                  newIds[index + 1] = data.next!
                  return newIds
                })
              }}
            />
          </Box>
        ))}
      </Flex>
      <DiscoverSideMenus />
    </Box>
  )
}
