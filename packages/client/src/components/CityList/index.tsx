import React from 'react'
import type { CityType } from '../../types'
import { Box, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { City } from '../City'

type Props = {
  cities: CityType[]
  refetchCitites?: () => void
}

export const CityList: React.FC<Props> = ({ cities, refetchCitites }) => {
  return (
    <Box mt={2}>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Country</Th>
              <Th>Visited</Th>
              <Th>Wish List</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cities.map(city => (
              <City city={city} refetchCitites={refetchCitites} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
