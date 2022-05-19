import { gql } from '@apollo/client'

export const ALL_CITIES = gql`
  query CitiesQuery($filter: CitiesFilters, $limit: Int, $offset: Int) {
    cities(filter: $filter, limit: $limit, offset: $offset) {
      cities {
        id
        name
        country
        visited
        wishlist
      }
      total
    }
  }
`
