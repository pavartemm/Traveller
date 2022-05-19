import React, { useEffect, useMemo } from 'react'
import type { FC } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { useLazyQuery } from '@apollo/client'
import { ALL_CITIES } from '../../queries/getAllCities'
import { PAGE_SIZE } from '../../constants'
import debounce from 'lodash.debounce'
import { CitiesContainer } from '../../containers/CitiesContainer'

export const Visited: FC = () => {
  const [getCities, { loading, error, data, refetch }] = useLazyQuery(ALL_CITIES)

  const getDebouncedCities = useMemo(() => debounce(getCities, 600), [])

  const fetchCities = (offset: number | null = null) =>
    getDebouncedCities({
      variables: {
        filter: {
          visited: true,
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
      <Heading as="h1">Visited</Heading>
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
