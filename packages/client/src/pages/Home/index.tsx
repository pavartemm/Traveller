import React, { useMemo, useState } from 'react'
import type { FC } from 'react'
import { Container, InputRightElement, Input, Heading, InputGroup, IconButton, VStack } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { useLazyQuery } from '@apollo/client'
import debounce from 'lodash.debounce'
import { PAGE_SIZE } from '../../constants'
import { ALL_CITIES } from '../../queries/getAllCities'
import { CitiesContainer } from '../../containers/CitiesContainer'

export const Home: FC = () => {
  const [search, setSearch] = useState('')
  const [getCities, { loading, error, data }] = useLazyQuery(ALL_CITIES)

  const getDebouncedCities = useMemo(() => debounce(getCities, 600), [])

  const fetchCities = (value: string, offset: number | null = null) =>
    getDebouncedCities({
      variables: {
        filter: {
          name: value,
        },
        limit: PAGE_SIZE,
        offset,
      },
    })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    fetchCities(e.target.value)
  }

  const handleChangePage = (offset: number) => fetchCities(search, offset)

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input onChange={handleInputChange} />
          <InputRightElement children={<IconButton aria-label="" icon={<Search2Icon />} />} />
        </InputGroup>
        <CitiesContainer loading={loading} error={error} data={data} handleChangePage={handleChangePage} />
      </Container>
    </VStack>
  )
}
