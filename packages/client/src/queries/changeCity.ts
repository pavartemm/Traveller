import { gql } from '@apollo/client'

export const CHANGE_CITY = gql`
  mutation UpdateCity($input: CitiesMutationInput) {
    updateCity(input: $input) {
      id
      visited
      wishlist
    }
  }
`
