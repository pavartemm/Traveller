import React from 'react'
import { ErrorMessage } from '../../components/ErrorMessage'
import { Box, CircularProgress } from '@chakra-ui/react'
import { CityList } from '../../components/CityList'
import { PAGE_SIZE } from '../../constants'
import { Pagination } from '../../components/Pagination'
import type { ApolloError } from '@apollo/client'
import type { CititesDataType } from '../../types'

type Props = {
  data: CititesDataType
  loading: boolean
  error?: ApolloError
  handleChangePage: (offset: number) => void
  refetchCitites?: () => void
}

export const CitiesContainer: React.FC<Props> = ({ data, loading, error, handleChangePage, refetchCitites }) => {
  return (
    <>
      {error && <ErrorMessage text="Error when fetching cities" />}
      {loading && <CircularProgress isIndeterminate color="blue.300" />}
      {!loading && data && <CityList cities={data.cities.cities} refetchCitites={refetchCitites} />}
      {!loading && data && data.cities.total > PAGE_SIZE && (
        <Box mt={2}>
          <Pagination pagesCount={data.cities.total / PAGE_SIZE} fetchPage={handleChangePage} />
        </Box>
      )}
    </>
  )
}
