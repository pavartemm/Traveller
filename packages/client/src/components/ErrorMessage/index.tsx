import React from 'react'
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'

type Props = {
  text: string
}

export const ErrorMessage: React.FC<Props> = ({ text }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{text}</AlertTitle>
    </Alert>
  )
}
