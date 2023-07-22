import { FC, Fragment, UIEventHandler, useMemo } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { useInfiniteQuery } from 'react-query'
import { DiscoverSideMenus } from '../DiscoverSideMenus'
import { Card } from './Card.tsx'
import { useDebounce } from '../../hooks/useDebounce'
import { QueryKey } from '../../constants/QueryKey'
import { useAPI } from '../../hooks/useAPI.ts'

const pageSize = 20

export const DiscoverFeed: FC = () => {
  const api = useAPI()
  const {
    data: feedItems,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
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

  const feedItemTotal = useMemo(
    () =>
      feedItems?.pages.reduce((acc, cur) => acc + cur.data.length, 0) ||
      pageSize,
    [feedItems?.pages]
  )

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
    if (
      !isFetchingNextPage &&
      hasNextPage &&
      index >= feedItemTotal - pageSize / 2
    ) {
      fetchNextPage()
    }
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
        {feedItems?.pages?.map((page) => (
          <Fragment key={page.page}>
            {page.data.map((item) => (
              <Box className="slide" key={item.id}>
                <Card data={item} />
              </Box>
            ))}
          </Fragment>
        ))}
      </Flex>
      <DiscoverSideMenus />
    </Box>
  )
}
