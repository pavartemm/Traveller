import React from 'react'
import { Button, Td, Tr } from '@chakra-ui/react'
import type { CityType } from '../../types'
import { useMutation } from '@apollo/client'
import { CHANGE_CITY } from '../../queries/changeCity'

type Props = {
  city: CityType
  refetchCitites?: () => void
}

export const City: React.FC<Props> = ({ city: { id, name, country, visited, wishlist }, refetchCitites }) => {
  const [changeCity, { loading }] = useMutation(CHANGE_CITY)

  const handleChangeCity = async ({ id, visited, wishlist }: { id: number; visited?: boolean; wishlist?: boolean }) => {
    await changeCity({
      variables: {
        input: {
          id,
          visited,
          wishlist,
        },
      },
    })
    if (refetchCitites) {
      refetchCitites()
    }
  }

  return (
    <Tr key={id}>
      <Td>{name}</Td>
      <Td>{country}</Td>
      <Td>
        {visited ? (
          <Button
            isLoading={loading}
            onClick={() => handleChangeCity({ id, visited: false })}
            size="xs"
            colorScheme="red"
          >
            Remove
          </Button>
        ) : (
          <Button
            isLoading={loading}
            onClick={() => handleChangeCity({ id, visited: true })}
            size="xs"
            colorScheme="green"
          >
            Add
          </Button>
        )}
      </Td>
      <Td>
        {wishlist ? (
          <Button
            isLoading={loading}
            onClick={() => handleChangeCity({ id, wishlist: false })}
            size="xs"
            colorScheme="red"
          >
            Remove
          </Button>
        ) : (
          <Button
            isLoading={loading}
            onClick={() => handleChangeCity({ id, wishlist: true })}
            size="xs"
            colorScheme="green"
          >
            Add
          </Button>
        )}
      </Td>
    </Tr>
  )
}
