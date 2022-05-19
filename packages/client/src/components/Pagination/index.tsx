import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { PAGE_SIZE } from '../../constants'

type Props = {
  pagesCount: number
  fetchPage: (offset: number) => void
}

export const Pagination: React.FC<Props> = ({ pagesCount, fetchPage }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePrevPage = () => {
    setCurrentPage(page => page - 1)
    fetchPage(currentPage * PAGE_SIZE)
  }

  const handleNextPage = () => {
    setCurrentPage(page => page + 1)
    fetchPage(currentPage * PAGE_SIZE)
  }

  return (
    <>
      {currentPage !== 0 && (
        <Button onClick={handlePrevPage} colorScheme="blue">
          Prev page
        </Button>
      )}
      {currentPage !== pagesCount && (
        <Button ml={2} onClick={handleNextPage} colorScheme="blue">
          Next page
        </Button>
      )}
    </>
  )
}
