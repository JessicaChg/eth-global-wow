import { FC } from 'react'
import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Spinner,
  VStack,
  Tag,
  Text,
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { QueryKey } from '../../constants/QueryKey.ts'
import { useAPI } from '../../hooks/useAPI.ts'
import { truncateMiddle } from '../../utils/string.ts'
import { FeedItem } from '../../api/Feed.interface.ts'

interface CardProps {
  id?: string
  onLoadData?: (id: FeedItem) => void
  isEnabled?: boolean
}

export const Card: FC<CardProps> = ({ id, isEnabled, onLoadData }) => {
  const api = useAPI()
  const { data, isLoading } = useQuery(
    [api, QueryKey.GetFeedItem, id],
    () => api.getFeedItem({ id }).then((res) => res.data),
    {
      onSuccess: (res) => {
        onLoadData?.(res)
        return res
      },
      enabled: isEnabled,
    }
  )

  if (isLoading) {
    return (
      <Center w="full" h="full">
        <Spinner />
      </Center>
    )
  }

  if (!data) {
    return <>No Data</>
  }

  return (
    <VStack w="full" h="full" direction="column" data-feed-id={id}>
      <HStack w="full">
        <Image w="100px" h="100px" objectFit="cover" src={data.logo} />
        <VStack>
          <Box>{data.title}</Box>
          <Box>{truncateMiddle(data.address)}</Box>
        </VStack>
      </HStack>
      <Flex wrap="wrap" w="full">
        {data.tags.map((tag) => (
          <Tag key={tag} mr="2">
            {tag}
          </Tag>
        ))}
      </Flex>
      <Text w="full">{data.content}</Text>
    </VStack>
  )
}
