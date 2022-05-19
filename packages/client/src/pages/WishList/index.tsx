import React, { useEffect, useMemo } from 'react'
import type { FC } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { CitiesContainer } from '../../containers/CitiesContainer'
import { useLazyQuery } from '@apollo/client'
import { ALL_CITIES } from '../../queries/getAllCities'
import debounce from 'lodash.debounce'
import { PAGE_SIZE } from '../../constants'

export const WishList: FC = () => {
  const [getCities, { loading, error, data, refetch }] = useLazyQuery(ALL_CITIES)

  const getDebouncedCities = useMemo(() => debounce(getCities, 600), [])

  const fetchCities = (offset: number | null = null) =>
    getDebouncedCities({
      variables: {
        filter: {
          wishlist: true,
        },
        limit: PAGE_SIZE,
        offset,
      },
    })

  const handleChangePage = (offset: number) => fetchCities(offset)

  useEffect(() => {
    fetchCities()
  }, [])

  return (
    <>
      <Heading as="h1">Wish list</Heading>
      <Container centerContent maxW="container.md" flexDir="row">
        <div>
          <CitiesContainer
            loading={loading}
            error={error}
            data={data}
            handleChangePage={handleChangePage}
            refetchCitites={refetch}
          />
        </div>
      </Container>
    </>
  )
}
